FROM node:lts as dependencies
WORKDIR /tild-html
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /tild-html
COPY . .
COPY --from=dependencies /tild-html/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /tild-html
ENV NODE_ENV production

COPY --from=builder /tild-html/public ./public
COPY --from=builder /tild-html/package.json ./package.json
COPY --from=builder /tild-html/.next ./.next
COPY --from=builder /tild-html/node_modules ./node_modules

EXPOSE 3100
CMD ["yarn", "start"]