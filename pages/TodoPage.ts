import { Page, Locator } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly todoInput: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    this.page = page;   // รับ browser page เข้ามา

    // หา textbox จาก role = textbox และ name = "What needs to be done?"
    this.todoInput = page.getByRole('textbox', {
      name: 'What needs to be done?'
    });

    // หา todo item ทั้งหมดจาก role = listitem
    this.todoItems = page.getByRole('listitem');
  }

  async goto() {    // เปิด browser ไปที่ TodoMVC URL
    await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  }

  async addTodo(todoText: string) { // Add todo lists
    await this.todoInput.fill(todoText);
    await this.todoInput.press('Enter');
  }

  async getTodoCount() {    // Count todo items
    return await this.todoItems.count();
  }

  async getTodoText(index: number) { // Get text ของ todo ตาม index
    return await this.todoItems
      .nth(index)
      .locator('label')
      .textContent();
  }

  async toggleTodo(index: number) { // Mark todo as completed
    await this.todoItems
      .nth(index)
      .getByLabel('Toggle Todo')
      .check();
  }

  async untoggleTodo(index: number) { // Unmark completed todo
    await this.todoItems
      .nth(index)
      .getByLabel('Toggle Todo')
      .uncheck();
  }

  async deleteTodo(index: number) { // Delete todo item
    const item = this.todoItems.nth(index);

    await item.hover();

    await item
      .getByRole('button', { name: 'Delete' })
      .click();
  }

  async clickFilter(filter: 'All' | 'Active' | 'Completed') {
    // Click filter menu
    await this.page
      .getByRole('link', { name: filter })
      .click();
  }
}