# 🔄 Application Workflows Documentation

## Table of Contents
- [Customer Workflows](#customer-workflows)
- [Admin Workflows](#admin-workflows)
- [Delivery Personnel Workflows](#delivery-personnel-workflows)
- [System Workflows](#system-workflows)
- [Error Handling Workflows](#error-handling-workflows)

---

## Customer Workflows

### 1. User Registration Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              User Registration Process                       │
└─────────────────────────────────────────────────────────────┘

START: User clicks "Sign Up"
    ↓
User fills registration form:
  • Email
  • Password
  • Name
  • Phone Number
    ↓
Form Validation
    ↓
┌─────────────────────┐
│  Valid? [Decision]  │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Return to form
    ↓
Firebase Authentication API Call
  • createUserWithEmailAndPassword()
    ↓
┌─────────────────────┐
│  Success? [Decision]│
└─────────────────────┘
    ↓           ↓
   YES         NO → Display Firebase error → Return to form
    ↓
Receive Firebase UID
    ↓
Create User in Convex Database
  • Store: firebaseUid, email, name, phone
  • Set role: "user"
  • Timestamp: createdAt, updatedAt
    ↓
Store Auth State in AuthContext
    ↓
Redirect to User Dashboard
    ↓
END: User successfully registered
```

**Key Functions:**
- `client/src/auth/Signup.jsx` - UI Component
- `convex/modules/auth/auth.ts` - User creation logic
- Firebase `createUserWithEmailAndPassword()`

---

### 2. User Login Workflow

```
┌─────────────────────────────────────────────────────────────┐
│               User Login Process                             │
└─────────────────────────────────────────────────────────────┘

START: User clicks "Login"
    ↓
User enters credentials:
  • Email
  • Password
    ↓
Firebase Authentication
  • signInWithEmailAndPassword()
    ↓
┌─────────────────────┐
│  Valid? [Decision]  │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Return to login
    ↓
Receive Firebase User Object
  • Extract UID
    ↓
Query Convex DB by firebaseUid
  • Check users table
  • Check admins table
  • Check delivery table
    ↓
┌─────────────────────┐
│User Found? [Decision]│
└─────────────────────┘
    ↓           ↓
   YES         NO → Create user entry → Assign default role
    ↓
Identify User Role:
  • user
  • admin
  • delivery
    ↓
Store in AuthContext:
  • userId
  • userEmail
  • userRole
  • firebaseUid
    ↓
Conditional Redirect:
  • user → /user/home
  • admin → /admin/dashboard
  • delivery → /delivery/orders
    ↓
END: User logged in successfully
```

**Key Functions:**
- `client/src/auth/Login.jsx` - UI Component
- `convex/modules/auth/auth.ts` - Role identification
- Firebase `signInWithEmailAndPassword()`

---

### 3. Browse & Order Workflow

```
┌─────────────────────────────────────────────────────────────┐
│            Browse Menu & Place Order Flow                    │
└─────────────────────────────────────────────────────────────┘

START: User navigates to Menu
    ↓
Fetch Menu Items from Convex
  • Query: getMenuItems()
  • Filter: isAvailable = true
    ↓
Display Categories
  • Fetch from categories table
  • Show category filters
    ↓
User selects category (optional)
    ↓
Display Filtered Menu Items
  • Show: name, image, price, description
  • Option: Half/Full portion
    ↓
User clicks "Add to Cart"
    ↓
Select Portion [Decision]
  • Half Portion
  • Full Portion
    ↓
Add to Cart Context
  • item: {id, name, price, portion, quantity}
  • Update cart state
    ↓
Display Cart Badge (item count)
    ↓
User continues browsing OR User clicks "View Cart"
    ↓
═══════════════════════════════════════════════════════════════
                    Cart Review Stage
═══════════════════════════════════════════════════════════════
    ↓
Display Cart Items:
  • Item name, portion, price
  • Quantity controls (+/-)
  • Remove item option
    ↓
User modifies cart (optional):
  • Update quantities
  • Remove items
    ↓
Calculate Totals:
  • Subtotal
  • Delivery Charge
  • Discount (if offer applied)
  • Total Amount
    ↓
User clicks "Apply Offer Code" (optional)
    ↓
Validate Offer Code:
  • Check validity period
  • Check minimum order amount
  • Calculate discount
    ↓
┌─────────────────────┐
│  Valid? [Decision]  │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Continue without offer
    ↓
Apply Discount to Total
    ↓
═══════════════════════════════════════════════════════════════
                 Checkout Stage
═══════════════════════════════════════════════════════════════
    ↓
User clicks "Proceed to Checkout"
    ↓
Show Address Selection Modal
    ↓
┌─────────────────────┐
│Saved Address? [Dec.]│
└─────────────────────┘
    ↓           ↓
   YES         NO → Add new address
    ↓
Select/Enter Delivery Address
    ↓
Show Payment Method Selection
  • Cash on Delivery
  • Card Payment
  • UPI
    ↓
User selects payment method
    ↓
User clicks "Place Order"
    ↓
Validate Order:
  • Check restaurant status
  • Verify item availability
  • Validate address
    ↓
Create Order in Convex:
  • userId
  • items[]
  • totalAmount
  • deliveryAddress
  • paymentMethod
  • status: "pending"
  • timestamp
    ↓
┌─────────────────────┐
│ Success? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Return to cart
    ↓
Clear Cart Context
    ↓
Show Order Confirmation
  • Order ID
  • Estimated delivery time
    ↓
Redirect to Orders Page
    ↓
END: Order placed successfully
```

**Key Components:**
- `client/src/user/pages/UserMenu.jsx` - Menu display
- `client/src/user/pages/Cart.jsx` - Cart management
- `client/src/context/CartContext.jsx` - State management
- `convex/modules/orders/orders.ts` - Order creation

---

### 4. Order Tracking Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              Order Tracking Flow                             │
└─────────────────────────────────────────────────────────────┘

START: User navigates to Orders page
    ↓
Fetch User Orders:
  • Query: getOrdersByUser(userId)
  • Real-time subscription active
    ↓
Display Orders List:
  • Order ID
  • Items summary
  • Total amount
  • Current status
  • Order date
    ↓
User clicks on an order
    ↓
Display Order Details:
  • Full item list
  • Delivery address
  • Payment method
  • Status timeline
    ↓
Real-time Status Updates:
    ↓
┌─────────────────────────────────────────────────────────────┐
│                  Order Status Progression                    │
│                                                              │
│  pending → confirmed → preparing → out-for-delivery          │
│                                  → delivered / cancelled     │
└─────────────────────────────────────────────────────────────┘
    ↓
Status Change Detected (Convex subscription)
    ↓
Update UI automatically
    ↓
Show notification (optional)
    ↓
Order Status = "delivered"
    ↓
Enable "Rate Order" button
    ↓
END: Order tracking complete
```

**Key Components:**
- `client/src/user/pages/Orders.jsx` - Order history
- `convex/modules/orders/orders.ts` - Order queries

---

## Admin Workflows

### 1. Menu Management Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              Admin Menu Management Flow                      │
└─────────────────────────────────────────────────────────────┘

START: Admin navigates to Menu Management
    ↓
Fetch All Menu Items:
  • Query: getMenuItems()
  • Include inactive items
    ↓
Display Menu Items Table:
  • Name, Category, Price, Status
  • Actions: Edit, Delete, Toggle
    ↓
═══════════════════════════════════════════════════════════════
              Action: Add New Item
═══════════════════════════════════════════════════════════════
    ↓
Admin clicks "Add Item"
    ↓
Show Item Form:
  • Name (text)
  • Description (textarea)
  • Category (dropdown)
  • Image (file upload)
  • Has Half Portion? (checkbox)
  • Half Price (number, conditional)
  • Full Price (number, required)
  • Is Available? (toggle)
    ↓
Admin fills form
    ↓
Upload Image to Cloudinary:
  • POST to Cloudinary API
  • Receive image URL
    ↓
┌─────────────────────┐
│ Success? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Retry upload
    ↓
Validate Form Data
    ↓
Create Menu Item:
  • Call: createMenuItem(data)
  • Convex mutation
    ↓
┌─────────────────────┐
│ Success? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Return to form
    ↓
Show success message
    ↓
Refresh menu list (auto via subscription)
    ↓
═══════════════════════════════════════════════════════════════
              Action: Edit Item
═══════════════════════════════════════════════════════════════
    ↓
Admin clicks "Edit" on item
    ↓
Load item data into form
    ↓
Admin modifies fields
    ↓
Admin clicks "Save Changes"
    ↓
Upload new image (if changed)
    ↓
Update Menu Item:
  • Call: updateMenuItem(id, data)
  • Convex mutation
    ↓
Show success message
    ↓
Refresh menu list
    ↓
═══════════════════════════════════════════════════════════════
              Action: Delete Item
═══════════════════════════════════════════════════════════════
    ↓
Admin clicks "Delete" on item
    ↓
Show confirmation dialog
    ↓
┌─────────────────────┐
│ Confirm? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Cancel action
    ↓
Delete Menu Item:
  • Call: deleteMenuItem(id)
  • Convex mutation
    ↓
Show success message
    ↓
Refresh menu list
    ↓
END: Menu management action complete
```

**Key Components:**
- `client/src/admin/pages/Menu.jsx` - Menu management UI
- `client/src/components/ImageUpload.jsx` - Image upload
- `convex/modules/menu/menu.ts` - CRUD operations

---

### 2. Order Management Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              Admin Order Management Flow                     │
└─────────────────────────────────────────────────────────────┘

START: Admin navigates to Orders
    ↓
Fetch All Orders:
  • Query: getAllOrders()
  • Sort by: createdAt (desc)
  • Real-time subscription active
    ↓
Display Orders Dashboard:
  • Filter by status
  • Search by order ID
  • Pagination
    ↓
Show Order Cards:
  • Order ID
  • Customer details
  • Items summary
  • Total amount
  • Current status
  • Order time
    ↓
═══════════════════════════════════════════════════════════════
              Action: View Order Details
═══════════════════════════════════════════════════════════════
    ↓
Admin clicks on order
    ↓
Display Full Order Details:
  • Customer information
  • Delivery address
  • Complete item list
  • Payment method
  • Status history
  • Assigned delivery person (if any)
    ↓
═══════════════════════════════════════════════════════════════
              Action: Update Order Status
═══════════════════════════════════════════════════════════════
    ↓
Admin changes status dropdown
    ↓
Available Status Transitions:
  • pending → confirmed / cancelled
  • confirmed → preparing
  • preparing → out-for-delivery
  • out-for-delivery → delivered
    ↓
Admin clicks "Update Status"
    ↓
Validate Status Transition
    ↓
┌─────────────────────┐
│  Valid? [Decision]  │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Return
    ↓
Update Order:
  • Call: updateOrderStatus(orderId, newStatus)
  • Convex mutation
  • Update timestamp
    ↓
┌─────────────────────────────────────┐
│ Status = "out-for-delivery"? [Dec.] │
└─────────────────────────────────────┘
    ↓           ↓
   YES         NO → Skip delivery assignment
    ↓
Show Delivery Person Assignment:
  • Fetch available delivery personnel
  • Display list with availability status
    ↓
Admin selects delivery person
    ↓
Assign to Order:
  • Call: assignDeliveryPerson(orderId, deliveryId)
  • Update order.deliveryPersonId
  • Update delivery.currentOrders[]
    ↓
Notification sent to delivery person
    ↓
Show success message
    ↓
Real-time update across all clients
    ↓
═══════════════════════════════════════════════════════════════
              Action: Cancel Order
═══════════════════════════════════════════════════════════════
    ↓
Admin clicks "Cancel Order"
    ↓
Show cancellation reason dialog
    ↓
Admin enters reason
    ↓
Confirm cancellation
    ↓
Update Order Status:
  • status: "cancelled"
  • Add cancellation reason
  • Update timestamp
    ↓
Send notification to customer
    ↓
Show success message
    ↓
END: Order management action complete
```

**Key Components:**
- `client/src/admin/pages/Orders.jsx` - Order management UI
- `convex/modules/orders/orders.ts` - Order operations

---

### 3. Offers Management Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              Admin Offers Management Flow                    │
└─────────────────────────────────────────────────────────────┘

START: Admin navigates to Offers
    ↓
Fetch All Offers:
  • Query: getAllOffers()
  • Include expired offers
    ↓
Display Offers List:
  • Title
  • Code
  • Discount
  • Validity period
  • Status (Active/Inactive)
    ↓
═══════════════════════════════════════════════════════════════
              Action: Create New Offer
═══════════════════════════════════════════════════════════════
    ↓
Admin clicks "Create Offer"
    ↓
Show Offer Form:
  • Title (text)
  • Description (textarea)
  • Offer Code (text, unique)
  • Discount Type (radio):
    - Percentage
    - Fixed Amount
  • Discount Value (number)
  • Minimum Order Amount (number, optional)
  • Maximum Discount (number, optional)
  • Valid From (date-time)
  • Valid To (date-time)
  • Is Active (toggle)
    ↓
Admin fills form
    ↓
Validate Offer Code:
  • Check uniqueness
  • Verify format
    ↓
┌─────────────────────┐
│ Unique? [Decision]  │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Return to form
    ↓
Validate Date Range:
  • validFrom < validTo
  • validTo > current date
    ↓
┌─────────────────────┐
│  Valid? [Decision]  │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Return to form
    ↓
Create Offer:
  • Call: createOffer(data)
  • Convex mutation
    ↓
Show success message
    ↓
Refresh offers list
    ↓
═══════════════════════════════════════════════════════════════
              Action: Edit Offer
═══════════════════════════════════════════════════════════════
    ↓
Admin clicks "Edit" on offer
    ↓
Load offer data into form
    ↓
Admin modifies fields
    ↓
Admin clicks "Save Changes"
    ↓
Validate changes
    ↓
Update Offer:
  • Call: updateOffer(id, data)
  • Convex mutation
    ↓
Show success message
    ↓
Refresh offers list
    ↓
═══════════════════════════════════════════════════════════════
              Action: Toggle Offer Status
═══════════════════════════════════════════════════════════════
    ↓
Admin toggles Active/Inactive switch
    ↓
Update Offer:
  • Call: updateOffer(id, {isActive: !current})
  • Convex mutation
    ↓
Real-time update in user app
    ↓
END: Offer management action complete
```

**Key Components:**
- `client/src/admin/pages/Offers.jsx` - Offers management UI
- `convex/modules/offers/offers.ts` - Offer operations

---

### 4. Reports & Analytics Workflow

```
┌─────────────────────────────────────────────────────────────┐
│            Admin Reports & Analytics Flow                    │
└─────────────────────────────────────────────────────────────┘

START: Admin navigates to Reports
    ↓
Show Date Range Selector:
  • Default: Last 30 days
  • Options: Today, Week, Month, Custom
    ↓
Admin selects date range
    ↓
Fetch Reports Data:
  • Query: getReports(startDate, endDate)
  • Fetch orders for period
  • Calculate metrics
    ↓
Display Overview Cards:
┌────────────────────────────────────────────────────────────┐
│  Total Orders  │  Total Revenue  │  Avg Order Value      │
│      150       │    ₹15,000     │      ₹100             │
└────────────────────────────────────────────────────────────┘
    ↓
Display Charts:
  • Revenue Trend (Line Chart)
  • Orders by Status (Pie Chart)
  • Top Selling Items (Bar Chart)
  • Orders by Time of Day (Area Chart)
    ↓
Display Tables:
  • Top Selling Items
    - Item name
    - Quantity sold
    - Revenue generated
  • Recent Orders
  • Customer Statistics
    ↓
═══════════════════════════════════════════════════════════════
              Action: Export Report
═══════════════════════════════════════════════════════════════
    ↓
Admin clicks "Export Report"
    ↓
Select Export Format:
  • PDF
  • CSV
  • Excel
    ↓
Generate Report File:
  • Compile data
  • Format output
    ↓
Download Report
    ↓
END: Reports viewed/exported successfully
```

**Key Components:**
- `client/src/admin/pages/Reports.jsx` - Reports UI
- `convex/modules/reports/reports.ts` - Analytics logic
- `recharts` library for visualizations

---

## Delivery Personnel Workflows

### 1. View Assigned Orders Workflow

```
┌─────────────────────────────────────────────────────────────┐
│           Delivery Personnel Order View Flow                 │
└─────────────────────────────────────────────────────────────┘

START: Delivery person logs in
    ↓
Redirect to Assigned Orders page
    ↓
Fetch Assigned Orders:
  • Query: getOrdersByDeliveryPerson(deliveryId)
  • Filter: status IN ["out-for-delivery", "preparing"]
  • Real-time subscription active
    ↓
Display Orders List:
  • Order ID
  • Customer name
  • Delivery address
  • Items summary
  • Distance (if available)
  • Order time
    ↓
Show Availability Toggle:
  • Current status: Available / Unavailable
    ↓
┌─────────────────────────────────────────────────────────────┐
│          Action: Toggle Availability                         │
└─────────────────────────────────────────────────────────────┘
    ↓
Delivery person toggles switch
    ↓
Update Delivery Status:
  • Call: updateDeliveryAvailability(deliveryId, status)
  • Convex mutation
    ↓
┌─────────────────────┐
│Available? [Decision]│
└─────────────────────┘
    ↓           ↓
   YES         NO
    ↓           ↓
Can receive   Cannot receive
new orders    new orders
    ↓
END: Status updated
```

**Key Components:**
- `client/src/delivery/pages/AssignedOrders.jsx`
- `convex/modules/delivery/delivery.ts`

---

### 2. Order Pickup Workflow

```
┌─────────────────────────────────────────────────────────────┐
│              Order Pickup Confirmation Flow                  │
└─────────────────────────────────────────────────────────────┘

START: Delivery person arrives at restaurant
    ↓
Open assigned order
    ↓
Display Order Details:
  • Order ID
  • Items list
  • Customer details
  • Delivery address
  • Special instructions
    ↓
Verify Order Items:
  • Check items against list
  • Confirm packaging
    ↓
Delivery person clicks "Confirm Pickup"
    ↓
Show Confirmation Dialog:
  • "Have you received all items?"
  • Checkbox: "Order is complete"
    ↓
┌─────────────────────┐
│ Confirm? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Return to order details
    ↓
Update Order Status:
  • Call: updateOrderStatus(orderId, "out-for-delivery")
  • Update: pickupTime = current timestamp
  • Convex mutation
    ↓
Show Map/Navigation:
  • Customer address
  • Estimated time
  • Navigation button (Google Maps integration)
    ↓
Real-time notification to customer:
  • "Your order is on the way!"
    ↓
END: Pickup confirmed, en route to customer
```

**Key Components:**
- `client/src/delivery/pages/Pickup.jsx`
- `convex/modules/orders/orders.ts`

---

### 3. Delivery Confirmation Workflow

```
┌─────────────────────────────────────────────────────────────┐
│             Delivery Completion Flow                         │
└─────────────────────────────────────────────────────────────┘

START: Delivery person arrives at customer location
    ↓
Display Delivery Confirmation Screen:
  • Customer name
  • Delivery address
  • Order total
  • Payment method
    ↓
═══════════════════════════════════════════════════════════════
       Payment Method: Cash on Delivery
═══════════════════════════════════════════════════════════════
    ↓
Show Cash Collection:
  • Amount to collect
  • Input: Amount received
  • Calculate: Change to return
    ↓
Delivery person enters amount
    ↓
Verify Amount:
    ↓
┌─────────────────────┐
│ Correct? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Re-enter amount
    ↓
═══════════════════════════════════════════════════════════════
       Common Flow (All Payment Methods)
═══════════════════════════════════════════════════════════════
    ↓
Delivery person clicks "Confirm Delivery"
    ↓
Show Confirmation Options:
  • "Order delivered successfully?"
  • Optional: Customer signature
  • Optional: Photo proof
    ↓
┌─────────────────────┐
│ Confirm? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Mark issue → Contact admin
    ↓
Update Order Status:
  • Call: updateOrderStatus(orderId, "delivered")
  • Update: deliveryTime = current timestamp
  • Update: paymentCollected (if COD)
  • Convex mutation
    ↓
Remove from Delivery Person's Active Orders:
  • Update: delivery.currentOrders[]
    ↓
Show Success Screen:
  • "Delivery completed!"
  • Next order button
    ↓
Real-time notification to customer:
  • "Your order has been delivered!"
    ↓
Real-time notification to admin:
  • Order completion update
    ↓
END: Delivery completed successfully
```

**Key Components:**
- `client/src/delivery/pages/DeliveryConfirm.jsx`
- `convex/modules/orders/orders.ts`
- `convex/modules/delivery/delivery.ts`

---

## System Workflows

### 1. Real-time Data Synchronization

```
┌─────────────────────────────────────────────────────────────┐
│           Convex Real-time Subscription Flow                 │
└─────────────────────────────────────────────────────────────┘

Component Mounts
    ↓
useQuery Hook Initialization
    ↓
Convex Client Opens WebSocket Connection
    ↓
Subscribe to Database Query:
  • Example: getMenuItems()
    ↓
Convex Server Executes Query
    ↓
Return Initial Results
    ↓
Component Renders with Data
    ↓
═══════════════════════════════════════════════════════════════
           Data Change Detected
═══════════════════════════════════════════════════════════════
    ↓
Database Mutation Occurs:
  • Example: Admin updates menu item
    ↓
Convex Detects Affected Queries
    ↓
Re-execute Subscribed Query
    ↓
Compare Results
    ↓
┌─────────────────────┐
│ Changed? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → No action
    ↓
Push Update via WebSocket
    ↓
Client Receives New Data
    ↓
React Re-renders Component
    ↓
UI Updates Automatically
    ↓
═══════════════════════════════════════════════════════════════
           Connection Lost
═══════════════════════════════════════════════════════════════
    ↓
Convex Client Detects Disconnection
    ↓
Show "Offline" Indicator (optional)
    ↓
Automatic Reconnection Attempts
    ↓
┌─────────────────────┐
│Reconnected? [Dec.]  │
└─────────────────────┘
    ↓           ↓
   YES         NO → Keep retrying
    ↓
Re-subscribe to All Queries
    ↓
Fetch Latest Data
    ↓
Update UI
    ↓
Hide "Offline" Indicator
    ↓
END: Real-time sync restored
```

---

### 2. Authentication State Management

```
┌─────────────────────────────────────────────────────────────┐
│         Authentication State Persistence Flow                │
└─────────────────────────────────────────────────────────────┘

App Initialization
    ↓
Load AuthContext Provider
    ↓
Check Firebase Auth State:
  • onAuthStateChanged() listener
    ↓
┌─────────────────────┐
│User Logged In? [Dec]│
└─────────────────────┘
    ↓           ↓
   YES         NO → Redirect to login
    ↓
Get Firebase User Object
    ↓
Extract Firebase UID
    ↓
Query Convex for User Data:
  • getUserByFirebaseUid(uid)
    ↓
┌─────────────────────┐
│User Found? [Decision]│
└─────────────────────┘
    ↓           ↓
   YES         NO → Create user entry
    ↓
Load User Role
    ↓
Set AuthContext State:
  • currentUser
  • userRole
  • isAuthenticated: true
    ↓
Enable Protected Routes
    ↓
Redirect to Role Dashboard
    ↓
═══════════════════════════════════════════════════════════════
           Session Expiry
═══════════════════════════════════════════════════════════════
    ↓
Firebase Token Expires
    ↓
Firebase Auto-refresh Token
    ↓
┌─────────────────────┐
│ Success? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Force logout
    ↓
Continue Session
    ↓
═══════════════════════════════════════════════════════════════
           User Logout
═══════════════════════════════════════════════════════════════
    ↓
User clicks "Logout"
    ↓
Firebase Sign Out
    ↓
Clear AuthContext State
    ↓
Clear Local Storage (if any)
    ↓
Redirect to Landing Page
    ↓
END: User logged out
```

---

### 3. Image Upload Workflow

```
┌─────────────────────────────────────────────────────────────┐
│            Cloudinary Image Upload Flow                      │
└─────────────────────────────────────────────────────────────┘

START: User selects image
    ↓
File Input onChange Event
    ↓
Validate File:
  • Type: image/jpeg, image/png, image/webp
  • Size: < 5MB
    ↓
┌─────────────────────┐
│  Valid? [Decision]  │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Return to selection
    ↓
Show Preview:
  • Display selected image
  • Show upload button
    ↓
User clicks "Upload"
    ↓
Show Loading Spinner
    ↓
Create FormData:
  • file: selectedFile
  • upload_preset: CLOUDINARY_UPLOAD_PRESET
  • cloud_name: CLOUDINARY_CLOUD_NAME
    ↓
POST Request to Cloudinary API:
  • URL: https://api.cloudinary.com/v1_1/{cloud}/image/upload
    ↓
┌─────────────────────┐
│ Success? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Display error → Retry option
    ↓
Receive Response:
  • secure_url (HTTPS image URL)
  • public_id
    ↓
Store Image URL
    ↓
Display Uploaded Image
    ↓
Hide Loading Spinner
    ↓
Return URL to Parent Component
    ↓
END: Image uploaded successfully
```

**Key Components:**
- `client/src/components/ImageUpload.jsx`
- `client/src/utils/cloudinary.js`

---

## Error Handling Workflows

### 1. Network Error Handling

```
┌─────────────────────────────────────────────────────────────┐
│             Network Error Recovery Flow                      │
└─────────────────────────────────────────────────────────────┘

API Request Initiated
    ↓
Network Request Sent
    ↓
┌─────────────────────┐
│ Success? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO
    ↓           ↓
Return Data   Catch Error
    ↓           ↓
             Identify Error Type:
               ↓
          ┌────┴────┐
          │         │
    Network Error  Server Error
          │         │
          ↓         ↓
    Display:    Display:
    "No internet  "Server error"
    connection"   "Try again"
          │         │
          ↓         ↓
    Show Retry   Show Retry
    Button       Button
          │         │
          └────┬────┘
               ↓
    User clicks Retry
               ↓
    Retry Request
               ↓
         Go to Start
```

---

### 2. Validation Error Handling

```
┌─────────────────────────────────────────────────────────────┐
│              Form Validation Flow                            │
└─────────────────────────────────────────────────────────────┘

User Submits Form
    ↓
Validate Each Field:
    ↓
┌─────────────────────────────────────────────────────────────┐
│  Field: Email                                                │
│  • Not empty?                                               │
│  • Valid email format?                                      │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────┐
│  Field: Phone                                                │
│  • Not empty?                                               │
│  • Numeric?                                                 │
│  • Length = 10?                                             │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────┐
│  Field: Price                                                │
│  • Not empty?                                               │
│  • Numeric?                                                 │
│  • Greater than 0?                                          │
└─────────────────────────────────────────────────────────────┘
    ↓
Collect All Errors
    ↓
┌─────────────────────┐
│Any Errors? [Decision]│
└─────────────────────┘
    ↓           ↓
   YES         NO → Proceed with submission
    ↓
Display Error Messages:
  • Inline field errors
  • Summary at top
    ↓
Focus First Error Field
    ↓
Prevent Form Submission
    ↓
END: User corrects errors
```

---

### 3. Authorization Error Handling

```
┌─────────────────────────────────────────────────────────────┐
│           Protected Route Access Flow                        │
└─────────────────────────────────────────────────────────────┘

User Navigates to Protected Route
    ↓
ProtectedRoute Component Intercepts
    ↓
Check Authentication:
    ↓
┌─────────────────────┐
│Authenticated? [Dec.]│
└─────────────────────┘
    ↓           ↓
   YES         NO → Redirect to Login
    ↓           ↓
Check Role      Store intended route
    ↓           ↓
┌─────────────────────┐
│Authorized? [Decision]│
└─────────────────────┘
    ↓           ↓
   YES         NO
    ↓           ↓
Allow Access  Show "Unauthorized" Message
    ↓           ↓
Render Route  Redirect to Dashboard
    ↓
END: Route accessed securely
```

**Key Components:**
- `client/src/components/ProtectedRoute.jsx`
- `client/src/context/AuthContext.jsx`

---

## Progressive Web App (PWA) Workflow

### Service Worker Registration

```
┌─────────────────────────────────────────────────────────────┐
│              PWA Service Worker Flow                         │
└─────────────────────────────────────────────────────────────┘

App Loads
    ↓
Check Service Worker Support
    ↓
┌─────────────────────┐
│Supported? [Decision]│
└─────────────────────┘
    ↓           ↓
   YES         NO → Continue without PWA
    ↓
Register Service Worker:
  • /service-worker.js
    ↓
┌─────────────────────┐
│ Success? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Log error
    ↓
Service Worker Installed
    ↓
Cache Static Assets:
  • HTML, CSS, JS files
  • Images
  • Fonts
    ↓
═══════════════════════════════════════════════════════════════
           Offline Access
═══════════════════════════════════════════════════════════════
    ↓
User Goes Offline
    ↓
Request Intercepted by Service Worker
    ↓
Check Cache:
    ↓
┌─────────────────────┐
│In Cache? [Decision] │
└─────────────────────┘
    ↓           ↓
   YES         NO → Show offline page
    ↓
Serve from Cache
    ↓
═══════════════════════════════════════════════════════════════
           App Installation
═══════════════════════════════════════════════════════════════
    ↓
Browser Shows "Install App" Prompt
    ↓
User Clicks "Install"
    ↓
App Installed to Home Screen
    ↓
Launch as Standalone App
    ↓
END: PWA fully functional
```

**Key Files:**
- `client/public/manifest.json` - PWA manifest
- `client/public/service-worker.js` - Service worker logic

---

This comprehensive workflow documentation covers all major user interactions and system processes in the Restaurant Food Delivery Application.
