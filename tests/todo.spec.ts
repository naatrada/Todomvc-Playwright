import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';
import { todoItems } from '../test-data/todos';

test.describe('React TodoMVC - Todo List Automation', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should add a new todo', async () => {
    await todoPage.addTodo(todoItems.first);

    await todoPage.expectTodoVisible(todoItems.first);
    await todoPage.expectTodoCount('1 item left');
  });

  test('should add multiple todos', async () => {
    await todoPage.addTodos([
      todoItems.first,
      todoItems.second,
      todoItems.third
    ]);

    await todoPage.expectTodoListCount(3);
    await todoPage.expectTodoVisible(todoItems.first);
    await todoPage.expectTodoVisible(todoItems.second);
    await todoPage.expectTodoVisible(todoItems.third);
    await todoPage.expectTodoCount('3 items left');
  });

  test('should mark todo as completed', async () => {
    await todoPage.addTodo(todoItems.first);
    await todoPage.markTodoCompleted(todoItems.first);

    await todoPage.expectTodoCompleted(todoItems.first);
    await todoPage.expectTodoCount('0 items left');
  });

  test('should unmark completed todo', async () => {
    await todoPage.addTodo(todoItems.first);
    await todoPage.markTodoCompleted(todoItems.first);
    await todoPage.unmarkTodoCompleted(todoItems.first);

    await todoPage.expectTodoActive(todoItems.first);
    await todoPage.expectTodoCount('1 item left');
  });

  test('should edit todo', async () => {
    await todoPage.addTodo(todoItems.first);
    await todoPage.editTodo(todoItems.first, todoItems.edited);

    await todoPage.expectTodoVisible(todoItems.edited);
    await todoPage.expectTodoNotVisible(todoItems.first);
  });

  test('should delete todo', async () => {
    await todoPage.addTodo(todoItems.first);
    await todoPage.deleteTodo(todoItems.first);

    await todoPage.expectTodoNotVisible(todoItems.first);
    await expect(todoPage.newTodoInput).toBeVisible();
  });

  test('should filter todos by All, Active, and Completed', async () => {
    await todoPage.addTodos([todoItems.first, todoItems.second]);
    await todoPage.markTodoCompleted(todoItems.first);

    await todoPage.filterCompleted();
    await todoPage.expectTodoVisible(todoItems.first);
    await todoPage.expectTodoNotVisible(todoItems.second);

    await todoPage.filterActive();
    await todoPage.expectTodoVisible(todoItems.second);
    await todoPage.expectTodoNotVisible(todoItems.first);

    await todoPage.filterAll();
    await todoPage.expectTodoVisible(todoItems.first);
    await todoPage.expectTodoVisible(todoItems.second);
  });

  test('should clear completed todos', async () => {
    await todoPage.addTodos([todoItems.first, todoItems.second]);
    await todoPage.markTodoCompleted(todoItems.first);
    await todoPage.clearCompleted();

    await todoPage.expectTodoNotVisible(todoItems.first);
    await todoPage.expectTodoVisible(todoItems.second);
    await todoPage.expectTodoCount('1 item left');
  });

  test('should prevent empty todo creation', async () => {
    await todoPage.addTodo('');

    await todoPage.expectTodoListCount(0);
  });

  test('should verify todo counter correctly', async () => {
    await todoPage.addTodos([todoItems.first, todoItems.second]);
    await todoPage.expectTodoCount('2 items left');

    await todoPage.markTodoCompleted(todoItems.first);
    await todoPage.expectTodoCount('1 item left');

    await todoPage.markTodoCompleted(todoItems.second);
    await todoPage.expectTodoCount('0 items left');
  });
});