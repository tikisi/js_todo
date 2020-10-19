import { render } from "./view/html-util.js";
import { TodoItemModel } from "./TodoItemModel.js";
import { TodoListModel } from "./TodoListModel.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
    constructor() {
        console.log("App initialized");
        this.todoListModel = new TodoListModel();
        this.todoListModel.syncTodo();
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        this.todoListModel.onChange(() => {
            const todoListElement = new TodoListView().createElement(this.todoListModel, {
                onUpdateTodo: ({ id, completed }) => {
                    this.todoListModel.updateTodo({ id, completed });
                },
                onDeleteTodo: ({ id }) => {
                    this.todoListModel.deleteTodo({ id });
                }
            });

            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            // ページの更新を阻止
            event.preventDefault();

            this.todoListModel.addTodo(new TodoItemModel({ title: inputElement.value, completed: false }));

            inputElement.value = "";
        });
    }
}
