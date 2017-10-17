FROM progressly/node-alpine:8

ADD . /app
WORKDIR  /app

ARG DOTENV_URL
ENV DOTENV_URL ${DOTENV_URL}

ENV NODE_ENV production

RUN yarn check --production && yarn cache clean
RUN chmod +x start.sh

CMD ["/app/start.sh"]