import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('TC-AUTO-001 Verify user can add a new todo', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  // Step 2: Add a new todo
  await todoPage.addTodo('Update Resume');

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 3: Verify todo is added successfully
  await expect(items).toHaveCount(1);
  await expect(items.nth(0)).toContainText('Update Resume');
});

test('TC-AUTO-002 Verify user can add multiple todos', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  const todos = [
    'Update Resume',
    'Update LinkedIn',
    'Pray for good luck',
  ];

  // Step 2: Add multiple todos
  for (const todo of todos) {
    await todoPage.addTodo(todo);
  }

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 3: Verify all todos are added successfully
  await expect(items).toHaveCount(3);
  await expect(items.nth(0)).toContainText('Update Resume');
  await expect(items.nth(1)).toContainText('Update LinkedIn');
  await expect(items.nth(2)).toContainText('Pray for good luck');
});

test('TC-AUTO-003 Verify user can mark todo as completed', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  // Step 2: Add a new todo
  await todoPage.addTodo('Update Resume');

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 3: Mark todo as completed
  await todoPage.toggleTodo(0);

  // Step 4: Verify todo is marked as completed
  await expect(items.nth(0)).toHaveClass(/completed/);
});

test('TC-AUTO-004 Verify user can filter completed todos', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  const todos = [
    'Update Resume',
    'Update LinkedIn',
    'Pray for good luck',
  ];

  // Step 2: Add multiple todos
  for (const todo of todos) {
    await todoPage.addTodo(todo);
  }

  // Step 3: Mark first 2 todos as completed
  await todoPage.toggleTodo(0);
  await todoPage.toggleTodo(1);

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 4: Filter completed todos
  await todoPage.clickFilter('Completed');

  // Step 5: Verify only completed todos are displayed
  await expect(items).toHaveCount(2);
  await expect(items.nth(0)).toContainText('Update Resume');
  await expect(items.nth(1)).toContainText('Update LinkedIn');
});

test('TC-AUTO-005 Verify user can filter active todos', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  const todos = [
    'Update Resume',
    'Update LinkedIn',
    'Pick up stranger call',
    'Pray for good luck',
  ];

  // Step 2: Add multiple todos
  for (const todo of todos) {
    await todoPage.addTodo(todo);
  }

  // Step 3: Mark first 2 todos as completed
  await todoPage.toggleTodo(0);
  await todoPage.toggleTodo(1);

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 4: Filter active todos
  await todoPage.clickFilter('Active');

  // Step 5: Verify only active todos are displayed
  await expect(items).toHaveCount(2);
  await expect(items.nth(0)).toContainText('Pick up stranger call');
  await expect(items.nth(1)).toContainText('Pray for good luck');
});

test('TC-AUTO-006 Verify user can filter all todos', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  const todos = [
    'Update Resume',
    'Update LinkedIn',
    'Pick up stranger call',
    'Pray for good luck',
  ];

  // Step 2: Add multiple todos
  for (const todo of todos) {
    await todoPage.addTodo(todo);
  }

  // Step 3: Mark first 2 todos as completed
  await todoPage.toggleTodo(0);
  await todoPage.toggleTodo(1);

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 4: Filter active todos
  await todoPage.clickFilter('Active');
  await expect(items).toHaveCount(2);

  // Step 5: Filter all todos
  await todoPage.clickFilter('All');

  // Step 6: Verify all todos are displayed
  await expect(items).toHaveCount(4);
  await expect(items.nth(0)).toContainText('Update Resume');
  await expect(items.nth(1)).toContainText('Update LinkedIn');
  await expect(items.nth(2)).toContainText('Pick up stranger call');
  await expect(items.nth(3)).toContainText('Pray for good luck');
});

test('TC-AUTO-007 Verify user can delete a todo', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  const todos = [
    'Update Resume',
    'Update LinkedIn',
    'Pick up stranger call',
  ];

  // Step 2: Add multiple todos
  for (const todo of todos) {
    await todoPage.addTodo(todo);
  }

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 3: Delete one todo
  await todoPage.deleteTodo(1);

  // Step 4: Verify todo count decreased
  await expect(items).toHaveCount(2);

  // Step 5: Verify deleted todo is not displayed
  await expect(todoList).not.toContainText('Update LinkedIn');
});

test('TC-AUTO-008 Verify user can delete a completed todo', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  const todos = [
    'Update Resume',
    'Update LinkedIn',
    'Pick up stranger call',
  ];

  // Step 2: Add multiple todos
  for (const todo of todos) {
    await todoPage.addTodo(todo);
  }

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 3: Mark todo as completed
  await todoPage.toggleTodo(1);
  await expect(items.nth(1)).toHaveClass(/completed/);

  // Step 4: Delete completed todo
  await todoPage.deleteTodo(1);

  // Step 5: Verify todo count decreased
  await expect(items).toHaveCount(2);

  // Step 6: Verify completed todo is deleted
  await expect(todoList).not.toContainText('Update LinkedIn');
});

test('TC-AUTO-009 Verify user can clear completed todos', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  const todos = [
    'Update Resume',
    'Update LinkedIn',
    'Pick up stranger call',
    'Pray for good luck',
  ];

  // Step 2: Add multiple todos
  for (const todo of todos) {
    await todoPage.addTodo(todo);
  }

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 3: Mark first 2 todos as completed
  await todoPage.toggleTodo(0);
  await todoPage.toggleTodo(1);

  // Step 4: Clear completed todos
  await page.getByRole('button', { name: 'Clear completed' }).click();

  // Step 5: Verify only active todos remain
  await expect(items).toHaveCount(2);
  await expect(todoList).not.toContainText('Update Resume');
  await expect(todoList).not.toContainText('Update LinkedIn');
  await expect(items.nth(0)).toContainText('Pick up stranger call');
  await expect(items.nth(1)).toContainText('Pray for good luck');
});

test('TC-AUTO-010 Verify user cannot add empty todo', async ({ page }) => {
  const todoPage = new TodoPage(page);

  // Step 1: Open Todo page
  await todoPage.goto();

  const todoList = page.locator('.todo-list');
  const items = todoList.getByRole('listitem');

  // Step 2: Press Enter without entering todo text
  await todoPage.todoInput.press('Enter');

  // Step 3: Verify no todo is added
  await expect(items).toHaveCount(0);
});