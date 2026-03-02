# TrainApp

## 1) Prerequisites

- Node.js 20+
- pnpm 10+
- Docker Desktop (or Docker Engine + Compose)

## 2) Clone and install

```bash
git clone <repo-url>
cd trainapp
pnpm install
```

## 3) Create environment file

Copy the template:

```bash
cp .env.template .env
```

Update these required values in `.env`:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### How to get/generate required values

#### Google OAuth credentials

1. Open https://console.cloud.google.com/
2. Go to **APIs & Services** → **Credentials**
3. Create an **OAuth client ID** (Web application)
4. Add this redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

5. Copy values into `.env`:
	- `GOOGLE_CLIENT_ID`
	- `GOOGLE_CLIENT_SECRET`

### Optional: PWA / Push Notifications (recommended for full feature demo)

If you want to test push notifications locally, set:

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`

Generate VAPID keys with:

```bash
pnpm dlx web-push generate-vapid-keys
```

Then paste:

- **Public Key** → `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
- **Private Key** → `VAPID_PRIVATE_KEY`

Everything else in `.env.template` is already prefilled for local development.

## 4) Start PostgreSQL

```bash
docker-compose up -d
```

## 5) Run migrations

```bash
pnpm db:generate
pnpm db:migrate
```

## 6) Start the app

```bash
pnpm dev
```

Open: http://localhost:3000

## Useful commands

```bash
pnpm test       # run tests
pnpm lint       # lint check
pnpm lint:fix   # auto-fix lint issues
pnpm build      # production build check
pnpm db:studio  # open Drizzle Studio
```
