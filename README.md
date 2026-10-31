# Suraksha - Women's Safety Web App

Suraksha is a full-stack web application that helps users stay connected with trusted contacts through shared communication rooms and location-based SOS alerts. Users can create private rooms, communicate in real time, and send an SOS containing their current location to room members and designated emergency contacts.

> **Important:** Suraksha is not an emergency service and does not contact police, ambulance services, or other authorities. SOS alerts rely on location permissions, internet connectivity, and email delivery services. In an emergency, contact local emergency services directly.


## Features

- User registration, authentication, profile management, and password recovery.
- Public and private rooms for communication and coordination.
- Contact management for registered users and external email contacts.
- Real-time messaging with typing indicators and location sharing.
- SOS alerts that share the user's current location with private room members and notify designated contacts via email.
- Built-in safety resources, including safety tips and emergency alarm sounds.
- Responsive interface designed for both desktop and mobile devices.

> **Privacy Notice:** Location sharing occurs only when the SOS feature is activated. The application does not continuously track users in the background.

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| Frontend state and forms | Redux Toolkit, Redux Persist, React Hook Form, Yup |
| HTTP and real-time client | Axios, Socket.IO Client |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens in HTTP-only cookies, bcrypt |
| Email | Nodemailer with Gmail SMTP for SOS alerts; Resend for password-reset emails |

## Requirements

- Node.js and npm
- MongoDB (local or hosted)
- Email credentials for the email features you want to use

## Getting started

Clone the repository, then install dependencies in each application directory:

```bash
cd backend
npm install
```

In another terminal:

```bash
cd frontend
npm install
```

---

### Configure the backend

Create `backend/.env` with the following values:

```env
PORT="YOUR_PORT"
MONGO_URI="YOUR_MONGODB_URI"
JWT_SECRET="YOUR_SECRET_KEY"
FRONTEND_URL="YOUR_FRONTEND_URL"

# Gmail SMTP sender for SOS emails
EMAIL_USER="YOUR_EMAIL"
EMAIL_PASS="YOUR_PASSWORD"

# Resend API key for password-reset emails
RESEND_API_KEY="YOUR_RESEND_API_KEY"
```

---

### Configure the frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

---

### Start the applications

Run the backend from `backend/`:

```bash
npm run dev
```

Run the frontend from `frontend/` in a second terminal:

```bash
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:5173`).

---

## Available scripts

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API server with Nodemon |
| `npm start` | Start the API server |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## SOS Email Configuration

SOS location messages are saved to the room before email notifications are sent. As a result, a saved location message does not necessarily indicate that email delivery was successful.

To enable email notifications, configure valid SMTP credentials and review the backend logs for any delivery errors. Password reset emails require a valid `RESEND_API_KEY` to be configured.
