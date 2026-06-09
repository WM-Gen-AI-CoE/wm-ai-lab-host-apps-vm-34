const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const crypto = require("node:crypto");
const { URL } = require("node:url");

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";
const publicDir = path.join(__dirname, "public");
const indexPath = path.join(publicDir, "index.html");
const sitePassword = process.env.SITE_PASSWORD || "replace-if-password-gate-is-enabled";
const authSecret = process.env.AUTH_SECRET || sitePassword;
const authCookieName = "wm_microsite_auth";
const passwordAuthDisabled = process.env.DISABLE_SITE_PASSWORD === "true";

function normalizeMountPath(value, fallback = "/") {
  const raw = String(value || fallback).trim();
  if (!raw || raw === "/") {
    return "/";
  }

  return `/${raw.replace(/^\/+|\/+$/g, "")}`;
}

const appHost = process.env.APP_HOST || "";
const appFrontendPath = normalizeMountPath(process.env.APP_FRONTEND_PATH, "/");
const appBackendPath = normalizeMountPath(
  process.env.APP_BACKEND_PATH,
  appFrontendPath === "/" ? "/api" : `${appFrontendPath}/api`
);

function externalPath(pathname = "/") {
  const suffix = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (appFrontendPath === "/") {
    return suffix;
  }

  return suffix === "/" ? `${appFrontendPath}/` : `${appFrontendPath}${suffix}`;
}

function stripFrontendPath(pathname) {
  if (appFrontendPath !== "/" && (pathname === appFrontendPath || pathname.startsWith(`${appFrontendPath}/`))) {
    return pathname.slice(appFrontendPath.length) || "/";
  }

  return pathname;
}

function cookiePath() {
  return appFrontendPath === "/" ? "/" : `${appFrontendPath}/`;
}

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function sendStatus(res, statusCode, message) {
  res.writeHead(statusCode, {
    "content-type": "text/plain; charset=utf-8",
    "x-content-type-options": "nosniff"
  });
  res.end(message);
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function authToken() {
  return crypto
    .createHmac("sha256", authSecret)
    .update(`site-password:${sitePassword}`)
    .digest("hex");
}

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separator = part.indexOf("=");
        if (separator === -1) {
          return [part, ""];
        }

        return [part.slice(0, separator), part.slice(separator + 1)];
      })
  );
}

function isAuthorized(req) {
  if (passwordAuthDisabled) {
    return true;
  }

  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[authCookieName] || "";

  return safeCompare(token, authToken());
}

