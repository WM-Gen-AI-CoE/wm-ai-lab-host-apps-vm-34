# Railway deploy image — a zero-dependency Node static server.
# server.js serves the prebuilt public/ folder behind a password gate.
# Only the runtime files are copied; the apps/ sources are build-time only
# (excluded via .dockerignore), so Railway never tries to build the 9 Vite
# apps — they're already compiled into public/.
FROM node:20-alpine
WORKDIR /app
COPY package.json server.js ./
COPY public ./public
ENV NODE_ENV=production
# Railway injects $PORT; server.js binds 0.0.0.0:$PORT (defaults to 3000).
CMD ["node", "server.js"]
