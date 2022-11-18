#################### Stage 0 : Get deps ####################
FROM    --platform=${TARGETPLATFORM} node:16-alpine AS deps

RUN     apk add --no-cache libc6-compat

WORKDIR /app

COPY    package.json ./

RUN     npm install

#################### Stage 1 : Builder ########################
FROM    --platform=${TARGETPLATFORM} node:16-alpine AS builder

WORKDIR /app

COPY    --from=deps /app/node_modules ./node_modules

COPY    . .

RUN     npm run build

#################### Stage 2 : Runner ########################
FROM    --platform=${TARGETPLATFORM} node:16-alpine AS runner

ENV     NODE_ENV production

WORKDIR /app

RUN     apk add --no-cache gnupg

COPY    --from=builder /app/public ./public

COPY    --from=builder --chown=1000:1000 /app/.next/standalone ./
COPY    --from=builder --chown=1000:1000 /app/.next/static ./.next/static

COPY    README.md Dockerfile ./

ENV     NEXT_PUBLIC_BACKEND_URL=http://localhost:9008

EXPOSE  3000

USER    1000

CMD     ["node", "server.js"]