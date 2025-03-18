# Samhub JavaScript SDK

## Overview
Samhub is a simple, lightweight JavaScript SDK designed to interact with the MyAPI service. This SDK supports both modern JavaScript module bundlers (like Webpack, Rollup) and traditional browser-based `<script>` tags.

## Features
- **Versioning**: Dynamically pulls the version from the `package.json`.
- **Multiple export formats**: Supports both **ESM** for module bundlers and **IIFE** for traditional `<script>` tag usage.
- **Easy-to-use API**: Fetch data from the API with ease.

## Installation

### 1. Install via NPM
```bash
npm install samhub.js
```

### 2. Include via CDN
You can directly use the SDK from a CDN in a browser:
```html
<script src="https://cdn.example.com/samhub.js"></script>
<script>
  const sdk = new SamhubNamespace.Samhub("your-api-key");
  sdk.fetchData("users").then(console.log);
</script>
```

## Usage

### In Browser (Using IIFE format)
If you're using the **IIFE** format in the browser (via `<script>`):
```html
<script src="dist/samhub.js"></script>
<script>
  const sdk = new SamhubNamespace.Samhub("your-api-key");
  sdk.fetchData("users").then(console.log);

  console.log(SamhubNamespace.VERSION); // Logs: "1.0.0"
</script>
```

### In Modern JavaScript Bundlers (Using ESM format)
If you're using a module bundler like Webpack, Rollup, or just modern JavaScript with `<script type="module">`:
```js
import { Samhub, VERSION } from 'samhub.js';

const sdk = new Samhub("your-api-key");
sdk.fetchData("users").then(console.log);

console.log(VERSION); // Logs: "1.0.0"
```

## API Reference

### `new Samhub(apiKey: string)`
The constructor for initializing the SDK.

#### Parameters:
- `apiKey` (string): Your API key for accessing MyAPI.

### `sdk.fetchData(endpoint: string)`
Fetches data from a specific endpoint on MyAPI.

#### Parameters:
- `endpoint` (string): The API endpoint you want to query.

#### Returns:
- A `Promise` that resolves to the data from the API.

### `Samhub.VERSION`
The current version of the SDK, pulled from `package.json`.

---

## Development

### Setup

1. Clone this repository:
   ```bash
   git clone git@github.com:brainnordic/samhub-js.git
   cd samhub-js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the SDK:
   ```bash
   npm run build
   ```

### Linting

We use [ESLint](https://eslint.org/) to enforce code quality. To run the linting process:

```bash
npm run lint
```

To fix automatically fixable issues:

```bash
npm run lint:fix
```

### Testing

Include unit or integration tests here if applicable. For now, this project doesnt include automated tests.

---

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
