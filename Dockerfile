# Sin build: son HTML/CSS/JS estáticos, se copian tal cual.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY restaurante /usr/share/nginx/html/restaurante
COPY clinica /usr/share/nginx/html/clinica
COPY tienda /usr/share/nginx/html/tienda

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
