
# Invoice Application

Invoice application for invoice tracking to keep track of the invoices raised and the corresponding amount.

## Requirements

- Node v12.16.3 
- npm v6.14.5

## Setup

1. Clone this repository.
2. Install Node JS `https://nodejs.org/en/.`
3. Install dependency using npm install.
4. run `npm run server` to start the development server using nodemon.
5. run `npm start` to start the development server.
6. run `npm test` to run test.
7. Open http://localhost:5000.

## Description
- New user can sign up and create an account.
- Existing user can login and logout from their corresponding account.
- Registered users can create/update/delete invoices.
- Updation/Deletion of invoice is restricted only to the created user.
- Admin can view the list of all invoices in a tabular view.
- Admin can filter the invoices by selecting a date range.
- Users can view the list of their own invoices in a tabular view.
- Users can filter the invoices by selecting a date range.
- Admin can view the list of all invoices in a bar chart view with date on x-axis and number of invoices on y-axis.
- Users can view the list of their own invoices in a bar chart view with date on x-axis and number of invoices on y-axis.
- Admin can view the list of all invoices in a bar chart view with users on x-axis and number of invoices on y-axis.
