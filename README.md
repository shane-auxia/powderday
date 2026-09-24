# powderday

Landing page for **powderday** — an AI video app that turns the photos already in your
Apple or Google Photos into the dances, challenges and beat-synced edits trending on
TikTok and Instagram Reels. Built for people who grew up with a phone camera (and years
of photos) but never filmed themselves for short video.

Static site — plain HTML/CSS/JS, no build step, no dependencies.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page markup and copy |
| `styles.css` | All styling |
| `script.js` | Scroll reveals, animated chat demo, signup form |
| `favicon.svg` | Brand mark |
| `CNAME` | Custom domain for GitHub Pages (`powderday.ai`) |
| `.nojekyll` | Tells GitHub Pages to skip Jekyll processing |

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push to the `main` branch of this repo.
2. **Settings → Pages** → Source: *Deploy from a branch* → `main` / `root`.
3. The `CNAME` file sets the custom domain to `powderday.ai`.
4. Point DNS at GitHub (see below), then tick **Enforce HTTPS**.

### DNS for `powderday.ai`

At your domain registrar, add:

**Apex (`powderday.ai`) — A records:**

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**`www` subdomain — CNAME:**

```
www  →  shane-auxia.github.io
```

(Optional IPv6 — AAAA records: `2606:50c0:8000::153` … `8003::153`.)

## Capturing signups

The email form currently confirms in-browser only. To collect real emails on a static
host, point the form at a [Formspree](https://formspree.io) endpoint — see the comment
in `index.html` above the `<form>`.
