FROM nginx:latest
WORKDIR /app
COPY . /app
RUN apt update -y \
    && apt install curl -y \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt install nodejs -y \
    && node --version \
    && npm install \
    && npm run build \
    && rm -rf /usr/share/nginx/html/* \
    && cp -r /app/dist/* /usr/share/nginx/html/ \
    && service nginx start
EXPOSE 80