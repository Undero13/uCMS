FROM node:12-slim

WORKDIR /entrypoint

COPY ./entrypoint.sh /entrypoint

RUN chmod 775 /entrypoint/entrypoint.sh

ENV PORT=4200

ENTRYPOINT ["sh", "/entrypoint/entrypoint.sh"]