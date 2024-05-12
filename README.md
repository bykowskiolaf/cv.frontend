# ChatVerse - Frontend

## Overview

This repository contains the frontend code for ChatVerse, an online messaging platform designed to enable safe interactions among users by detecting toxic messages. The frontend is developed using React, TypeScript, and Tailwind CSS to provide a responsive and user-friendly interface.

## Project and Implementation

- **Project Start Date:** 08.03.2024
- **Team Members:**
  - Olaf Bykowski (Scrum Master)
  - Rafał Majewski
  - Karol Jarosz
  - Grzegorz Dziedzic

## Features

- **Google OAuth Login:** Users can log in using their Google accounts, ensuring a secure and convenient login process.
- **Google Profile Integration:** The application integrates user profile data from Google accounts for a personalized experience.
- **Real-time Text Chat:** Users can communicate in real-time with other users through text messages.
- **Responsive Design:** Utilizes Tailwind CSS for a mobile-friendly, responsive design.
- **Toxicity Detection and Filtering:** Messages are analyzed for toxicity, with filters in place to prevent harmful interactions.

## Installation and Startup Instructions

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install` or `yarn install`.
3. Set up the environment variables for connecting to the backend server and configuring Google OAuth.
4. Start the application in development mode by running `npm start` or `yarn start`.
5. Access the application at `http://localhost:3000`.

## Building and Deployment

- **Development Build:** Run `npm run build:dev` or `yarn build:dev` for a development build.
- **Production Build:** Execute `npm run build` or `yarn build` to create a production-ready build.
- **Deployment:** Use `docker-compose up --build` to containerize the application and deploy it.

## Contributing

We encourage contributions in the form of issue reporting and pull requests. Please follow the guidelines below:

- **Reporting Issues:** Use the Issues tab to report bugs or suggest enhancements.
- **Submitting Pull Requests:** Ensure that your code adheres to the existing style and test your changes before submitting a pull request.

---
*Authors: Olaf Bykowski, Rafał Majewski, Karol Jarosz, Grzegorz Dziedzic*
