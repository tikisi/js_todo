let itemId = 0;
export class TodoItemModel {
    constructor({ title, completed }) {
        this.id = itemId++;
        this.title = title;
        this.completed = completed;
    }
}