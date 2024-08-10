# Product Scanner App - Frontend

Welcome to the GetAI Mobile App! This mobile application allows users to easily find detailed information about products by scanning their barcodes. The app is designed to help users access and verify product details efficiently, making it an essential tool for informed purchasing decisions.

## Structure

#The repository is structured as follows:

- **src/**: Contains the source code of the frontend, including all React Native components, screens, and utilities.
  - **components/**: Reusable components like buttons, headers, and other UI elements.
  - **screens/**: All the main screens of the app, such as the login, signup, scanning, and product detail screens.
  - **services/**: Contains API service files for handling communication with the backend.
  - **context/**: Manages global state and provides context to various components.
  - **utils/**: Utility functions and helpers that are used across different parts of the application.
  - **assets/**: Images, icons, and other static resources.
  - **navigation/**: Configurations and setups for the app's navigation (e.g., stack and tab navigators).

- **App.js**: The entry point of the application, where navigation and the main app structure are initialized.

- **package.json**: Lists the dependencies and scripts used in the project.

## How Generative AI Models are Solving the Problem

In the Product Scanner App, Generative AI models play a crucial role in enhancing user interaction and improving product information accuracy. When a product barcode is scanned or uploaded, the app queries our database to retrieve relevant details. If the product is not found in the database, external APIs are queried to gather more information.

The data retrieved is then used to train Large Language Models (LLMs), which are integrated into the app to provide users with the ability to chat with a bot for more detailed inquiries about the product. This AI-driven interaction allows users to ask specific questions, get explanations, and obtain deeper insights into the products they are interested in, making the app more than just a simple barcode scanner but a comprehensive product information tool.
