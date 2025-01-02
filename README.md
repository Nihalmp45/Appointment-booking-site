# Appointment Booking System

## Description

This project is an appointment booking system with a backend built using Express and a frontend built with React. The application allows users to book available time slots, view all bookings for a specific date, and ensure no double-booking occurs.

## Tech Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Prerequisites

To run this project locally, ensure that the following tools are installed:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for managing dependencies
- [MongoDB](https://www.mongodb.com/) or a MongoDB Atlas account for cloud database

## Setup Instructions

### Step 1: Clone the Repository

Clone the repository to your local machine:

## git clone https://github.com/Nihalmp45/Appointment-booking-site.git
## cd Appointment-booking-site

### Step 2: Install Backend Dependencies

## cd node/express
## npm install

Alternatively, if you're using yarn:

yarn install


## Step 3: Set Up MongoDB

Create a .env file inside the node/express directory with the following contents:


DB_URI=mongodb://localhost:27017/appointments  # Local MongoDB URI
Or, if you're using MongoDB Atlas, use your own connection string:

DB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/appointments?retryWrites=true&w=majority

## Step 4: Run the Backend Server
Start the backend server:

npm run dev

## Step 5: Install Frontend Dependencies
cd ../sample
npm install

## Step 6: Run the Frontend Development Server
npm start

## Optional steps
Testing the API
You can test the backend API using tools like Postman or cURL. Below are the available API endpoints:

GET /api/slots/:date: Get available slots for a specific date.
POST /api/book: Book an appointment slot (provide name, phone, date, and time in the request body).
GET /api/bookings/:date: Get all bookings for a specific date.
Contributing
If you would like to contribute to this project, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Express for building the backend.
React for the frontend UI.
MongoDB for the database.
