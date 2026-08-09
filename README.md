# abduboriy.me — personal site

Source for [abduboriy.me](https://abduboriy.me). A single-page portfolio: what I
work on, the projects behind it, and a contact form.

Built with React 19, TypeScript, Vite and Tailwind CSS v4. Self-hosted on a
Hetzner VPS behind nginx, with TLS from Let's Encrypt.

## Stack

| | |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Contact form | EmailJS (no backend needed) |
| Hosting | Hetzner VPS · Ubuntu · nginx · Let's Encrypt |

The site is fully static — nginx serves the built files straight from disk.
The optional chat widget talks to a separate service on its own subdomain; the
site works without it.

## Running it locally

```bash
npm ci
cp .env.example .env   # fill in your own EmailJS values
npm run dev            # http://localhost:5173
```

## Environment variables

Vite inlines these at **build time**, so `.env` must exist on the machine that
runs `npm run build` — putting it on the server does nothing.

```env
VITE_SERVICE_ID=      # EmailJS service id
VITE_TEMPLATE_ID=     # EmailJS template id
VITE_PUBLIC_KEY=      # EmailJS public key
VITE_BACKEND_URL=     # chat backend origin, no trailing slash
```

None of these are secrets — every `VITE_*` value is compiled into the JavaScript
that ships to the browser. The EmailJS account is protected with domain
allowlisting, not by hiding them.

`VITE_BACKEND_URL` must be set even if the chat backend is not running. Omitting
it makes the value the string `undefined`, and the widget then requests
`undefined/api/chat`.

## Build and deploy

```bash
npm run build                                    # -> dist/
rsync -avz --delete dist/ user@host:/var/www/abduboriy.me/
```

`dist/` is fully self-contained. nginx needs an SPA fallback
(`try_files $uri $uri/ /index.html`) so deep links resolve.

## Author

- **Abduboriy Ahmadjonov** — backend-focused full-stack developer, Tashkent
- [abduboriy.me](https://abduboriy.me) · [github.com/AbduboriyAhmadjonov](https://github.com/AbduboriyAhmadjonov) · [t.me/abduboriy05](https://t.me/abduboriy05)

## License

[MIT](LICENSE)
