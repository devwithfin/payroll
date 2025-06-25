# 🚀 My App

A general-purpose application built to demonstrate clean architecture, modular design, and scalability. Built with modern technologies and best practices in mind.

## 🧰 Tech Stack
- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Styling**: Bootstrap 5

## ✨ Features
- 🔧 Modular and scalable project structure  
- ⚙️ Configurable environment with `.env`  
- 🚀 Easy deployment setup  
- 🧪 Ready for testing and CI/CD integration  
- 📱 Responsive UI

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/devwithfin/project-name
cd projet-name
```

### 2. Install Project Dependencies

```bash
npm install
cd frontend
npm install 
cd ../
cd backend
npm install
cd ../
```

### 3. Setup Environment Variables

Create a `.env` file inside the `backend/` folder, then fill it with:
```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_name
JWT_SECRET=jwt_secret

```

### 4. Run Project
Run in root folder :
```bash
npm run dev
```

> Backend Running on : http://localhost:4000

> Frontend Running on: http://localhost:5173


## 📁 Folder Structure
```
backend/
├── routers/
│   └── ...
├── .env
├── db.js
├── index.js

database/
├── .sql

frontend/
├── public/
│   └── ...
├── src/
│   ├── assets/
│   │    └── ...
│   ├── components/
│   │    └── ...
│   │   ├── common/
│   │    └── ...
│   │   ├── dashboard/
│   │    └── ...
│   │   ├── modals/
│   │    └── ...
│   ├── helpers/
│   │    └── ...
│   ├── hooks/
│   │    └── ...
│   ├── layouts/
│   │   └── AppLayout.jsx
│   ├── libs/
│   │   └── axiosInstance.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   └── ...
│   ├── services/
│   │    └── ...
│   ├── routers/
│   │   ├── AppRoute.jsx
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx
│   └── main.js
│   └── index.html
```

## 👤 Team Developer
**Alfiansyah Cahyo Wicaksono (230444180008)** — [GitHub](https://github.com/devwithfin)     
**Eka Nur Aprilia (230444180018)** — [GitHub](https://github.com/ekanrprlia)  
**Hesti Indriyani (230444180002)** — [GitHub](https://github.com/HestiIndriyani)



## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
