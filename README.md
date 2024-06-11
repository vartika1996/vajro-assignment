# Task Manager Application

This Task Manager Application is built using React. It allows users to add, edit, delete, and mark tasks as completed. The application also includes features for filtering, sorting, and searching tasks to help users manage their tasks efficiently.

## Features

- **Add Task**: Users can add new tasks with a title, description, priority, and due date.
- **Delete Task**: Users can delete tasks they no longer need.
- **Mark as Completed**: Users can mark tasks as completed.
- **Filter Tasks**: Users can filter tasks based on priority, due date, and completion status.
- **Sort Tasks**: Users can sort tasks by various criteria such as due date and priority.
- **Search Tasks**: Users can search for tasks by title or description.

## External Dependencies

The application uses the following external dependencies:

- **react-datepicker**: For selecting due dates for tasks.
- **react-router**: For managing routing within the application.
- **react-router-dom**: For managing routing within the application, specifically for DOM environments.

## Installation

To run the application locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/vartika1996/vajro-assignment.git
    cd vajro-assignment
    ```

2. **Install the dependencies**:
    ```bash
    npm install
    ```
3. **Build the application**:
    ```bash
    npm build
    ```
4. **Start the application**:
    ```bash
    npm start
    ```

The application should now be running on `http://localhost:3000`.


## Code Structure

The application is structured as follows:

- **src/**: Contains the source code for the application.
  - **components/**: Contains all components , style , hooks, utils etc.
    - **common/**: Contains reusable components like buttons, popovers, etc.
    - **ui/**: Contains all main components of the application.
    - **styles/**: Contains CSS files for styling components.
    - **utils/**: Contains utility functions and data.
  - **App.js**: The main app component.