function sendPasswordPage(res, statusCode = 200, message = "") {
  const messageHtml = message
    ? `<p class="message">${message}</p>`
    : "";

  res.writeHead(statusCode, {
    "cache-control": "no-store",
    "content-type": "text/html; charset=utf-8",
    "x-content-type-options": "nosniff",
    "x-robots-tag": "noindex, nofollow"
  });

  res.end(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Applied AI - Access</title>
  <style>
    :root { color-scheme: light; font-family: "IBM Plex Sans", Arial, sans-serif; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #070154; color: #fff; }
    main { width: min(420px, calc(100vw - 32px)); border: 2px solid #fff; padding: 32px; box-sizing: border-box; }
    p { margin: 0 0 22px; line-height: 1.45; color: rgba(255,255,255,.82); }
    label { display: block; margin-bottom: 8px; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    input { width: 100%; box-sizing: border-box; border: 2px solid #fff; padding: 14px 16px; font: inherit; color: #070154; }
    button { width: 100%; margin-top: 14px; border: 2px solid #fff; background: #fff; color: #070154; padding: 14px 16px; font: inherit; font-weight: 700; cursor: pointer; text-transform: uppercase; }
    button:hover { background: #0047FF; border-color: #0047FF; color: #fff; }
    button:focus-visible { outline: none; border-color: #F900D3; }
    h1 { margin: 0 0 12px; font-size: clamp(34px, 8vw, 56px); line-height: .95; text-transform: uppercase; }
    .kicker { margin-bottom: 14px; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #F900D3; }
    .message { color: #F900D3; font-weight: 700; }
    .wmlogo { margin-bottom: 24px; }
    .wmlogo svg { height: 30px; width: auto; display: block; }
  </style>
</head>
<body>
  <main>
    <div class="wmlogo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 344.6 72" role="img" aria-label="West Monroe"><path fill="#fff" d="artwork"/></svg></div>
    <div class="kicker">West Monroe - Applied AI</div>
    <h1>Access</h1>
    <p>Enter the microsite password.</p>
    ${messageHtml}
    <form method="post" action="${externalPath("/auth")}">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" autofocus required>
      <button type="submit">Enter</button>
    </form>
  </main>
</body>
</html>`);
}

function handleAuth(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;

    if (body.length > 10000) {
      req.destroy();
    }
  });

  req.on("end", () => {
    const submittedPassword = new URLSearchParams(body).get("password") || "";

    if (!safeCompare(submittedPassword, sitePassword)) {
      sendPasswordPage(res, 401, "Incorrect password.");
      return;
    }

    res.writeHead(303, {
      "cache-control": "no-store",
      "location": externalPath("/"),
      "set-cookie": `${authCookieName}=${authToken()}; Path=${cookiePath()}; HttpOnly; SameSite=Lax; Max-Age=604800`,
      "x-content-type-options": "nosniff"
    });
    res.end();
  });
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
    "content-type": "application/json; charset=utf-8",
    "x-content-type-options": "nosniff"
  });
  res.end(body);
}

function sendAppConfig(res) {
  const body = `window.__APP_CONFIG__ = ${JSON.stringify({
    APP_HOST: appHost,
    APP_FRONTEND_PATH: appFrontendPath,
    APP_BACKEND_PATH: appBackendPath
  })};\n`;

  res.writeHead(200, {
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
    "content-type": "text/javascript; charset=utf-8",
    "x-content-type-options": "nosniff"
  });
  res.end(body);
}

function sendFile(req, res, filePath) {
  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      sendStatus(res, 404, "Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extension] || "application/octet-stream";

    res.writeHead(200, {
      "cache-control": extension === ".html" ? "no-cache" : (filePath.indexOf(path.sep + "assets" + path.sep) !== -1 ? "public, max-age=31536000, immutable" : "no-cache"),
      "content-length": stat.size,
      "content-type": contentType,
      "x-content-type-options": "nosniff"
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  } catch {
    sendStatus(res, 400, "Bad request");
    return;
  }

  const routedPathname = stripFrontendPath(parsedUrl.pathname);

  if (routedPathname === "/auth") {
    if (req.method !== "POST") {
      sendStatus(res, 405, "Method not allowed");
      return;
    }

    handleAuth(req, res);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    sendStatus(res, 405, "Method not allowed");
    return;
  }

  // Single sign-on pass-through: a valid ?k=<password> sets the auth cookie and
  // redirects to a clean URL, so the entry hub can hand off an already-authenticated
  // session and users do not have to sign in again at each showcase.
  if (req.method === "GET") {
    const ssoUrl = parsedUrl;
    const ssoKey = ssoUrl && ssoUrl.searchParams.get("k");
    if (ssoKey && safeCompare(ssoKey, sitePassword)) {
      ssoUrl.searchParams.delete("k");
      const cleanQuery = ssoUrl.searchParams.toString();
      const cleanPath = stripFrontendPath(ssoUrl.pathname);
      res.writeHead(303, {
        "cache-control": "no-store",
        "location": externalPath(cleanPath) + (cleanQuery ? "?" + cleanQuery : ""),
        "set-cookie": `${authCookieName}=${authToken()}; Path=${cookiePath()}; HttpOnly; SameSite=Lax; Max-Age=604800`,
        "x-content-type-options": "nosniff"
      });
      res.end();
      return;
    }
  }

  if (!isAuthorized(req)) {
    sendPasswordPage(res);
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(routedPathname);
  } catch {
    sendStatus(res, 400, "Bad request");
    return;
  }

  if (pathname === "/app-config.js") {
    sendAppConfig(res);
    return;
  }

  if (pathname === "/api/health" || pathname === "/api/health/") {
    sendJson(res, 200, {
      ok: true,
      app: "wm-dataai-software",
      frontendPath: appFrontendPath,
      backendPath: appBackendPath
    });
    return;
  }

  let requestedPath = pathname === "/" ? "/index.html" : pathname;
  if (requestedPath.endsWith("/")) {
    // Directory request (e.g. /claim-adjudication/) -> serve its index.html,
    // so each bundled prototype is served from its own subfolder.
    requestedPath += "index.html";
  }
  const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, normalizedPath);

  if (!filePath.startsWith(publicDir + path.sep)) {
    sendStatus(res, 403, "Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    if (!statError && stat.isFile()) {
      sendFile(req, res, filePath);
      return;
    }

    // Bare directory request (e.g. /claim-adjudication) -> serve its index.html
    if (!statError && stat.isDirectory()) {
      const dirIndex = path.join(filePath, "index.html");
      fs.stat(dirIndex, (dirErr, dirStat) => {
        if (!dirErr && dirStat.isFile()) {
          sendFile(req, res, dirIndex);
          return;
        }
        sendStatus(res, 404, "Not found");
      });
      return;
    }

    const wantsHtml = (req.headers.accept || "").includes("text/html");
    if (wantsHtml) {
      sendFile(req, res, indexPath);
      return;
    }

    sendStatus(res, 404, "Not found");
  });
});

server.listen(port, host, () => {
  console.log(`Applied AI site listening at http://${host}:${port}`);
});
