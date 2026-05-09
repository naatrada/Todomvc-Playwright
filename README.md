# 📝 TodoMVC Automation Testing

This project contains automated UI test scripts for the TodoMVC web application using Playwright with TypeScript.

---

# 🌐 Application Under Test

🔗 TodoMVC Website  
https://demo.playwright.dev/todomvc/#/

---

# 🛠️ Tools and Framework

- 🎭 Playwright
- 📘 TypeScript
- 🟢 Node.js
- 💻 Visual Studio Code

---

# 📁 Project Structure

```text
todoMVC-automation/
├── pages/
│   └── TodoPage.ts
├── tests/
│   └── todo.spec.ts
├── playwright.config.ts
├── package.json
└── README.md

⚙️ Prerequisites

Before running the test scripts, please make sure the following tools are installed on your device.

1️⃣ Install Node.js

🔗 Download: https://nodejs.org/

Verify installation:

node -v
npm -v
2️⃣ Install Visual Studio Code

🔗 Download: https://code.visualstudio.com/

3️⃣ Install Playwright Browsers

Playwright browsers will be installed during setup steps below.

🚀 Setup Instructions
📥 Step 1: Clone or Download Project

Open Terminal and navigate to the project folder.

cd todoMVC-automation
📦 Step 2: Install Dependencies
npm install
🌍 Step 3: Install Playwright Browsers
npx playwright install
▶️ How to Run Tests
✅ Run All Tests
npx playwright test
👀 Run Tests with Browser Visible
npx playwright test --headed
🎛️ Run Tests in Playwright UI Mode
npx playwright test --ui
📊 View HTML Test Report
npx playwright show-report

----------------------------------------------------------------------------------------------------------

🧪 Automated Test Scenarios
Test Case ID	Test Scenario
TC-AUTO-001	Verify user can add a new todo
TC-AUTO-002	Verify user can add multiple todos
TC-AUTO-003	Verify user can mark todo as completed
TC-AUTO-004	Verify user can filter completed todos
TC-AUTO-005	Verify user can filter active todos
TC-AUTO-006	Verify user can filter all todos
TC-AUTO-007	Verify user can delete a todo
TC-AUTO-008	Verify user can delete a completed todo
TC-AUTO-009	Verify user can clear completed todos
TC-AUTO-010	Verify user cannot add empty todo

🏗️ Automation Design
This automation project follows the Page Object Model (POM) design pattern.

📄 TodoPage.ts
Stores locators
Stores reusable page actions

🧪 todo.spec.ts
Contains automated test scenarios
Contains validation steps and assertions

✨ Benefits of This Structure
✅ Better readability
✅ Reusable methods
✅ Easier maintenance
✅ Better scalability for future test cases

📌 Notes

Only high-priority and automation-friendly scenarios were selected from the manual test cases for automation testing.

The selected scenarios focus on core TodoMVC features such as:

➕ Adding todos
✅ Marking todos as completed
🔍 Filtering todo status
🗑️ Deleting todos
🚫 Validating empty input behavior

