# 🚀 HRIS & Payroll System

A comprehensive web-based Human Resource Information System (HRIS) combined with a powerful payroll engine. Designed to streamline HR operations, manage employee data, track attendance, and automate salary processing — all in one place.

## 🧰 Tech Stack
- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **UI Framework**: Bootstrap 5

## 📌 Features
- 🧑 Employee data management
- 🕒 Attendance & leave tracking
- 💰 Automatic salary calculation (base salary, allowances, deductions)
- 📄 Digital payslip generation
- 🧾 Tax (PPh 21) and BPJS calculation
- 🎯 Draft & final payroll processing
- 🧾 Overtime, allowance management
- 🔐 Role-based access & account activation

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
npm run start-db
```

### 6. Run the Project  🚀 

```bash
# in root folder
npm run dev
```
> Backend Running on : http://localhost:4000

> Frontend Running on: http://localhost:5173


### 7. User Info (Login) 

```bash
# as HR
email : bayuanggara@gmail.com
password : password123

# as Finance
email : puspitadewi@gmail.com
password : password123

# as Employee
email : alfiansyahcahyow@gmail.com
password : password123
```

## 📁 Folder Structure
```
backend/
├── config/
│   └── config.js
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
│   │   ├── employee/
│   │       └── ...
│   │   ├── finance/
│   │       └── ...
│   │   ├── hr/
│   │       └── ...
│   ├── contexts/
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
│   ├── providers/
│   │       └── ...
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

