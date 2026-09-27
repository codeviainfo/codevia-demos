# ─────────────────────────────────────────────────────────────
# Etapa 1 — Build: compila las tres demos con Vite.
#
# Las tres comparten un unico `node_modules` gracias a los npm
# workspaces, asi que hay un solo `npm ci` en lugar de tres.
# Eso importa: el VPS tiene 1 vCPU y ~4,8 GB de disco libre.
# ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Node se limita a 768 MB de heap. El VPS tiene 1,6 GB totales
# con Postgres y el CRM corriendo: sin este techo, el build
# podria pedir mas memoria de la que hay disponible.
ENV NODE_OPTIONS=--max-old-space-size=768

# Primero solo los manifiestos: mientras no cambien, Docker
# reutiliza la capa de dependencias y el build baja a segundos.
COPY package.json package-lock.json ./
COPY restaurante/package.json restaurante/
COPY clinica/package.json clinica/
COPY tienda/package.json tienda/
RUN npm ci

COPY . .
RUN npm run build

# ─────────────────────────────────────────────────────────────
# Etapa 2 — Produccion: nginx sirviendo estaticos.
#
# Node no llega aqui: el contenedor final es el mismo nginx
# alpine de siempre, con el mismo consumo (~6-15 MB de RAM).
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/restaurante/dist /usr/share/nginx/html/restaurante
COPY --from=build /app/clinica/dist    /usr/share/nginx/html/clinica
COPY --from=build /app/tienda/dist     /usr/share/nginx/html/tienda

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
