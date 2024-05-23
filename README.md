# Book Dashboard

A React-based admin dashboard to view and manage book records. The dashboard allows for searching, sorting, pagination, and downloading book data in CSV format. It includes basic authentication to restrict access to the dashboard.

## Features

- **Search Books**: Search books by author.
- **Sorting**: Sort books by title, author name, first publish year, and ratings average in ascending or descending order.
- **Pagination**: Paginate through the book records with options to change the number of records per page.
- **Download CSV**: Download the current list of books as a CSV file.
- **Authentication**: Simple login system to access the dashboard.

## Technologies Used

- **React**: Frontend framework
- **Ant Design**: UI component library
- **Axios**: Promise-based HTTP client for making API requests
- **React CSV**: Library to facilitate CSV file downloads

## Installation

1. **Clone the repository:**
   git clone https://github.com/yourusername/book-dashboard.git
   cd book-dashboard

   
2. **Install dependencies:**
  npm install

## Usage

**Login:**
Use the following credentials to log in:
  Username: admin
  Password: password
  
**Dashboard Operations:**

  Use the search bar to find books by author.
  Click on the "Sort Options" button to sort the book list.
  Use the pagination controls at the bottom of the table to navigate through pages.
  Click on the "Download CSV" button to download the current list of books.
  
## Code Overview
  **Dashboard.js**
  This is the main component of the application which displays the book records in a table with various functionalities such as search,   
  sort, and pagination.

**Login.js**
This component handles the authentication mechanism for the dashboard.

**Dashboard.css**
Custom styles for the dashboard component.

**Login.css**
Custom styles for the login component.

## API
The book data is fetched from the Open Library API. Refer to the Open Library API documentation for more details.
