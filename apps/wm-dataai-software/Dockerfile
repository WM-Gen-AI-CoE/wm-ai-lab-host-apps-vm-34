# WM AI Cloud deploy image - a zero-dependency Node static server.
# server.js serves the prebuilt public/ folder. The apps/ sources are
# build-time only and excluded via .dockerignore; public/ is the deployable
# artifact for this container.
FROM node:20-alpine
WORKDIR /app

ARG VITE_APP_FRONTEND_PATH=/secure/apps/wm-dataai-software
ARG VITE_APP_BACKEND_PATH=/secure/apps/wm-dataai-software/api

COPY package.json server.js ./
COPY public ./public
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
ENV APP_FRONTEND_PATH=/wm-dataai-software
ENV APP_BACKEND_PATH=/wm-dataai-software/api
ENV VITE_APP_FRONTEND_PATH=${VITE_APP_FRONTEND_PATH}
ENV VITE_APP_BACKEND_PATH=${VITE_APP_BACKEND_PATH}
ENV PUBLIC_APP_FRONTEND_PATH=${VITE_APP_FRONTEND_PATH}
ENV PUBLIC_APP_BACKEND_PATH=${VITE_APP_BACKEND_PATH}

EXPOSE 8080

CMD ["node", "server.js"]
