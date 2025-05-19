# 🛒 ChainCart

**ChainCart** is a full-stack e-commerce web application built with **Next.js** and **TypeScript**, integrating **Supabase** for backend services and **Web3 (Sepolia testnet)** for crypto payments via MetaMask. Stripe test payments are also supported.

---

## ✨ Features

- 🔐 **Authentication** via Supabase
- 🛍️ **Products page** with category filter
- 🧺 **Shopping cart** management (Cart/Saved for later)
- 📦 **Orders page** with purchase history
- 👤 **Profile dashboard**:
  - Total orders (last 30 days/all time)
  - Total spend
  - Order History
- 💳 **Payment options**:
  - Stripe (test mode)
  - MetaMask (Sepolia testnet)

---

## 🧰 Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Supabase (DB + Auth)**
- **Stripe (test)**
- **MetaMask + Sepolia ETH**

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/quwrof00/neo-shop
cd ecommerce-app

# Install dependencies
npm install

# Start the dev server
npm run dev

# Environment Variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
REDIRECT_URI=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_APP_URL=
```
Make sure MetaMask is connected to the Sepolia testnet with test ETH.
---
## 📄 License
---
MIT

## 🙋‍♂️ Author
---
Built by quwrof00!

Feel free to fork, star, or reach out!

**Contact**: shouryaagrawal2806@gmail.com
