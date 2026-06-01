import { expect, Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly todoCount: Locator;
  readonly clearCompletedButton: Locator;
  readonly allFilter: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodoInput = page.locator('.new-todo');
    this.todoItems = page.locator('.todo-list li');
    this.todoCount = page.locator('.todo-count');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
    this.allFilter = page.getByRole('link', { name: 'All' });
    this.activeFilter = page.getByRole('link', { name: 'Active' });
    this.completedFilter = page.getByRole('link', { name: 'Completed' });
  }

async goto(): Promise<void> {
  await this.page.goto('https://demo.playwright.dev/todomvc/#/');
  await expect(this.newTodoInput).toBeVisible();
}

  async addTodo(todoName: string): Promise<void> {
    await this.newTodoInput.fill(todoName);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(todoNames: string[]): Promise<void> {
    for (const todo of todoNames) {
      await this.addTodo(todo);
    }
  }

  todoItemByText(todoName: string): Locator {
    return this.todoItems.filter({ hasText: todoName });
  }

  async expectTodoVisible(todoName: string): Promise<void> {
    await expect(this.todoItemByText(todoName)).toBeVisible();
  }

  async expectTodoNotVisible(todoName: string): Promise<void> {
    await expect(this.todoItemByText(todoName)).toHaveCount(0);
  }

  async markTodoCompleted(todoName: string): Promise<void> {
    await this.todoItemByText(todoName).getByRole('checkbox').check();
  }

  async unmarkTodoCompleted(todoName: string): Promise<void> {
    await this.todoItemByText(todoName).getByRole('checkbox').uncheck();
  }

  async expectTodoCompleted(todoName: string): Promise<void> {
    await expect(this.todoItemByText(todoName)).toHaveClass(/completed/);
  }

  async expectTodoActive(todoName: string): Promise<void> {
    await expect(this.todoItemByText(todoName)).not.toHaveClass(/completed/);
  }

  async editTodo(oldName: string, newName: string): Promise<void> {
    const todo = this.todoItemByText(oldName);
    await todo.dblclick();

    const editInput = todo.locator('.edit');
    await editInput.fill(newName);
    await editInput.press('Enter');
  }

async deleteTodo(todoName: string): Promise<void> {
  const todo = this.todoItemByText(todoName);

  await todo.hover();
  await todo.locator('.destroy').click({ force: true });
}

  async filterAll(): Promise<void> {
    await this.allFilter.click();
  }

  async filterActive(): Promise<void> {
    await this.activeFilter.click();
  }

  async filterCompleted(): Promise<void> {
    await this.completedFilter.click();
  }

  async clearCompleted(): Promise<void> {
    await this.clearCompletedButton.click();
  }

  async expectTodoCount(expectedText: string): Promise<void> {
    await expect(this.todoCount).toContainText(expectedText);
  }

  async expectTodoListCount(count: number): Promise<void> {
    await expect(this.todoItems).toHaveCount(count);
  }
}