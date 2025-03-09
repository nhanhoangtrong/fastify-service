# Fastify Service Quickstart

This is a starter boilerplate for building robust and scalable APIs using Fastify + Drizzle + PostgreSQL, a fast and low overhead web framework for Node.js.

## Features

* **Fastify Core:** Leverages the speed and efficiency of Fastify.
* **Structured Project:** Organized project structure for maintainability and scalability.
* **Environment Variables:** Uses `.env` files for configuration management.
* **Logging:** Integrated logging with [Pino](https://getpino.io/) for efficient and structured logging.
* **Configuration:** Centralized configuration using [dotenv](https://www.npmjs.com/package/dotenv).
* **Plugin System:** Organized plugin registration for modularity.
* **Route Handling:** Clear and concise route definitions.
* **Error Handling:** Centralized error handling for consistent responses.
* **Health Check:** A basic health check endpoint for monitoring.
* **Example Route:** A sample route to get you started.
* **Easy to Extend:** Designed to be easily extended and customized.
* **Fast linting and formatting:** Auto lint and format code using Biome

## Getting Started

### Prerequisites

* Node.js (>= 20)
* pnpm or yarn

## How to Use

* Clone project
* Configure env file: `cp .env.example .env`
* Run install: `pnpm install`
* Run seed db: `node seeds/01-first-seed.js`
* Start dev server, auto restart when changes: `pnpm dev`
* The server will be running at `http://localhost:3000` (or your configured port).

Recommendation:

* Using Bun to quickly run development server: `bun --watch main.js`

Production:

* Run: `pnpm start`
* PM2: `pm2 start app.yml --env production`

### Available Scripts

* `pnpm run dev`: Starts the development server with hot reloading.
* `pnpm run start`: Starts the production server.
* `pnpm run test`: Runs tests (if you add them).
* `pnpm run lint`: Runs linting.
* `pnpm run format`: Runs code formatting.

### Project Structure

```txt
├── .env.example              # Example environment variables
├── .env                      # Environment variables
├── seeds/                    # DB seed files
│   └── ...
├── drizzle/                  # Drizzle generated SQL
│   └── ...
├── lib/
│   ├── plugins/              # Fastify plugins
│   │   └── ...
│   ├── routes/               # Route handlers
│   │   ├── status.route.js   # Health check route
│   │   └── fng.route.js      # Example route
│   ├── utils/                # Utility functions
│   │   └── ...
│   ├── config.js             # Configuration file
│   ├── fastify.js            # Fastify application file
│   └── ...
├── main.js                   # Server initialization
├── drizzle.config.js         # Drizzle config file
├── biome.json                # Biome config file
├── package.json
├── pnpm-lock.yaml
├── README.md
└── ...
```

### Configuration

Environment variables are managed using `.env` files. You can configure the following variables:

* `PORT`: The port the server will listen on (default: 3000).
* `NODE_ENV`: The environment (development, production, etc.).
* `LOG_LEVEL`: The logging level (e.g., info, debug, error).

### Logging

Logging is handled by Pino. You can configure the logging level using the `LOG_LEVEL` environment variable.

### Plugins

Fastify plugins are located in the `lib/plugins` directory. You can register plugins in the `lib/fastify.js` file.

### Routes

Route handlers are located in the `lib/routes` directory. You can define new routes by creating new files in this directory.

### Error Handling

Centralized error handling is implemented in the `lib/fastify.js` file. You can customize error responses by modifying this file.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

The MIT License (MIT)

Copyright (c) 2025 nhanhoangtrong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
