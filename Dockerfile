FROM node:lts as dependencies
WORKDIR /books-test
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /books-test
COPY . .
COPY --from=dependencies /books-test/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /books-test
ENV NODE_ENV production

COPY --from=builder /books-test/public ./public
COPY --from=builder /books-test/package.json ./package.json
COPY --from=builder /books-test/.next ./.next
COPY --from=builder /books-test/node_modules ./node_modules

EXPOSE 3100
CMD ["yarn", "start"]