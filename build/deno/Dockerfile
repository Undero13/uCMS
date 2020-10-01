FROM debian:jessie-slim

ARG DENO_VERSION="v1.4.2"
ARG DENON_VERSION="2.4.0"

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
  ca-certificates \
  curl \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* \
  && curl -fsSLO --compressed "https://github.com/denoland/deno/releases/download/${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip" \
  && gunzip -c deno-x86_64-unknown-linux-gnu.zip > /usr/local/bin/deno \
  && chmod u+x /usr/local/bin/deno \
  && rm deno-x86_64-unknown-linux-gnu.zip


RUN deno install --allow-all -f -q --unstable https://deno.land/x/denon@${DENON_VERSION}/denon.ts
RUN chmod u+x /root/.deno/bin/denon

RUN mv /root/.deno/bin/denon /usr/local/bin/denon

