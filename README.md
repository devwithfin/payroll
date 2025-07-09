# 🚀 Payroll App

A web-based Payroll Management System designed to simplify and automate employee salary calculations. This system enables HR or finance departments to manage payroll, taxes, deductions, and salary slips efficiently.

## 🧰 Tech Stack
- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Styling**: Bootstrap 5

## 📌 Features
- 🧑 Employee data management  
- 🕒 Attendance & leave tracking  
- 💰 Automatic salary calculation (base salary, allowances, deductions)  
- 📄 Digital payslip generation  
- 🧾 Tax (PPh 21) and BPJS calculation  
- 📊 Payroll reporting and export (PDF/Excel)

## 📦 Setup Instructions

### 🧪 1. Requirements 
- Node.js
- MySQL (via Laragon, XAMPP, or other local DB server)
- Git

### 📥 2.  Clone the Repository 

```bash
git clone https://github.com/devwithfin/payroll
cd payroll
```

### 📦 3. Install Dependencies 

```bash
# Install root dependencies
npm install
# Install fron dependencies
cd frontend
npm install 
cd ../
# Install backend dependencies
cd backend
npm install
cd ../
```

### 🛠️ 4. Configure Database  
Ensure your MySQL server is running (via Laragon/XAMPP). Then:

Create a new MySQL database :
```
CREATE DATABASE payroll;
USE payroll;
```

### 5. Run Migrations & Seeders 🧱

```bash
cd backend
npm run migrate
npm run seed
```

### 6. Run the Project  🚀 

```
npm run dev
```
> Backend Running on : http://localhost:4000

> Frontend Running on: http://localhost:5173


## 📁 Folder Structure
```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── ...
├── middlewares/
│   └── ...
├── migrations/
│   └── ...
├── models/
│   └── ...
├── routers/
│   └── ...
├── .env
├── db.js
├── index.js

database/
├── payroll.sql

frontend/
├── public/
│   └── ...
├── src/
│   ├── assets/
│   │   └── ...
│   ├── components/
│   │   └── ...
│   │   ├── common/
│   │       └── ...
│   │   ├── dashboard/
│   │       └── ...
│   │   ├── modals/
│   │       └── ...
│   ├── hooks/
│   │       └── ...
│   ├── layouts/
│   │   └── AppLayout.jsx
│   ├── libs/
│   │   └── axiosInstance.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   └── ...
│   ├── services/
│   │   └── ...
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

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Made With](https://img.shields.io/badge/Made%20with-React%20%26%20Express-blue)

