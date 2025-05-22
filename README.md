# Full Stack Internship Assignment

## Project: "Todo Summary Assistant"

### Objective:

Build a fully functional full-stack application where a user can:

● Create and manage personal to-do items.
● Click a button to summarize all pending to-dos using an actual LLM (OpenRouter).
● Send the generated summary to a Slack channel.

---

## Stack & Tools Used

Frontend

* React (Vite)

Backend

* Node.js (Express)

Database

* Supabase (PostgreSQL)

LLM Integration

* OpenRouter API (OpenAI, Cohere, Mistral compatible)

Slack Integration

* Slack Bot with Chat PostMessage API

---

## Functionality

### Frontend (React)

● Add, edit, delete to-do items
● View list of current to-dos
● Button to generate and send the summary
● Show a success/failure message for the Slack operation

### Backend (Node.js)

● GET /todos – Fetch all todos
● POST /todos – Add a new todo
● DELETE /todos/\:id – Delete a todo
● POST /summarize – Summarize todos and send to Slack

---

## Setup Instructions

1. Clone the Repository

```bash
git clone https://github.com/anirudh89201/AI-summary-Todo.git
cd AI-summary-Todo
```

2. Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. Configure Environment Variables

Create `.env` files using the provided `.env.example` in both `client` and `server` directories.

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Then, fill in the actual values for:

* Supabase URL and Key
* OpenRouter API Key
* Slack Bot Token
* Slack Channel ID

4. Run the Application Locally

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

---

## Slack and LLM Setup Guidance

### Slack Setup

● Create a Slack App at [https://api.slack.com/apps](https://api.slack.com/apps)
● Enable "Bot Token Scopes" and add `chat:write` permission
● Install the app to your workspace and copy the `Bot User OAuth Token`
● Obtain your `Slack Channel ID` from your Slack workspace
● Set both values in `server/.env` as:

```env
SLACK_BOT_TOKEN=xoxb-...
SLACK_CHANNEL_ID=C01ABCDEF12
```

---

### LLM Setup (OpenRouter)

● Register at [https://openrouter.ai](https://openrouter.ai)
● Get your API key
● Add it to your `.env` file as:

```env
OPENROUTER_API_KEY=your-api-key
```

The backend uses OpenRouter to send the list of pending todos and receive a natural-language summary for Slack posting.

---

## Design / Architecture Decisions

● Used React (Vite) for fast, modular frontend development
● Node.js (Express) backend to create a clean REST API
● Supabase PostgreSQL was selected for easy cloud-hosted DB with real-time support
● Slack integration is implemented via `@slack/web-api` and the bot is reusable
● The app is structured into services/controllers for clean separation of concerns
● Environment variables are used to securely manage keys and tokens

---

## Environment Variables – `.env.example`

### `server/.env.example`

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-api-key
OPENROUTER_API_KEY=your-openrouter-api-key
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_CHANNEL_ID=your-slack-channel-id
PORT=5000
```

### `client/.env.example`

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## Optional Deployment

The project can optionally be deployed using:

● Backend: Render / Railway
● Frontend: Vercel / Netlify
● Database: Supabase

> Example (if deployed): [https://ai-summary-todo.vercel.app](https://ai-summary-todo.vercel.app)

---

## Deliverables

● ✅ Source code (frontend and backend)
● ✅ `.env.example` file
● ✅ `README.md` with:

* Setup instructions
* Slack and LLM setup guidance
* Design/architecture decisions
  ● ✅ Public GitHub Repository:
  [https://github.com/anirudh89201/AI-summary-Todo](https://github.com/anirudh89201/AI-summary-Todo)
  ● (Optional) Deployed URL (if available)
https://ai-summary-todo.vercel.app/

![App Screenshot](./assets/Screenshot(316).png)
