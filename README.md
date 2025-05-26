# Crypto UI Genesis

## Overview

Crypto UI Genesis is a modern React + Vite web app for exploring and tracking crypto assets. It features a login page, a dashboard with trending tokens, and detailed token pages with interactive charts. The UI is styled with Tailwind CSS and shadcn-ui components.

---

## Project Structure & Page Relations

- **src/App.tsx**: Main entry, sets up routing for all pages.
- **src/pages/LoginPage.tsx**: Login form, authenticates users via the users API.
- **src/pages/Index.tsx**: Dashboard/homepage, lists trending tokens and allows navigation to token details.
- **src/pages/TokenDetailPage.tsx**: Loads token details by slug (name or id) from the URL, fetches token data, and renders the detail view.
- **src/components/tokens/TokenRow.tsx**: Renders a summary row for each token in the dashboard.
- **src/components/tokens/TokenDetail.tsx**: Shows detailed info and a candlestick chart for a token, fetching price history from APIs.
- **src/pages/NotFound.tsx**: 404 page for unmatched routes.

---

## API Usage

### 1. User Login

- **Endpoint:** `https://682fe7f8f504aa3c70f599c3.mockapi.io/api/web3gmgn/users`
- **Usage:**
  - The Login page fetches all users and checks credentials on form submit.
  - On success, redirects to the dashboard (Index page).

### 2. Dashboard Data

- **Endpoint:** `https://682fe7f8f504aa3c70f599c3.mockapi.io/api/web3gmgn/dashboardData`
- **Usage:**
  - The Index page fetches dashboard data on load.
  - Each dashboard entry contains a list of `cryptoAssets` (tokens) with summary info (name, symbol, price, liquidity, market cap, etc).
  - Tokens are displayed using `TokenRow`. Clicking a token navigates to its detail page.

### 3. Token Details & Chart Data

- **Endpoint:** `https://682fe7f8f504aa3c70f599c3.mockapi.io/api/web3gmgn/cryptocurrencies`
- **Usage:**
  - The TokenDetailPage fetches all tokens and finds the one matching the URL slug (by name or id).
  - Passes token data to `TokenDetail` for display.
  - `TokenDetail` fetches price history from both the dashboard and cryptocurrencies APIs, combines the data, and synthesizes fake OHLC (open, high, low, close) data from price points to render a demo candlestick chart.

---

## Navigation Flow

- **Login:** `/login` → On success, redirects to `/` (dashboard).
- **Dashboard:** `/` (or `/trending`, `/trenches`, etc) → Lists tokens. Clicking a token navigates to `/token/:slug`.
- **Token Detail:** `/token/:slug` → Loads and displays detailed info and chart for the selected token.
- **404:** Any unmatched route shows the NotFound page.

---

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

---

## Chart Logic

- The candlestick chart on the token detail page is synthesized from available price points (since the API does not provide OHLC data).
- Each candle is generated from a sliding window of 4 price points (open, high, low, close).
- The chart is rendered as a minimal SVG for performance and clarity.

---

## Running & Editing

1. **Clone the repo:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   npm i
   npm run dev
   ```
2. **Edit in your IDE or via Lovable.**
3. **Deploy:** Use Lovable's Share → Publish feature.

---

## Custom Domain

You can connect a custom domain via Lovable Project > Settings > Domains.

For more, see [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
