# Portfolio with AI Chatbot

A modern personal portfolio site built with React, showcasing projects and skills, featuring an integrated AI chatbot and contact form powered by EmailJS. Deployed on a DigitalOcean Droplet with backend support and Telegram bot integration.

---

## 🚀 Features

- ⚡ Fast and responsive design using **React + TailwindCSS**
- 🤖 Integrated AI chatbot powered by **OpenAI API**
- ✉️ Contact form with **EmailJS** (sends emails to your personal inbox)
- 💬 Early-stage **Telegram bot integration** (not yet complete)
- 🌐 Deployed on **DigitalOcean**
- 🧠 Future plans for improved UI and smarter chatbot interactions

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **Backend**: Node.js (no TypeScript)
- **Database**: MongoDB (for storing contact or bot-related data)
- **APIs & Services**:
  - EmailJS (contact form)
  - OpenAI API (chatbot)
  - Telegram Bot API (in-progress)
- **Deployment**: DigitalOcean Droplet (Ubuntu, Nginx)

---

## 📦 Installation

```bash
git clone https://github.com/AbduboriyAhmadjonov/Portfolio.git
cd Portfolio
npm install
```

## ▶️ Usage

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production (if you have a backend and reverse proxy):

```bash
npm run build
npm start
```

## 🧩 Environment Variables

Create a `.env` file in the root directory. Example:

```env
VITE_SERVICE_ID="your_service_id"
VITE_TEMPLATE_ID="your_template_id"
VITE_PUBLIC_KEY="your_public_key"
```

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── logo.svg
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── App.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── MobileMenu.jsx
│   │   │   └── Navbar.jsx
│   │   ├── ui/
│   │   │   ├── ChatButton.jsx
│   │   │   ├── Icon.jsx
│   │   │   ├── Icons.jsx
│   │   │   └── LoadingScreen.jsx
│   ├── error/
│   │   ├── error.css
│   │   ├── ErrorBoundary.jsx
│   │   └── ErrorDisplay.jsx
│   ├── hooks/
│   │   └── RevealOnScroll.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   └── Projects.jsx
│   ├── styles/
│   │   └── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔒 Security Considerations

- Never commit secrets or API keys to version control.
- Use HTTPS in production.
- Sanitize and validate all user input.

## 🤖 AI & Automation

- Integrates with OpenAI API for GPT-4-powered features. (look at this repo https://github.com/AbduboriyAhmadjonov/learning-langchain.git)
- Automation via Telegram Bot API and EmailJS for notifications.

## 🤝 Contribution Guidelines

1. Fork the repo and create your branch.
2. Commit your changes with clear messages.
3. Open a pull request describing your changes.
4. Follow the code style and add tests if possible.

## 📄 License

[MIT](LICENSE)

## 👤 Author & Contact

- **Name:** Abduboriy Ahmadjonov
- **Portfolio:** [abduboriy.me](https://abduboriy.me)
- **Telegram:** [@abduboriy05](https://t.me/abduboriy05)
