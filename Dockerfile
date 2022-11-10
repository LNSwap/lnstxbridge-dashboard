FROM    --platform=${TARGETPLATFORM} node:16-alpine AS deps

RUN     apk add --no-cache libc6-compat

WORKDIR /app

COPY    package.json ./

RUN     npm install

#####################################################################################################
FROM    --platform=${TARGETPLATFORM} node:16-alpine AS builder

WORKDIR /app

COPY    --from=deps /app/node_modules ./node_modules

COPY    . .

RUN     npm run build

#####################################################################################################
FROM    --platform=${TARGETPLATFORM} node:16-alpine AS runner

WORKDIR /app

ENV     NODE_ENV production

RUN     apk add --no-cache gnupg && \
        addgroup --system --gid 1001 nodejs && \
        adduser --system --uid 1001 nextjs

COPY    --from=builder --chmod=644 /app/public ./public
COPY    --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY    --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER    nextjs

ENV     NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL:-http://localhost:9008} \
        PORT=3000

EXPOSE  $PORT

CMD     ["node", "server.js"]