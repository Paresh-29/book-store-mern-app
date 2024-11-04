# Book Store MERN App

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for a book store.

## Project Structure


## Backend

### Setup

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
    ```env
    PORT=5000
    DB_URL=your_mongodb_connection_string
    JWT_SECRET_KEY=your_jwt_secret_key
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Endpoints

- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `POST /api/auth` - User authentication
- `GET /api/admin` - Admin statistics

## Frontend

### Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env.local` file in the `frontend` directory and add your environment variables:
    ```env
    VITE_API_KEY=your_firebase_api_key
    VITE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_PROJECT_ID=your_firebase_project_id
    VITE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_MESSAGING_SENDERID=your_firebase_messaging_sender_id
    VITE_APPID=your_firebase_app_id
    ```

4. Start the frontend development server:
    ```sh
    npm run dev
    ```

### Routes

- `/` - Home page
- `/about` - About page
- `/login` - Login page
- `/register` - Register page
- `/cart` - Cart page
- `/checkout` - Checkout page (protected)
- `/books/:id` - Single book page
- `/admin` - Admin login page
- `/dashboard` - Admin dashboard (protected)
  - `/dashboard/add-new-book` - Add new book (protected)
  - `/dashboard/edit-book/:id` - Edit book (protected)
  - `/dashboard/manage-books` - Manage books (protected)

## Deployment

The application is deployed at: https://book-store-mern-app-frontend-rk01.onrender.com/
## License

This project is licensed under the MIT License.
