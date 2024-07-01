# Order Management System API

Welcome to the Order Management System API. This README file provides information on setting up the environment, launching the application, and accessing the API documentation.

## Table of Contents

- [Brief Overview](#brief-overview)
- [Setting Up the Environment](#setting-up-the-environment)
- [Launching the Application](#launching-the-application)
- [API Documentation](#api-documentation)

## Brief Overview

The Order Management System API is a web-based application designed to streamline the order management process for e-commerce applications. It provides functionalities such as creating new orders, updating existing orders, and retrieving order information. The API is built using Nest.js and utilizes a PostgreSQL database for data storage.

## Setting Up the Environment

To set up the environment for the Order Management System API, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/BishoySedra/Order_Management_System.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Order_Management_System
   ```

3. Rename the `.example.env` file to `.env`:

   ```bash
   mv .example.env .env
   ```

4. Open the `.env` file and update the necessary configuration values.
5. Install the dependencies:

   ```bash
   npm install
   ```

## Launching the Application

To launch the Order Management System API, use the following commands:

- Development mode:

  ```bash
  npm run start:dev
  ```

- Production mode:

  ```bash
  npm run start:prod
  ```

## API Documentation

The API documentation for the Order Management System API can be found on Postman. You can access it [here](https://documenter.getpostman.com/view/32763635/2sA3duHE5w).
