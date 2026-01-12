# 🍽️ Restaurant Food Delivery Application

A full-stack Progressive Web Application (PWA) for restaurant food ordering and delivery management with role-based access control for customers, admins, and delivery personnel.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)
[![Convex](https://img.shields.io/badge/Convex-Backend-orange.svg)](https://convex.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow.svg)](https://firebase.google.com/)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com)
[![Documentation](https://img.shields.io/badge/Docs-Complete-success.svg)](./DOCS-INDEX.md)

> **📚 Complete Documentation Available!** See [DOCS-INDEX.md](DOCS-INDEX.md) for all guides.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [User Roles & Workflows](#-user-roles--workflows)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 📚 Additional Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide and setup summary
- **[QUICK-DEPLOY.md](QUICK-DEPLOY.md)** - ⚡ Fast deployment guide with Convex URL setup
- **[ENV-SETUP.md](ENV-SETUP.md)** - Complete environment variables configuration
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Detailed system architecture documentation
- **[WORKFLOW.md](WORKFLOW.md)** - Complete user workflows and process flows
- **[CONVEX-BUILD-FIX.md](CONVEX-BUILD-FIX.md)** - Build error troubleshooting guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment checklist
- **[VISUAL-DIAGRAMS.md](VISUAL-DIAGRAMS.md)** - Visual architecture diagrams
- **[DOCS-INDEX.md](DOCS-INDEX.md)** - Complete documentation index

## 🎯 Overview

This is a comprehensive restaurant food delivery application that enables:
- **Customers** to browse menus, place orders, track deliveries, and manage their profiles
- **Admins** to manage menu items, orders, offers, serving hours, and view analytics
- **Delivery Personnel** to view and manage assigned deliveries

The application is built as a Progressive Web App (PWA) for optimal mobile and desktop experience.

## ✨ Features

### For Customers (Users)
- 🔐 User authentication (Login/Signup)
- 🍕 Browse categorized menu items
- 🛒 Add items to cart with portion selection (half/full)
- 📍 Multiple delivery address management
- 💳 Multiple payment options
- 📦 Real-time order tracking
- 🎟️ View and apply discount offers
- ⏰ Check restaurant serving hours
- 👤 Profile management
- 📱 PWA support for offline access

### For Administrators
- 📊 Comprehensive dashboard with analytics
- 🍽️ Menu management (CRUD operations)
- 📂 Category management
- 🎯 Order management and status updates
- 🏷️ Offers and discount code management
- ⏰ Special serving hours configuration
- 📈 Sales reports and insights
- 👥 User management
- 🖼️ Image upload via Cloudinary integration

### For Delivery Personnel
- 📋 View assigned orders
- 📍 Order pickup confirmation
- ✅ Delivery confirmation
- 🚗 Availability status toggle
- 📱 Real-time order updates

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router DOM 6** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modular CSS
- **React Calendar** - Date picker component
- **Recharts** - Data visualization

### Backend
- **Convex** - Backend-as-a-Service platform
- **TypeScript** - Type-safe backend code
- **Convex Functions** - Serverless functions

### Authentication & Storage
- **Firebase Authentication** - User authentication
- **Cloudinary** - Image hosting and management
- **Service Workers** - PWA functionality

### Development Tools
- **npm/npx** - Package management
- **ESLint** - Code linting
- **Git** - Version control

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   User UI    │  │   Admin UI   │  │ Delivery UI  │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  React Router    │
                    │  AuthContext     │
                    │  CartContext     │
                    └────────┬─────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                   Service Layer                               │
│         ┌──────────────────┼──────────────────┐              │
│         │                  │                  │              │
│  ┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼──────┐      │
│  │  Firebase   │  │     Convex      │  │ Cloudinary │      │
│  │     Auth    │  │  Provider       │  │    API     │      │
│  └─────────────┘  └────────┬────────┘  └────────────┘      │
│                             │                                │
└─────────────────────────────┼────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────┐
│                    Convex Backend                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Auth   │  │  Orders  │  │   Menu   │  │  Offers  │    │
│  │  Module  │  │  Module  │  │  Module  │  │  Module  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Delivery │  │  Reports │  │ Settings │                  │
│  │  Module  │  │  Module  │  │  Module  │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────┬────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Convex Database  │
                    │   (Real-time)     │
                    └───────────────────┘
```

### Data Flow Architecture

```
User Action → React Component → Context/State Management
    ↓
Firebase Auth (if auth required)
    ↓
Convex Client Hook (useQuery/useMutation)
    ↓
Convex Backend Function
    ↓
Database Operation (Convex DB)
    ↓
Real-time Update (via Convex Subscriptions)
    ↓
React Component Re-render
```

### Database Schema Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    users     │     │    admins    │     │   delivery   │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ firebaseUid  │     │ firebaseUid  │     │ firebaseUid  │
│ email        │     │ email        │     │ email        │
│ name         │     │ name         │     │ name         │
│ phone        │     │ phone        │     │ phone        │
│ role         │     │ role         │     │ isAvailable  │
│ address      │     │ permissions  │     │ vehicleNo    │
└──────────────┘     └──────────────┘     └──────────────┘
        │                                          │
        │                                          │
        └────────────┬─────────────────────────────┘
                     │
              ┌──────▼────────┐
              │    orders     │
              ├───────────────┤
              │ userId        │
              │ items[]       │
              │ totalAmount   │
              │ status        │
              │ deliveryAddr  │
              │ deliveryPerId │
              └───────┬───────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
   ┌─────▼────┐  ┌───▼──────┐  ┌─▼────────┐
   │menuItems │  │ offers   │  │categories│
   ├──────────┤  ├──────────┤  ├──────────┤
   │ name     │  │ title    │  │ name     │
   │ category │  │ code     │  │ isActive │
   │ price    │  │ discount │  │ order    │
   │ image    │  │ validity │  └──────────┘
   └──────────┘  └──────────┘
```

## 📁 Project Structure

```
.
├── client/                          # Frontend application
│   ├── public/
│   │   ├── manifest.json           # PWA manifest
│   │   └── service-worker.js       # Service worker for PWA
│   └── src/
│       ├── admin/                  # Admin module
│       │   ├── components/         # Admin-specific components
│       │   ├── pages/              # Admin pages
│       │   └── styles/             # Admin styles
│       ├── app/                    # Landing pages
│       │   └── pages/              # Landing and home pages
│       ├── auth/                   # Authentication
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   └── *.css
│       ├── components/             # Shared components
│       │   ├── ImageUpload.jsx
│       │   └── ProtectedRoute.jsx
│       ├── config/                 # Configuration files
│       │   └── firebase.js
│       ├── context/                # React contexts
│       │   ├── AuthContext.jsx
│       │   ├── CartContext.jsx
│       │   └── ConvexProvider.jsx
│       ├── delivery/               # Delivery module
│       │   ├── components/
│       │   ├── pages/
│       │   └── styles/
│       ├── user/                   # User module
│       │   ├── components/
│       │   ├── pages/
│       │   └── styles/
│       ├── utils/                  # Utility functions
│       │   ├── cloudinary.js
│       │   └── restaurantStatus.js
│       ├── App.jsx                 # Main app component
│       ├── main.jsx                # Entry point
│       └── styles.css              # Global styles
│
├── convex/                         # Backend (Convex)
│   ├── modules/                    # Business logic modules
│   │   ├── auth/
│   │   │   ├── admins.ts
│   │   │   └── auth.ts
│   │   ├── delivery/
│   │   │   └── delivery.ts
│   │   ├── menu/
│   │   │   └── menu.ts
│   │   ├── offers/
│   │   │   └── offers.ts
│   │   ├── orders/
│   │   │   └── orders.ts
│   │   ├── reports/
│   │   │   └── reports.ts
│   │   ├── servingHours/
│   │   │   └── servingHours.ts
│   │   ├── settings/
│   │   │   └── settings.ts
│   │   └── users/
│   │       └── users.ts
│   ├── lib/                        # Shared utilities
│   │   ├── auth.ts
│   │   └── role.ts
│   ├── schema.ts                   # Database schema
│   ├── seedCategories.ts           # Seed data
│   └── convex.json                 # Convex configuration
│
├── firebase/                       # Firebase configuration
│   ├── firebase.js
│   └── serviceAccountKey.json
│
├── package.json                    # Root package.json
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **Firebase Account** (for authentication)
- **Convex Account** (for backend)
- **Cloudinary Account** (for image hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kushalpriyaaa/KaDeep-Technologies--Assignment-.git
   cd KaDeep-Technologies--Assignment-
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Install Convex CLI globally (optional)**
   ```bash
   npm install -g convex
   ```

## ⚙️ Environment Setup

### 1. Firebase Configuration

Create `client/src/config/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 2. Convex Configuration

Initialize Convex in your project:

```bash
npx convex dev
```

This will:
- Create a new Convex project (if needed)
- Generate configuration files
- Start the development server

### 3. Cloudinary Configuration

Update `client/src/utils/cloudinary.js` with your credentials:

```javascript
export const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset';
export const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
```

### 4. Environment Variables

Create `.env` files as needed:

**Client `.env` (optional):**
```env
VITE_CONVEX_URL=your_convex_url
```

## 🏃‍♂️ Running the Application

### Development Mode

**Option 1: Run everything together**
```bash
npm run dev
```
This command runs both the client (Vite) and Convex backend concurrently.

**Option 2: Run separately**

Terminal 1 - Frontend:
```bash
npm run client
```

Terminal 2 - Backend:
```bash
npm run convex
```

### Build for Production

```bash
cd client
npm run build
```

### Preview Production Build

```bash
cd client
npm run preview
```

## 👥 User Roles & Workflows

### Customer Workflow

```
1. Landing Page
   ↓
2. Sign Up / Login (Firebase Auth)
   ↓
3. Browse Menu (Filter by categories)
   ↓
4. Add Items to Cart (Select portions)
   ↓
5. View Cart & Apply Offers
   ↓
6. Select/Add Delivery Address
   ↓
7. Choose Payment Method
   ↓
8. Place Order
   ↓
9. Track Order Status
   ↓
10. View Order History
```

### Admin Workflow

```
1. Admin Login
   ↓
2. Dashboard (View analytics)
   ↓
├─→ Manage Menu
│   ├─ Add/Edit/Delete Items
│   ├─ Upload Images
│   └─ Manage Categories
├─→ Manage Orders
│   ├─ View All Orders
│   ├─ Update Order Status
│   └─ Assign Delivery Personnel
├─→ Manage Offers
│   ├─ Create Discount Codes
│   ├─ Set Validity Periods
│   └─ Activate/Deactivate Offers
├─→ Configure Serving Hours
│   ├─ Set Breakfast/Lunch/Dinner Timings
│   ├─ Add Special Items
│   └─ Close Restaurant Temporarily
└─→ View Reports
    ├─ Sales Analytics
    ├─ Top Selling Items
    └─ Revenue Insights
```

### Delivery Personnel Workflow

```
1. Delivery Login
   ↓
2. Toggle Availability Status
   ↓
3. View Assigned Orders
   ↓
4. Accept Order
   ↓
5. Pickup Confirmation
   ↓
6. Navigate to Delivery Address
   ↓
7. Delivery Confirmation
   ↓
8. Complete Delivery
```

## 🔄 Key Workflows

### Order Processing Flow

```
Customer Places Order
    ↓
Order Status: "pending"
    ↓
Admin Reviews Order
    ↓
Order Status: "confirmed"
    ↓
Kitchen Prepares Food
    ↓
Order Status: "preparing"
    ↓
Admin Assigns Delivery Person
    ↓
Delivery Person Accepts
    ↓
Order Status: "out-for-delivery"
    ↓
Delivery Person Confirms Delivery
    ↓
Order Status: "delivered"
```

### Authentication Flow

```
User Enters Credentials
    ↓
Firebase Authentication
    ↓
Success → Get Firebase UID
    ↓
Query Convex DB (users/admins/delivery table)
    ↓
Role Identified
    ↓
Redirect to Role-Specific Dashboard
    ↓
Store Auth State in Context
```

## 📚 API Documentation

### Convex Modules

#### Auth Module (`convex/modules/auth/`)
- `createUser()` - Register new user
- `getUserByFirebaseUid()` - Get user details
- `updateUserProfile()` - Update user information

#### Menu Module (`convex/modules/menu/`)
- `getMenuItems()` - Fetch all menu items
- `getMenuItemsByCategory()` - Filter by category
- `createMenuItem()` - Add new item (admin)
- `updateMenuItem()` - Update item (admin)
- `deleteMenuItem()` - Remove item (admin)

#### Orders Module (`convex/modules/orders/`)
- `createOrder()` - Place new order
- `getOrdersByUser()` - User's order history
- `getAllOrders()` - All orders (admin)
- `updateOrderStatus()` - Change status (admin/delivery)
- `assignDeliveryPerson()` - Assign delivery (admin)

#### Offers Module (`convex/modules/offers/`)
- `getActiveOffers()` - Fetch valid offers
- `createOffer()` - Add offer (admin)
- `validateOfferCode()` - Check offer validity

#### Delivery Module (`convex/modules/delivery/`)
- `getAssignedOrders()` - Delivery person's orders
- `updateDeliveryStatus()` - Update order status
- `toggleAvailability()` - Set availability

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Menu browsing and filtering
- [ ] Cart operations (add/remove/update)
- [ ] Order placement
- [ ] Admin menu management
- [ ] Admin order management
- [ ] Delivery order assignment
- [ ] Offer code application
- [ ] PWA installation
- [ ] Offline functionality

## 🐛 Troubleshooting

### Common Issues

1. **Convex connection issues**
   - Ensure Convex dev server is running
   - Check `VITE_CONVEX_URL` environment variable

2. **Firebase authentication errors**
   - Verify Firebase configuration
   - Check Firebase console for enabled auth methods

3. **Image upload fails**
   - Verify Cloudinary credentials
   - Check upload preset settings in Cloudinary dashboard

4. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear Vite cache: `rm -rf client/node_modules/.vite`

5. **"Rollup failed to resolve import 'convex/server'" error**
   - This occurs when frontend tries to import backend code
   - **Solution:** We've configured Vite to exclude server imports
   - See [CONVEX-BUILD-FIX.md](CONVEX-BUILD-FIX.md) for detailed fix
   - Ensure `client/vite.config.js` has proper external configuration
   - Verify no direct imports from `convex/modules` in client code

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Kushal Priya**
- GitHub: [@Kushalpriyaaa](https://github.com/Kushalpriyaaa)

## 🙏 Acknowledgments

- React Team for the amazing library
- Convex for the powerful backend platform
- Firebase for authentication services
- Cloudinary for image management
- KaDeep Technologies for the opportunity

---

**Note:** This is an assignment project for KaDeep Technologies. For production deployment, ensure all security best practices are implemented and environment variables are properly configured.
