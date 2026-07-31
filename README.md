
# 📚 Book Management System - Full Stack MERN Application

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT"/>
</p>

### 🎯 **Live URL:** [https://book-management-gold-seven.vercel.app](https://book-management-gold-seven.vercel.app)

---

## 📖 Project Overview

A **Full-Stack Book Management System** built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). This application allows users to **manage books**, **borrow/return books**, **write reviews**, **track reading progress**, and **analyze statistics** with a beautiful, responsive UI.

---

## 🌟 Key Features

### 🔐 **Authentication & Security**
- ✅ JWT Authentication (Login/Register)
- ✅ Protected Routes
- ✅ Forgot Password with OTP
- ✅ Password Change
- ✅ Profile Management

### 📚 **Book Management**
- ✅ CRUD Operations (Create, Read, Update, Delete)
- ✅ Book Details View
- ✅ Cover Image Support
- ✅ Advanced Search & Filter
- ✅ Genre Distribution

### ⭐ **Reviews & Ratings**
- ✅ Star Rating (1-5)
- ✅ Add/Edit/Delete Reviews
- ✅ Average Rating Display
- ✅ Review Count

### 📖 **Borrow & Return**
- ✅ Borrow Books
- ✅ Return Books
- ✅ Due Date Tracking
- ✅ Active Borrows List

### ❤️ **Wishlist**
- ✅ Add to Wishlist
- ✅ Remove from Wishlist
- ✅ Wishlist Count Badge
- ✅ Check Wishlist Status

### 🎯 **Reading Challenge**
- ✅ Set Reading Goals
- ✅ Progress Tracking
- ✅ Challenge Completion
- ✅ Yearly Statistics

### 📊 **Reading History**
- ✅ Start Reading
- ✅ Update Progress (Pages)
- ✅ Finish Reading
- ✅ Reading Stats

### 📊 **Dashboard**
- ✅ Statistics Cards
- ✅ Recent Books
- ✅ Genre Distribution
- ✅ Reading Challenge
- ✅ Reading Statistics
- ✅ Quick Links

### 🎨 **UI/UX**
- ✅ Responsive Design
- ✅ Toast Notifications
- ✅ Loading Skeletons
- ✅ Active Link Highlight
- ✅ Mobile Friendly Navbar

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Description |
|------------|-------------|
| **React.js** | UI Library |
| **Vite** | Build Tool |
| **Tailwind CSS** | Styling |
| **React Router DOM** | Navigation |
| **React Icons** | Icons |
| **Axios** | HTTP Client |
| **Recharts** | Charts & Graphs |
| **React Hot Toast** | Notifications |

### **Backend**
| Technology | Description |
|------------|-------------|
| **Node.js** | Runtime |
| **Express.js** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication |
| **Bcrypt.js** | Password Hashing |
| **Nodemailer** | Email Service |
| **CORS** | Cross-Origin Resource Sharing |

### **Tools & Services**
| Service | Description |
|---------|-------------|
| **Vercel** | Frontend Hosting |
| **Render** | Backend Hosting |
| **MongoDB Atlas** | Cloud Database |
| **Git** | Version Control |
| **GitHub** | Code Repository |

---

## 📁 Folder Structure

