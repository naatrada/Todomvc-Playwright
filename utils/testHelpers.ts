export function generateTodoName(prefix = 'Todo'): string {
  return `${prefix} ${Date.now()}`;
}