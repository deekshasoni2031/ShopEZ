# ShopEZ - Premium E-Commerce Application

![ShopEZ Banner](https://via.placeholder.com/1200x400?text=ShopEZ+-+Premium+E-Commerce)

**ShopEZ** is a modern, full-stack e-commerce platform designed with a premium, bright, and dynamic user interface. Built to deliver a seamless shopping experience, it provides robust features for both customers and administrators, including product browsing, shopping cart management, secure user authentication, and an admin dashboard.

## ✨ Features

- **Premium UI/UX:** A stunning, modern interface with a bright theme, smooth micro-animations, and responsive design.
- **User Authentication:** Secure signup, login, and robust session management using JWT.
- **Product Catalog:** Browse, search, and view detailed information for various products.
- **Shopping Cart & Checkout:** Add products to the cart, manage quantities, and proceed to a streamlined checkout process.
- **Admin Dashboard:** Comprehensive tools for administrators to manage products, view orders, and oversee store operations.
- **Responsive Design:** Fully functional and aesthetically pleasing on desktops, tablets, and mobile devices.

## 💻 Tech Stack

The application is built using the **MERN** stack, separated into a distinct client and server.

### Frontend (Client)
- **Framework:** [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first, responsive design
- **HTTP Client:** [Axios](https://axios-http.com/)

### Backend (Server)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Utilities:** `cookie-parser`, `cors`, `dotenv`, `morgan`, `express-validator`

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB running locally or a MongoDB Atlas URI
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd ShopEZ
   ```

2. **Backend Setup**
   ```bash
   cd Server
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../Client
   npm install
   ```

### Configuration

Create a `.env` file in both `Server` and `Client` directories based on the provided `.env.example` (if any), or configure the following keys:

**Server `.env`**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

**Client `.env`**
```env
VITE_API_BASE_URL=http://localhost:5000
```

*Note: In Vite, environment variables exposed to the client must be prefixed with `VITE_`.*

## 🏃‍♂️ Running the Application

### Start the Backend Server
From the root directory, open a terminal:
```bash
cd Server
npm run dev
```
The server will start at `http://localhost:5000`.

### Start the Frontend Client
Open a new terminal window/tab:
```bash
cd Client
npm run dev
```
The frontend will start at `http://localhost:5173`. 

### (Optional) Database Seeding
To quickly populate your database with dummy products/data, run the seed script from the Server folder:
```bash
cd Server
npm run seed
```

## 📂 Project Structure

```
ShopEZ/
├── Client/                 # React frontend application
│   ├── public/             # Static public assets
│   ├── src/                # React components, pages, hooks, and context
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.cjs # Tailwind configuration
│   └── vite.config.mts     # Vite configuration
│
└── Server/                 # Node.js/Express backend API
    ├── config/             # Database & app configurations
    ├── controllers/        # Route logic and handlers
    ├── middleware/         # Custom authentication and error middleware
    ├── models/             # Mongoose schemas
    ├── routes/             # API route definitions
    ├── seeds/              # Database seeding scripts
    ├── utils/              # Helper functions
    └── package.json        # Backend dependencies
```

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).
