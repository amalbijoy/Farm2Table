# Farm2Table

> Static farm-to-consumer ordering interface prototype.

## Overview

Farm2Table demonstrates a lightweight shopping flow with farmer listings, products, cart state, a mock checkout flow, delivery status, and a farmer dashboard.

The current implementation is intentionally client-side only. Product and farmer data are sample data, and checkout/order state is stored in browser LocalStorage. There is no production backend or external service integration.

## Features

- Product and farmer listings
- Client-side cart management
- Mock checkout and order state
- Delivery-status prototype
- Farmer login/dashboard pages
- Responsive HTML/CSS/JavaScript interface

## Tech stack

- HTML5
- CSS3
- JavaScript
- Browser LocalStorage

## Run locally

Serve the repository with a small static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Validation

A lightweight Node-based consistency check verifies that product/farmer identifiers are unique:

```bash
node tests/validate_data.mjs
```

## Data and limitations

This repository is a prototype for learning and UI demonstration. Prices, names, images, delivery states, and order IDs are sample data.

## Roadmap

- Modular client-side modules
- Accessibility and responsive-design testing
- Backend API
- Authentication
- Persistent server-side orders
- Real inventory and delivery integration

## License

GPL-3.0