### **Backend Structure**
```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── borrowController.js
│   │   ├── reviewController.js
│   │   ├── wishlistController.js
│   │   ├── challengeController.js
│   │   └── historyController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Borrow.js
│   │   ├── Review.js
│   │   ├── Wishlist.js
│   │   ├── ReadingChallenge.js
│   │   └── ReadingHistory.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── borrowRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── challengeRoutes.js
│   │   └── historyRoutes.js
│   ├── utils/
│   │   └── emailService.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

### **Frontend Structure**
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ProtectedRoute.js
│   │   ├── BookCard.js
│   │   ├── BookForm.js
│   │   ├── BorrowModal.js
│   │   ├── ReviewModal.js
│   │   ├── AdvancedSearchBar.js
│   │   └── ReadingChallenge.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Books.js
│   │   ├── BookDetails.js
│   │   ├── Dashboard.js
│   │   ├── Profile.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── ForgotPassword.js
│   │   ├── BorrowedBooks.js
│   │   ├── Wishlist.js
│   │   ├── ReadingHistory.js
│   │   └── About.js
│   ├── services/
│   │   └── api.js
│   ├── images/
│   │   ├── book1.jpg
│   │   ├── book2.jpg
│   │   ├── book3.jpg
│   │   └── book4.jpg
│   ├── App.js
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 API Endpoints

### **Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/forgot-password` | Send OTP |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |
| PUT | `/api/auth/change-password` | Change password |
| DELETE | `/api/auth/account` | Delete account |

### **Books**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get single book |
| POST | `/api/books` | Create book |
| PUT | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

### **Borrow**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/borrow` | Get all borrows |
| POST | `/api/borrow` | Borrow book |
| PUT | `/api/borrow/:id/return` | Return book |
| GET | `/api/borrow/active` | Get active borrows |
| GET | `/api/borrow/book/:id` | Get borrows by book |

### **Reviews**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/:bookId` | Get reviews |
| POST | `/api/reviews/:bookId` | Create review |
| PUT | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |

### **Wishlist**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishlist` | Get wishlist |
| POST | `/api/wishlist/:bookId` | Add to wishlist |
| DELETE | `/api/wishlist/:bookId` | Remove from wishlist |
| GET | `/api/wishlist/check/:bookId` | Check wishlist status |

### **Reading Challenge**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/challenge` | Get challenge |
| POST | `/api/challenge` | Create challenge |
| PUT | `/api/challenge/:id` | Update challenge |
| DELETE | `/api/challenge/:id` | Delete challenge |

### **Reading History**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/history` | Get reading history |
| POST | `/api/history` | Add to history |
| PUT | `/api/history/:id` | Update history |
| DELETE | `/api/history/:id` | Delete history |
| GET | `/api/history/stats` | Get reading stats |

### **Dashboard**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get dashboard stats |

---

## 🔧 Installation & Setup

### **Prerequisites**
- Node.js (v16+)
- MongoDB
- npm or yarn

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/book-management.git
cd book-management
```

### **2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your credentials
npm run dev
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with API URL
npm run dev
```

### **4. Environment Variables**

#### **Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmanager
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
```

#### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Deployment

### **Backend (Render)**
```powershell
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Build Command: npm install
5. Start Command: npm start
6. Add environment variables
7. Deploy
```

### **Frontend (Vercel)**
```powershell
1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy
```


---

## 🎯 Future Enhancements

- [ ] Email Notifications for due dates
- [ ] Social Login (Google, Facebook)
- [ ] PDF Export of reading history
- [ ] Mobile App (React Native)
- [ ] Dark Mode Toggle
- [ ] Book Recommendations
- [ ] Reading Statistics Charts
- [ ] Export/Import Books (CSV/JSON)
- [ ] Multi-language Support
- [ ] Push Notifications
- [ ] Book Reading Timer

---

## 📝 License

This project is **MIT licensed**.

---

## 🙏 Acknowledgments

- React.js Documentation
- Node.js Documentation
- MongoDB Documentation
- Tailwind CSS Documentation

---

## 📞 Contact

**Your Name** - [GitHub](https://github.com/shamim-01)

**Project Link:** [https://github.com/shamim-01/book-management](https://github.com/shamim-01/book-management)

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by Shamim Alam**

---

## 🎉 Recent Updates

### **Version 2.0.0** - August 2026
- ✅ Added Wishlist Feature
- ✅ Added Reading Challenge
- ✅ Added Reading History
- ✅ Added Advanced Dashboard
- ✅ Added Forgot Password with OTP
- ✅ Improved UI/UX
- ✅ Fixed All Bugs
- ✅ Production Ready

---



