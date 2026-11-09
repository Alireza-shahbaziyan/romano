# Romano Finger — Frontend

This is the frontend for **رومانو فینگر | Romano Finger** — a Persian (RTL) website for a finger food and VIP event styling business in Yazd, Iran. It is built with **Next.js** and **Bun**, and designed to work with the [Pen](https://github.com/joqd/pen) backend (a Django-based API).

The website is a business/catalog/blog platform: products are ordered directly through WhatsApp and Instagram, so there is no shopping cart, checkout, or online payment in this codebase.

## Prerequisites

- [Bun](https://bun.sh) (v1 or higher)
- Docker and Docker Compose (for containerized runs)
- Access to a running instance of the [Pen](https://github.com/joqd/pen) backend (local or remote)

## Environment Variables

Before running the project, copy `.env.example` to `.env` and adjust the values for your environment:

```bash
cp .env.example .env
```

The most important variable is `NEXT_PUBLIC_API_URL`, which should point to your Pen backend instance. `NEXT_PUBLIC_INSTAGRAM_URL` sets the business Instagram profile used by the ordering links (a placeholder is used until the real account is added).

---

## Running in Development

### Option 1: Directly with Bun

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:3000`.

### Option 2: With Docker Compose

```bash
docker compose up --build
```

> Note: the current Dockerfile is optimized for a production build. For day-to-day development, running `bun run dev` directly is faster and more convenient, since changes are reflected instantly without rebuilding the image.

---

## Running in Production

### With Docker Compose (recommended)

```bash
# Build the image and start the container
docker compose up --build -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

The app will be available on the port set in `.env` (variable `PORT`, defaults to `3000`).

### Without Docker

```bash
bun install
bun run build
bun run start
```

---

## Useful Commands

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `bun run dev`   | Start the dev server with hot reload |
| `bun run build` | Build the production bundle          |
| `bun run start` | Run the built production app         |
| `bun run lint`  | Lint the codebase with ESLint        |

---

## Project Structure

```
├── app/            # Pages and routing (App Router)
├── components/     # UI components, organized by domain
├── lib/            # API client, site config, and utility functions
└── types/          # TypeScript types
```

---

## Contributing

Contributions are welcome:

1. Fork the repository.
2. Create a new branch for your change:
    ```bash
    git checkout -b feature/my-feature
    ```
3. Make your changes and commit them (please keep commit messages clear and concise).
4. Before opening a Pull Request, make sure:
    - `bun run lint` passes without errors.
    - The project builds successfully with `bun run build`.
5. Open a Pull Request describing your changes.

For bug reports or feature requests, please use the Issues section of this repository.

---

## License

This project is licensed under the [MIT License](./LICENSE). Use, modification, and distribution are permitted with attribution.
