let itemId = 0;

export function setItemId(num) {
    itemId = num;
}

export class TodoItemModel {
    constructor({ title, completed }) {
        this.id = itemId++;
        this.title = title;
        this.completed = completed;
    }
}