# Samhub JavaScript SDK

## Overview
Samhub.js is a simple, lightweight JavaScript SDK designed to interact with the Samhub tracking API. This SDK supports both modern JavaScript module bundlers (like Webpack, Rollup) and traditional browser-based `<script>` tags.

## Installation options

### 1. Install via NPM
```bash
npm install samhub.js
```

### 2. Include via CDN
You can directly use the SDK from a CDN in a browser:
```html
<script async src="https://cdn.jsdelivr.net/npm/samhub.js@1.0.0/dist/samhub.js"></script>
```

### 3. Host sdk on your server
If your security requirements doesn't allow to load external resources, you may include compiled samhub.js copy from your server.
```html
<script async src="dist/samhub.js"></script>
```

## Usage

### In Browser (Using IIFE format)
If you're using the **IIFE** format in the browser (via `<script>`):
```html
<script async src="dist/samhub.js"></script>
<script>
  window.samhubData=window.samhubData || [];
  window.samhubData.push(["init", "data-container-id"])
  window.samhubData.push(["track", "pageView"]) // track standard page view event

  window.samhubData.push(["track", "pageView", {
    url: 'http://example.com/page/about?utm_campaign=newsletter_summer',
    user_id: CRM.curent_user_id
  }]) // track page view with custom data

  window.samhubData.push(["track", "purchase", {
    user_id: "123abc456def",
    timestamp: 1742403361177,
    ced: {
      conversion_value: 150.0,
      conversion_currency: "USD"
      user_segment: "premium"
    }
  }]) // track custom event
</script>
```

### In Modern JavaScript Bundlers (Using ESM format)
If you're using a module bundler like Webpack, Rollup, or just modern JavaScript with `<script type="module">`:
```js
import { Samhub, VERSION } from 'samhub.js';

const sdk = new Samhub("data-container-id");
tracker.track('pageView') // track standard page view event

tracker.track("purchase", {
  user_id: "123abc456def",
  timestamp: 1742403361177,
  ced: {
    conversion_value: 150.0,
    conversion_currency: "USD"
    user_segment: "premium"
  }
}) // track custom event
```

## UserId cookie

By default SDK uses first party UUID cookie to track users. The cookie is set to expire in 365 days.

- cookie_name: samhub
- cookie_expires: 365 days

You may want to change cookie storage to localStorage instead. With constructor option:

```js
 window.samhubData=window.samhubData || [];
  window.samhubData.push(["init", "data-container-id", {
    auto_track_user_id: 'localstorage'
  }])
```

You may also want to disable cookie storage completely and provide user id manually:

```js
 window.samhubData=window.samhubData || [];
  window.samhubData.push(["init", "data-container-id", {
    auto_track_user_id: 'none'
  }])
  window.samhubData.push(["track", "pageView", {
    user_id: "123abc456def"
  }])
```


## CSP - content security policy

Browser installation requires [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) to be configured.
As SDK by default uses loading 1x1 pixel image as data protocol, you need to allow it in your CSP policy.

```js
imgSrc 'self' https://track.samhub.io;
```

**Notice**: If you're using custom tracking domain, you need to allow it as well.


## External dependencies

- [uuid](https://github.com/uuidjs/uuid) - used to generate user id (until disabled)
- [qs](https://github.com/ljharb/qs) - used to serialize pixel data
- [js-cookie](https://github.com/js-cookie/js-cookie) - used to store user id in cookie (until disabled)

## API Reference

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
