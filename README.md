Here’s a **clean, professional README.md** you can directly paste into your GitHub repo 👇

---

# 📊 Intelli-CSV — AI Powered CSV Dashboard + Chatbot

Intelli-CSV is a full-stack data dashboard web app where users can upload CSV files, generate charts, and interact with an AI chatbot to analyze their dataset.

Built for learning full-stack + AI integration.

---

# 🚀 Features

### 📁 CSV Upload & Analysis

* Upload any CSV dataset
* Automatically detect rows & columns
* Preview dataset instantly

### 📊 Smart Chart Generator

Create charts dynamically from CSV:

* Bar chart
* Line chart
* Area chart
* Pie chart
* Histogram
* Scatter plot
* Treemap

Features:

* Choose X & Y columns
* Custom chart title
* Choose chart color 🎨
* Export chart as PNG / SVG

---

### 🤖 AI CSV Chatbot (LLM Powered)

Ask questions about your dataset like:

* "Describe dataset"
* "How many rows?"
* "How many columns?"
* "Show preview"
* "Insights about sales"

Supports:

* Gemini / Groq / LLM APIs
* Markdown formatted responses
* Dataset-aware answers

---

# 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Recharts
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* SQLite
* Sequelize ORM
* JWT Authentication

### AI Integration

* Groq API
* CSV context prompt injection

---

# 📦 Project Structure

```
client/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── services/
 │   └── App.jsx

server/
 ├── src/
 │   ├── routes/
 │   ├── controllers/
 │   ├── models/
 │   └── app.js
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone repo

```
git clone https://github.com/YOUR_USERNAME/intelli-csv.git
cd intelli-csv
```

---

## 2️⃣ Install dependencies

### Client

```
cd client
npm install
```

### Server

```
cd server
npm install
```

---

## 3️⃣ Setup environment variables

### client/.env

```
VITE_API_URL=http://localhost:4000
```

### server/.env

```
PORT=4000
JWT_SECRET=your_secret
GROQ_API_KEY=your_key   (or GEMINI_API_KEY)
NODE_ENV=development
```

---

## 4️⃣ Run project locally

### Start backend

```
cd server
npm run dev
```

### Start frontend

```
cd client
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 🧠 Example chatbot questions

Try asking:

* Describe the dataset
* Total rows?
* Column names?
* Show first rows
* Insights about sales
* Which country has highest sales?

---

# 📸 Export Charts

Users can:

* Download PNG
* Download SVG
* Choose custom colors
* Edit/Delete charts

---

# 🧪 Future Improvements

* AI auto-insight generation
* Dashboard sharing
* PDF export
* Advanced analytics
* Dark/light themes

---

# 👩‍💻 Author

Built by **Nayanpriya**
CSE Student | Full-Stack + AI Builder 🚀

---

# ⭐ If you like this project

Give it a star on GitHub ⭐
Helps a lot :)



