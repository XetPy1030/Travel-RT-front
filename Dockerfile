FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

COPY --from=0 /app/.output ./.output
COPY --from=0 /app/package.json ./package.json

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
