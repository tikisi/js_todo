import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
    createElement(todoListModel, { onUpdateTodo, onDeleteTodo }) {
        const todoListElement = element`<ul></ul>`;
        const todoItems = todoListModel.getTodoItems();
        todoItems.forEach(item => {
            const todoItemView = new TodoItemView();
            const todoItemElement = todoItemView.createView(item, {
                onUpdateTodo,
                onDeleteTodo
            });
            todoListElement.appendChild(todoItemElement);
        });

        return todoListElement;
    }
}