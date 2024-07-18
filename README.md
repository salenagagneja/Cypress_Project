# README #

# Cypress Project

This repository contains automated test scripts developed using Cypress. This project includes various test scenarios for different applications, serving as a QA automation assignment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).

## Setup

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    clone <repository-url>
    ```

2. **Navigate to the project directory**:
    ```sh
    cd Cypress_Project
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

## Running Tests

You can run the Cypress test scripts in different modes:

1. **Open Mode**: This allows you to interactively run tests in the Cypress Test Runner.
    ```sh
    npx cypress open
    ```

2. **Run Mode**: This executes all test scripts in headless mode.
    ```sh
    npx cypress run
    ```

3. **Specific Test Scripts**: To run specific test scripts, use the `--spec` option followed by the path to the test file.
    - For IMDb tests:
      ```sh
      npx cypress run --spec "cypress/e2e/Features/IMDb UI.feature"
      ```
    - For Poke.co tests:
      ```sh
      npx cypress run --spec "cypress/e2e/Features/Poke API.feature"
      ```

## Project Structure

The project directory structure is as follows:
Cypress_Project/
│
├── cypress/
│ ├── e2e/
│ │ ├── Features/
│ │ │ ├── IMDb UI.feature
│ │ │ ├── Poke API.feature
│ │ │ └── (other feature files)
│ │ └── (other test files)
│ ├── fixtures/
│ ├── integration/
│ ├── plugins/
│ └── support/
│
├── .gitignore
├── cypress.config.js
├── package.json

