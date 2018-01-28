FROM nginx:1.13.8

ENV SWAGGER_UI_VERSION 3.9.3
ENV URL **None**

RUN apt-get update \
    && apt-get install -y curl \
    && curl -L https://github.com/swagger-api/swagger-ui/archive/v${SWAGGER_UI_VERSION}.tar.gz | tar -zxv -C /tmp \
    && cp -R /tmp/swagger-ui-${SWAGGER_UI_VERSION}/dist/* /usr/share/nginx/html \
    && rm -rf /tmp/*

RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx.conf /etc/nginx/conf.d

COPY swagger.json /usr/share/nginx/html/swagger.json
COPY start.sh /start.sh

RUN ["chmod", "+x", "/start.sh"]
CMD ["/start.sh"]
