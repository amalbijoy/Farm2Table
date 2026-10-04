# Farm2Table

> Static farm-to-consumer ordering interface prototype.

## Overview

Farm2Table demonstrates a lightweight shopping flow with farmer listings, product browsing, cart state, mock checkout, delivery-status UI, and a farmer dashboard.

The implementation is intentionally client-side. Product and farmer records are sample data, cart/order state is stored in browser LocalStorage, and there is no production backend, payment service, or server-side inventory.

## Features

- Product and farmer listings
- Client-side cart management
- Quantity controls
- Mock checkout and order creation
- Order status and cancellation prototype
- Delivery-status UI
- Farmer login/dashboard pages
- Responsive HTML/CSS/JavaScript interface
- Order IDs generated with `crypto.randomUUID()` when available, with a timestamp fallback

## Data validation

A small Node.js consistency check verifies that product and farmer IDs are unique:

```bash
node tests/validate_data.mjs
```

The product catalogue currently uses unique IDs, including separate IDs for Apples and Watermelon.

## Run locally

Serve the repository with a simple static server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Data and limitations

Names, prices, images, ratings, delivery states, and order information are sample/prototype data.

Checkout does not process real payments, and order state is stored only in the browser. The cancellation message is also part of the prototype flow rather than a real refund service.

## Development

GitHub Actions runs the lightweight data-validation check.

## Roadmap

- Modular client-side modules
- Accessibility and responsive-design testing
- Backend API
- Authentication
- Server-side orders and inventory
- Real delivery/payment integration

## License

See [LICENSE](LICENSE).
