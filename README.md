# User Portal  Documentation

This documentation provides an overview and instructions for running the project that utilizes Angular and json-server for API. It includes information on project setup, implementation details, and usage instructions.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Register User Page](#register-user-page)
3. [Login Page](#login-page)
4. [Homepage](#homepage)
5. [User Profile](#user-profile)
6. [Validations](#validations)

## 1. Project Setup<a name="project-setup"></a>

To run the project, follow these steps:

1. Clone the project repository from GitHub.
2. Navigate to the project directory.
3. Install the project dependencies by running the following command:
   ```
   npm install
   ```
4. Start the JSON server to simulate the API by running the following command:
   ```
   npm run json-server
   ```
5. Open a new terminal window and start the Angular development server by running the following command:
   ```
   ng serve
   ```
6. Open your web browser and access the project at `http://localhost:4200`.

## 2. Register User Page<a name="register-user-page"></a>

The Register User page allows users to create a new account. It includes the following fields:

- First Name (Textbox - required)
- Last Name (Textbox - required)
- Middle Name (Textbox - optional)
- Gender (Radio button)
- Education (Dropdown)
  - Primary
  - Secondary
  - Higher
  - Graduate
  - Post Graduate
- Email (Textbox - required)
- Password (Password field - required)

## 3. Login Page<a name="login-page"></a>

The Login page enables users to authenticate themselves using their email and password. Upon submitting the login form, an AJAX call is made to the server to validate the provided email and password. If the credentials are correct, the user's details are stored in the session, and they are redirected to the homepage. Otherwise, an error message indicating invalid email/password is displayed on the login page.

## 4. Homepage<a name="homepage"></a>

The Homepage displays a grid/table of all available users. Each row in the grid/table represents a user and includes their information. The following actions are available in the grid/table:

- Edit: Clicking the Edit link opens a user form pre-filled with the selected user's information. Upon saving the changes, the user's details are updated.
- Delete: Clicking the Delete link prompts for confirmation with the message "Are you sure?". If the user confirms the deletion, the user is removed from the system; otherwise, the prompt is dismissed.
- Search: A search box is provided at the top of the grid/table to search for records based on any related match.
- Logout: The Logout button, located in the top-right corner of the navigation bar, clears the user's session and redirects them to the login page.
- Profile: The Profile button, also located in the top-right corner of the navigation bar, links to a blank user profile view (page).

## 5. User Profile<a name="user-profile"></a>

The User Profile page displays additional user details in a separate table with a one-to-one relationship. The following field is included:

- Address (Text area - required)
- Mobile No (Textbox - required)
- Profile Photo (File upload)

## 6. Validations<a name="validations"></a>

The project includes the following validations:

### User Model (Registration Form)
- All fields are required.
- Validation rules for each field should be implemented as per the specified requirements.

### User Login Page
- Email and password fields must not be blank.
- The email field