import { EventEmitter } from "./EvenetEmitter.js";
import { setItemId } from "./TodoItemModel.js";

export class TodoListModel extends EventEmitter {
    constructor(items = []) {
        super();
        this.items = items;
        this.syncTodo().then(() => {
            setItemId(this.items[this.items.length - 1].id + 1);
        });
    }

    getTotalCount() { return this.items.length; }
    getTodoItems() { return this.items; }
    onChange(listener) { this.addEventListener("change", listener); }
    emitChange() { this.emit("change"); }

    addTodo(todoItem) {
        //this.items.push(todoItem);
        this.dbAdd(todoItem).then(() => {
            return this.syncTodo();
        }).then(() => {
            this.emitChange();
        })
    }

    updateTodo({ id, completed }) {
        const todoItem = this.items.find(todo => todo.id === id);
        if (!todoItem) return;
        todoItem.completed = completed;
        this.dbUpdate(todoItem).then(() => {
            return this.syncTodo();
        }).then(() => {
            this.emitChange();
        });
    }

    deleteTodo({ id }) {
        this.items = this.items.filter(todo => todo.id != id);
        this.dbDelete(id).then(() => {
            return this.syncTodo();
        }).then(() => {
            this.emitChange();
        });
    }

    syncTodo() {
        return fetch('http://localhost:3000/api')
            .then(response => {
                return response.json();
            })
            .then(jsons => {
                this.items = [];
                jsons.forEach((json, i) => {
                    this.items[i] = this.dbToItem(json);
                });
            })
            .then(() => {
                this.emitChange();
            });
    }

    dbAdd(item) {
        const obj = this.ItemToDb(item);
        const method = "POST";
        const body = Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key])).join("&");
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        };
        return fetch("http://localhost:3000/api", { method, headers, body }).then(console.log).catch(console.error);
    }

    dbUpdate(item) {
        const obj = this.ItemToDb(item);
        const method = "PUT";
        const body = Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key])).join("&");
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        };
        return fetch(`http://localhost:3000/api/${obj.id}`, { method, headers, body }).then(console.log).catch(console.error);
    }

    dbDelete(id) {
        return fetch(`http://localhost:3000/api/${id}`, { method: 'DELETE' }).then(console.log).catch(console.error);
    }

    dbToItem(json) {
        return {
            id: json.id,
            title: json.name,
            completed: json.isDone
        };
    }

    ItemToDb(item) {
        return {
            id: item.id,
            name: item.title,
            isDone: Number(item.completed)
        };
    }
}