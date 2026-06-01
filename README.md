# 🧪 React TodoMVC Automation Testing – Playwright + TypeScript

## 📌 Project Overview

This repository is a practice automation project created to improve my Playwright and TypeScript automation skills.

The implementation focuses on clean structure, Page Object Model, maintainability, and reliable test coverage for core TodoMVC flows.

🔗 Target application:

https://demo.playwright.dev/todomvc/#/

This project was built to practice real-world UI automation design using Playwright while keeping the structure readable, scalable, and easy to maintain.

### 🎯 Key focus areas

* ✅ Playwright with TypeScript
* ✅ Page Object Model
* ✅ Reusable selectors and page methods
* ✅ Clean and maintainable project structure
* ✅ Reliable test coverage for core TodoMVC functionality
* ✅ Practical QA automation workflow

---

## 📁 Project Structure

```bash
todomvc-playwright/
│
├── pages/
│   └── TodoPage.ts
│
├── tests/
│   └── todo.spec.ts
│
├── test-data/
│   └── todos.ts
│
├── utils/
│   └── testHelpers.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

### 📂 Folder Details

### 📄 pages/

Contains Page Object Model classes and reusable page actions.

### 🧪 tests/

Contains Playwright test scenarios.

### 📝 test-data/

Stores reusable test data separately from test logic.

### 🛠️ utils/

Helper functions for future scalability.

### ⚙️ playwright.config.ts

Central Playwright configuration.

### 📘 README.md

Project setup and execution guide.

---

## ✅ Test Coverage

The automation suite covers core TodoMVC user flows.

### ➕ Todo Creation

* Add a new todo
* Add multiple todos
* Prevent empty todo creation

### ✔️ Todo Status

* Mark todo as completed
* Unmark completed todo

### ✏️ Todo Management

* Edit existing todo
* Delete todo

### 🔎 Filters

* Filter All
* Filter Active
* Filter Completed

### 🧹 Cleanup

* Clear completed todos

### 🔢 Counter Validation

* Verify active todo counter updates correctly

---

## 🧰 Tech Stack

* Playwright
* TypeScript
* Node.js

---

## 🏗️ Automation Design Approach

### 📦 Page Object Model

Page interactions are separated from test scenarios.

Example:

```ts
await todoPage.addTodo('Buy milk');
await todoPage.markTodoCompleted('Buy milk');
```

### Benefits

* ✅ Better readability
* ✅ Reusable page actions
* ✅ Easier maintenance
* ✅ Selectors updated in one place

---

### 🎯 Selector Strategy

The project prioritizes stable selectors.

Examples:

```ts
page.locator('.new-todo')
page.locator('.destroy')
page.getByRole('link', { name: 'Completed' })
```

### Why

* ✅ Reliable with TodoMVC DOM
* ✅ Readable
* ✅ Easier debugging

---

### 🔄 Maintainability

Test data is separated from test logic.

Reusable methods reduce duplication.

The structure is easy to extend with additional scenarios in the future.

---

## 📋 Prerequisites

Install:

* Node.js 18+
* npm

Check versions:

```bash
node -v
npm -v
```

---

## 🚀 Installation

Clone repository:

```bash
git clone <repository-url>
```

Go into project:

```bash
cd todomvc-playwright
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## ▶️ Run Tests

Run all tests:

```bash
npx playwright test
```

Run headed mode:

```bash
npx playwright test --headed
```

Run debug mode:

```bash
npx playwright test --debug
```

Run specific test:

```bash
npx playwright test -g "should delete todo"
```

---

## 📊 View Playwright Report

After test execution:

```bash
npx playwright show-report
```

The report includes:

* ✅ Test results
* 📄 Execution logs
* 📸 Screenshots on failure
* 🔍 Trace on retry
* 🎥 Videos on failure

---

## 📝 Notes

* Tests were executed against the Playwright TodoMVC demo
* Chromium browser was used
* `.destroy` selector was used for delete button because it is more reliable for this application
* Test data is intentionally simple and reusable
* Project structure is prepared for future scalability

---

## 🎉 Summary

This project was created as Playwright + TypeScript automation practice with focus on:

* ✅ Readable test structure
* ✅ Maintainable Page Object Model
* ✅ Reliable selectors
* ✅ Reusable page methods
* ✅ Clean project organization

The goal is to keep the implementation practical, easy to understand, and aligned with real-world QA automation workflow.
