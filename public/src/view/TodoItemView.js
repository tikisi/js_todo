import { element } from "./html-util.js";

export class TodoItemView {
    createView(todoItemModel, { onUpdateTodo, onDeleteTodo }) {
        const todoItemElement = todoItemModel.completed
            ? element`<li><input type="checkbox" class="checkbox" checked><s>${todoItemModel.title}</s><button class="delete">x</button></li>`
            : element`<li><input type="checkbox" class="checkbox">${todoItemModel.title}<button class="delete">x</button></li>`;
        const inputCheckBoxElement = todoItemElement.querySelector(".checkbox");

        // チェックボタンが押されたとき
        inputCheckBoxElement.addEventListener("change", () => {
            onUpdateTodo({
                id: todoItemModel.id,
                completed: !todoItemModel.completed
            });
        });

        // Deleteされたとき
        const inputDeleteElement = todoItemElement.querySelector(".delete");
        inputDeleteElement.addEventListener("click", () => {
            onDeleteTodo({
                id: todoItemModel.id
            });
        });

        return todoItemElement;
    }
}