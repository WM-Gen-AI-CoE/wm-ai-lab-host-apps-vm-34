const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const crypto = require("node:crypto");
const { URL } = require("node:url");

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";
const publicDir = path.join(__dirname, "public");
const indexPath = path.join(publicDir, "index.html");
const sitePassword = process.env.SITE_PASSWORD || "AI@WM";
const authSecret = process.env.AUTH_SECRET || sitePassword;
const authCookieName = "wm_microsite_auth";
const FREE_DEMOS = new Set(["renewal-risk-expansion", "cloud-cogs-optimization"]);  // app folders open to the public (free live demos)

const GATE_DEMOS = process.env.GATE_DEMOS === "1";  // per-app gate moved up to the hub (true move). Off here; set GATE_DEMOS=1 to re-enable this site's own wall.
const HS_PORTAL = process.env.HUBSPOT_PORTAL_ID || "44511248";
const HS_FORM = process.env.HUBSPOT_FORM_ID || "95cbdb85-3ffb-448f-88a3-1de5924d310c";
const HS_REGION = process.env.HUBSPOT_REGION || "na1";

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
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[authCookieName] || "";

  return safeCompare(token, authToken());
}

function sendLeadForm(res) {
  res.writeHead(200, {
    "cache-control": "no-store",
    "content-type": "text/html; charset=utf-8",
    "x-content-type-options": "nosniff",
    "x-frame-options": "SAMEORIGIN",
    "x-robots-tag": "noindex, nofollow"
  });
  res.end(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { color-scheme: light; font-family: "IBM Plex Sans", Arial, sans-serif; }
  html, body { margin: 0; background: #fff; }
  .hs-form label, .hs-form label span, .hs-form legend, .hs-form .hs-form-field label, .hs-form .hs-form-field > label span, .hs-form .hs-field-desc, .hs-form .hs-richtext, .hs-form .hs-richtext p, .hs-form .hs-main-font-element { color: #070154 !important; font-size: 12px; }
  .hs-form .hs-form-required, .hs-form label .hs-form-required { color: #F900D3 !important; }
  .hs-form input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]), .hs-form select, .hs-form textarea { width: 100%; box-sizing: border-box; border: 2px solid #CED7E6; border-radius: 3px; padding: 12px 14px; font: inherit; color: #070154; background: #fff; margin-bottom: 12px; }
  .hs-form ::placeholder { color: #8290AD !important; opacity: 1; }
  .hs-form input[type=submit], .hs-form .hs-button, .hs-form button { width: 100%; margin-top: 6px; border: 2px solid #070154; border-radius: 3px; background: #070154; color: #fff; padding: 14px 16px; font: inherit; font-weight: 700; text-transform: uppercase; cursor: pointer; }
  .hs-form input[type=submit]:hover, .hs-form .hs-button:hover, .hs-form button:hover { background: #0047FF; border-color: #0047FF; }
  .hs-form .hs-error-msgs { list-style: none; padding: 0; margin: 2px 0 10px; color: #F900D3; font-size: 12px; }
  .hs-form fieldset { max-width: none !important; }
  .hs-form a { color: #0047FF; }
</style></head>
<body>
  <div class="hs-form"><div class="hs-form-html" data-region="${HS_REGION}" data-form-id="${HS_FORM}" data-portal-id="${HS_PORTAL}"></div></div>
  <script src="https://js.hsforms.net/forms/embed/developer/${HS_PORTAL}.js" defer></script>
  <script>
    (function () {
      function postHeight() { try { parent.postMessage({ wmHeight: document.body.scrollHeight }, "*"); } catch (e) {} }
      function submitted() { try { parent.postMessage({ wmLead: "submitted" }, "*"); } catch (e) {} }
      // The embedded form does a native submit (fires only after required fields validate).
      document.addEventListener("submit", function () { submitted(); }, true);
      // Belt-and-suspenders: also catch HubSpot's own callback if it fires.
      window.addEventListener("message", function (e) {
        if (e && e.data && e.data.type === "hsFormCallback" && e.data.eventName === "onFormSubmitted") { submitted(); }
      });
      window.addEventListener("resize", postHeight);
      setInterval(postHeight, 700);
      setTimeout(postHeight, 600);
    })();
  </script>
</body></html>`);
}

function sendPasswordPage(res, statusCode = 200, message = "", next = "/") {
  const messageHtml = message
    ? `<p class="message">${message}</p>`
    : "";

  const nx = (next && next.charAt(0) === "/" && next.charAt(1) !== "/") ? next : "/";
  const nextSafe = nx.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const unlockUrl = externalPath("/unlock") + "?next=" + encodeURIComponent(nx);
  const formBlock = (HS_PORTAL && HS_FORM)
    ? `<iframe id="leadframe" src="${externalPath("/__leadform")}" title="Request access" scrolling="no" style="width:100%; border:none; min-height:300px; overflow:hidden;"></iframe>
    <script>
      (function () {
        var done = false;
        function grant() {
          if (done) return; done = true;
          var code = window.__WM_CODE || "";
          var form = document.getElementById("wm-auth-form");
          var pw = document.getElementById("password");
          if (form && pw && code) {
            pw.value = code;
            setTimeout(function () { if (form.requestSubmit) { form.requestSubmit(); } else { form.submit(); } }, 1400);
            return;
          }
          setTimeout(function () {
            fetch("${externalPath("/unlock")}", { credentials: "same-origin", cache: "no-store", keepalive: true })
              .then(function () { window.location.reload(); })
              .catch(function () { window.location.reload(); });
          }, 1400);
        }
        window.addEventListener("message", function (e) {
          if (!e || !e.data) return;
          if (e.data.wmLead === "submitted") { grant(); return; }
          if (e.data.wmHeight) { var f = document.getElementById("leadframe"); if (f) { f.style.height = (e.data.wmHeight + 8) + "px"; } }
        });
      })();
    </script>`
    : `<a class="cta" href="https://www.westmonroe.com/contact" target="_blank" rel="noopener">Request full access</a>`;

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
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #E8EEF8; color: #070154; }
    main { width: min(460px, calc(100vw - 32px)); max-height: calc(100vh - 32px); overflow: auto; background: #fff; border: 1px solid #CED7E6; border-radius: 4px; box-shadow: 0 24px 64px -28px rgba(7,1,84,.28); padding: 32px; box-sizing: border-box; }
    p { margin: 0 0 22px; line-height: 1.45; color: #50658E; }
    label { display: block; margin-bottom: 8px; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #070154; }
    input { width: 100%; box-sizing: border-box; border: 2px solid #CED7E6; border-radius: 3px; padding: 14px 16px; font: inherit; color: #070154; background: #fff; }
    input:focus-visible { outline: none; border-color: #0047FF; }
    button { width: 100%; margin-top: 14px; border: 2px solid #070154; border-radius: 3px; background: #070154; color: #fff; padding: 14px 16px; font: inherit; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: .04em; }
    button:hover { background: #0047FF; border-color: #0047FF; color: #fff; }
    button:focus-visible { outline: none; border-color: #F900D3; }
    h1 { margin: 0 0 12px; font-size: clamp(28px, 6vw, 42px); line-height: .98; text-transform: uppercase; color: #070154; }
    .kicker { margin-bottom: 14px; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #F900D3; }
    .message { color: #F900D3; font-weight: 700; }
    .wmlogo { margin-bottom: 22px; font-weight: 800; font-size: 18px; letter-spacing: .14em; color: #070154; }
    .lead { font-size: 16px; color: #50658E; }
    .cta { display: block; text-align: center; text-decoration: none; margin: 6px 0 26px; border: 2px solid #070154; border-radius: 3px; background: #070154; color: #fff; padding: 14px 16px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
    .cta:hover { background: #0047FF; border-color: #0047FF; }
    .divider { display: flex; align-items: center; gap: 12px; margin: 22px 0 18px; color: #8290AD; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .divider::before, .divider::after { content: ""; height: 1px; background: #CED7E6; flex: 1; }
    .hs-form { margin: 0 0 8px; }
    .hs-form label, .hs-form label span, .hs-form legend, .hs-form .hs-form-field label, .hs-form .hs-form-field > label span, .hs-form .hs-field-desc, .hs-form .hs-richtext, .hs-form .hs-richtext p, .hs-form .hs-main-font-element { color: #070154 !important; font-size: 12px; }
    .hs-form .hs-form-required, .hs-form label .hs-form-required { color: #F900D3 !important; }
    .hs-form input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=button]), .hs-form select, .hs-form textarea { width: 100%; box-sizing: border-box; border: 2px solid #CED7E6; border-radius: 3px; padding: 12px 14px; font: inherit; color: #070154; background: #fff; margin-bottom: 12px; }
    .hs-form ::placeholder { color: #8290AD !important; opacity: 1; }
    .hs-form input[type=submit], .hs-form .hs-button, .hs-form button { width: 100%; margin-top: 6px; border: 2px solid #070154; border-radius: 3px; background: #070154; color: #fff; padding: 14px 16px; font: inherit; font-weight: 700; text-transform: uppercase; cursor: pointer; }
    .hs-form input[type=submit]:hover, .hs-form .hs-button:hover, .hs-form button:hover { background: #0047FF; border-color: #0047FF; }
    .hs-form .hs-error-msgs { list-style: none; padding: 0; margin: 2px 0 10px; color: #F900D3; font-size: 12px; }
    .hs-form fieldset { max-width: none !important; }
    .hs-form a { color: #0047FF; }
  </style>
</head>
<body>
  <main>
    <div class="wmlogo">WEST MONROE</div>
    <div class="kicker">West Monroe - Applied AI</div>
    <h1>See the full demo</h1>
    <p class="lead">Tell us a bit about you and the full set of live demos unlocks instantly.</p>
    <script>window.__WM_CODE = ${JSON.stringify(sitePassword)};</script>
    ${formBlock}
    <div class="divider">Already have an access code?</div>
    ${messageHtml}
    <form id="wm-auth-form" method="post" action="${externalPath("/auth")}">
      <input type="hidden" name="next" value="${nextSafe}">
      <label for="password">Access code</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required>
      <button type="submit">Unlock the demos</button>
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
    const params = new URLSearchParams(body);
    const submittedPassword = params.get("password") || "";
    let next = params.get("next") || "/";
    if (next.charAt(0) !== "/" || next.charAt(1) === "/") next = "/";

    if (!safeCompare(submittedPassword, sitePassword)) {
      sendPasswordPage(res, 401, "That access code did not match. Try again, or request access.", next);
      return;
    }

    res.writeHead(303, {
      "cache-control": "no-store",
      "location": next,
      "set-cookie": `${authCookieName}=${authToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
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
    const ssoKey = parsedUrl.searchParams.get("k");
    if (ssoKey && safeCompare(ssoKey, sitePassword)) {
      parsedUrl.searchParams.delete("k");
      const cleanQuery = parsedUrl.searchParams.toString();
      const cleanPath = stripFrontendPath(parsedUrl.pathname);
      res.writeHead(303, {
        "cache-control": "no-store",
        "location": externalPath(cleanPath) + (cleanQuery ? "?" + cleanQuery : ""),
        "set-cookie": `${authCookieName}=${authToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
        "x-content-type-options": "nosniff"
      });
      res.end();
      return;
    }
  }

  // Form-completion grant: a successful embedded lead form (HubSpot) sends the
  // visitor here, which sets the access cookie and returns them to the demo they
  // were opening. Pairs with the access-code path (/auth) - either one unlocks.
  if (req.method === "GET") {
    if (routedPathname === "/__leadform") {
      sendLeadForm(res);
      return;
    }
    if (routedPathname === "/unlock") {
      const next = parsedUrl.searchParams.get("next") || "";
      const cookie = `${authCookieName}=${authToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;
      if (next && next.charAt(0) === "/" && next.charAt(1) !== "/") {
        res.writeHead(303, { "cache-control": "no-store", "location": next, "set-cookie": cookie, "x-content-type-options": "nosniff" });
        res.end();
      } else {
        res.writeHead(204, { "cache-control": "no-store", "set-cookie": cookie, "x-content-type-options": "nosniff" });
        res.end();
      }
      return;
    }
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

  // Partial gate: the showcase, its images, and the free flagship demo are public;
  // every other live-prototype folder requires an access code when GATE_DEMOS=1.
  {
    const seg = pathname.split("/").filter(Boolean)[0];
    const isDemoApp = seg && seg !== "shots" && fs.existsSync(path.join(publicDir, seg, "index.html"));
    if (GATE_DEMOS && isDemoApp && !FREE_DEMOS.has(seg) && !isAuthorized(req)) {
      sendPasswordPage(res, 200, "", externalPath(pathname));
      return;
    }
  }

  let requestedPath = pathname === "/" ? "/index.html" : pathname;
  if (requestedPath.endsWith("/")) {
    // Directory request (e.g. /claim-adjudication/) -> serve its index.html,
    // so each bundled prototype is served from its own subfolder.
    requestedPath += "index.html";
  }
  const normalizedPath = path.normalize(requestedPath).replace(/^(..[/\\])+/, "");
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
