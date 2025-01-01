# Billing Management System

This project was our [team's](#team-members) graduation project from **(Full-Stack Web Development using .NET and Angular)** 4-months Intensive Code Camp in the [Information and Technology Institute](https://iti.gov.eg/home) **(ITI)**, Menofia branch.

The Billing Management System is designed to simplify and automate billing operations for organizations. Currently, it supports administrators to manage invoices and payment records with authentication powered by JWT for secure access.

**_Key Functionalities:_**

- **Authentication with JWT**: Secure login and authorization for all actions.
- **Invoice Management**: Create, track, and manage invoices, with detailed reporting capabilities for analysis.
- **Payment Tracking**: Record and monitor payments, ensuring accurate financial records.
- **Customizable Billing Options**: Configure tax rates, discounts, and payment terms.
- **Admin Dashboard**: Centralized dashboard for managing all billing processes.

[**Go To the backend repository**](https://github.com/Diab16/Bill-System-Backend)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Angular Features Used](#angular-features-used)
- [Future Improvements](#future-improvements)
- [Team](#team-members)
- [Screenshots](#screenshots)

## Features

**1. User Authentication**

- Admin logs in securely using a username and password.
- Authentication and authorization are handled using **JWT (JSON Web Tokens)** to ensure secure access.

**2. User Management**

- Add Admins: Add administrators by entering the full name, username, email, and password.
- Edit/Delete Admins: Edit or delete administrator accounts as needed.

**3. Invoice Management**

- Create Invoices: Generate invoices with details like items, quantities, prices, taxes, and discounts.
- Edit/View Invoices: Modify or review invoice details and statuses.
- Invoice Reports: Generate reports on issued invoices for analysis and record-keeping.

**4. Payment Management**

- Record Payments: Log payment transactions for specific invoices.
- Payment Status: Monitor the status of payments (e.g., pending, paid, overdue).
- Payment Reports: Analyze payment trends and outstanding amounts.

**5. Dashboard**

- Admin Dashboard: Provides insights into invoices, payments, and system activities in one view.

**6. Non-Functional Requirements**

- **Data Accuracy**: Ensures accurate data recording and reporting.
- **Performance**: Optimized for handling a large number of invoices and payment records.
- **Data Security**: Implements encryption and secure JWT-based authentication.

## Technologies Used

<img src="https://skillicons.dev/icons?i=angular,ts,bootstrap,html,css,git&perline=3" align="right" />

- **Angular V18.1.4**
- **Bootstrap 5**
- **HTML5**
- **CSS3**
- **TypeScript**
- **Git**

## Angular Features Used

- **Standalone Components:** Simplifies the architecture by removing the need for traditional Angular modules.
- **Angular Services:** Handles business logic and backend API communication.
- **Angular Routing:** Includes **lazy loading** for improved performance.
- **Angular Guards:** Ensures route security using role-based access control.
- **Angular Interceptors:** Manages API requests, attaching the JWT for secure communication.
- **TypeScript Interfaces:** Enforces strong typing for consistent front-end and back-end data structures.
- **Angular Reactive Forms:** Facilitates form creation and validation for features like invoice generation.
- **Performance Optimization:** Includes techniques like `trackBy` to reduce unnecessary re-renders.

## Future Improvements

- Adding **Employee Role** with limited access to manage invoices and payments.
- Extending **Role-Based Access Control** for additional roles.
- Real-time **Payment Notifications** for admins and future employees.
- Integration with **Accounting Software**.

## Team Members

- [Abdelrahman Diab](https://github.com/loaisaber07)
- [Abdallah Ismael](https://github.com/Abdalla82i)
- [Ahmed Sanad](https://github.com/Ahmed-Sanad24)
- [Alaa Sleem](https://github.com/Alaa-Sleem)
- [Youssef Hamada](https://github.com/YoussefHamadaYH)
