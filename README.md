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
  window.samhubData.push(["track", "page_view"]) // track standard page view event

  window.samhubData.push(["track", "page_view", {
    url: 'http://example.com/page/about?utm_campaign=newsletter_summer',
    user_id: CRM.curent_user_id
  }]) // track page view with custom data

  window.samhubData.push(["track", "purchase", {
    user_id: "123abc456def",
    timestamp: 1742403361177,
    ced: {
      conversion_value: 150.0,
      conversion_currency: "USD",
      user_segment: "premium"
    }
  }]) // track custom event
</script>
```

### In Modern JavaScript Bundlers (Using ESM format)
If you're using a module bundler like Webpack, Rollup, or just modern JavaScript with `<script type="module">`:
```js
import { Samhub, VERSION } from 'samhub.js';

const sdk = new Samhub.Tracker("data-container-id");
tracker.track('page_view') // track standard page view event

tracker.track("purchase", {
  user_id: "123abc456def",
  timestamp: 1742403361177,
  ced: {
    conversion_value: 150.0,
    conversion_currency: "USD",
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
  window.samhubData.push(["track", "page_view", {
    user_id: "123abc456def"
  }])
```


## CSP - content security policy

Browser installation requires [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) to be configured.
As SDK by default uses 1x1 pixel image as data protocol, you need to allow it in your CSP policy.

```js
imgSrc 'self' https://track.samhub.io;
```

**Notice**: If you're using custom tracking domain, you need to allow it instead.


## External dependencies

- [uuid](https://github.com/uuidjs/uuid) - used to generate user id (until disabled)
- [qs](https://github.com/ljharb/qs) - used to serialize pixel data
- [js-cookie](https://github.com/js-cookie/js-cookie) - used to store user id in cookie (until disabled)

## SDK API Reference

### [Samhub.Tracker](./src/tracker.ts)
#### Methods

- `init(containerId: string, options?: TrackerOptions)` - initialize the SDK
- `track(eventName: string, eventData: EventData = {})` - track event

#### Methods (global window.samhubData interface)

- `window.samhubData=window.samhubData || [];` - initialize data layer
- `window.samhubData.push(["init", containerId?: string, options?: TrackerOptions])` - initialize the SDK
- `window.samhubData.push(["track", eventName: string, eventData: EventData = {}])` - track event

#### Types

```typescript
TrackerOptions = {
  api_url?: string; // defaults to 'https://track.samhub.io/v1/e.gif'
  auto_track_user_id?: 'cookie' | 'localstorage' | 'none'; // defaults to 'cookie' - if `none` is set, user id must be provided
  auto_track_referrer?: boolean; // defaults to true
  auto_track_url?: boolean;  // defaults to true (parses current browser url and extract domain, path, utm_source, utm_medium, utm_campaign)
  debug?: (...args: any) => void; // debug function, e.g. debug: console.log, disabled by default
}
```

```typescript
EventData = {
  url?: string; // used to extract domain, path, utm_source, utm_medium, utm_campaign, default to current browser url if auto_track_url is enabled
  path?: string; // event path - default to current browser path
  host?: string; // event domain - default to current browser domain
  zipcode?: string; // user zipcode - default to current browser zipcode resolved from ip
  ip?: string; // user ip - default to current browser ip
  utm_source?: string; // utm_source, default: utm_source  from current url
  utm_medium?: string; // utm_medium, default: utm_medium from current url
  utm_campaign?: string; // utm_campaign, default: utm_campaign from current url
  referrer?: string; // event referrer, default to current page referrer
  timestamp?: number; // event timestamp, default to current timestamp
  event_id?: string; // unique event id, default to uuid, only recent event with the same id will be tracked
  user_id?: string; // user id, default to uuid stored in samhub cookie
  ced?: { // custom event data, do not provide PII here
    [key: string]: string | number;
  };
}
```


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
