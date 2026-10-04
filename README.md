# Farm2Table

> Simple, static web frontend for a farm-to-consumer ordering flow:
> landing page, farmer pages, cart/checkout flow and farmer dashboard.

## Quick summary
Farm2Table is a small static website demonstrating a minimal farm-to-consumer ordering front-end. It includes sample pages for shoppers and farmers, a basic cart & checkout flow, and a tiny farmer dashboard. This project is intended as a lightweight demo / learning project or starting point for a small marketplace prototype.

## Features
- Landing / index page
- Farmer listing and farmer dashboard pages
- Simple cart and payment flow (static mock)
- Lightweight client-side logic in `app.js`
- Styling with plain CSS (`styles.css`)
- Sample images in `images/`

## Tech stack
- HTML, CSS, JavaScript (client-side only — no backend included)
- GPL-3.0 license

## Files of interest
- `index.html` — Homepage / listing
- `farmers.html` — Farmers listing
- `farmerLogin.html` / `farmerdashboard.html` — Farmer flows
- `cart.html`, `payment.html`, `delivery.html` — Cart & checkout pages
- `app.js` — Client-side logic / interactions
- `styles.css` — Styling
- `images/` — Assets used by the pages

## Local preview
This is a static site — open `index.html` in your browser, or serve it with a simple HTTP server:

### With Python 3 (recommended)
```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

### With Node (serve)
```bash
npm install -g serve
serve .
# open the provided localhost URL
```

## Contributing

Contributions, bug reports and improvements are welcome.

Suggested workflow:

1. Fork the repository.
    
2. Create a feature branch: `git checkout -b feat/my-change`.
    
3. Commit changes and push.
    
4. Open a pull request describing the change.

Please keep pull requests small and focused (UI, accessibility, bugfixes, modular JS, or converting to a backend-based demo are good candidates).

## Roadmap / ideas

- Replace static mock checkout with a simple backend (Node/Express or Firebase)
    
- Add user authentication and per-farmer product management
    
- Improve accessibility & responsiveness
    
- Add tests and CI (linting for JS/CSS, HTML validation)
    
- Optimize images and provide responsive image sets

## License

This project is licensed under the **GPL-3.0** license. See the `LICENSE` file for details.

## Project status

This is intentionally a static prototype. Product, farmer, cart, order, payment, and delivery data are simulated in the browser; there is no production backend or real payment processing.
