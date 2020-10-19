const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todo_api'
});

connection.connect();

// GET
app.get("/api", (req, res) => {
    connection.query("select * from todo_list", (error, result, field) => {
        if (error) { console.log(error) }
        res.send(result);
    });
});

app.get("/api/:id", (req, res) => {
    connection.query("select * from todo_list where id=?", req.params.id,
        (error, result, field) => {
            if (error) { console.log(error) }
            res.send(result);
        });
});

// POST
app.post("/api", (req, res) => {
    connection.query("insert into todo_list(name, isDone) values(?, ?)", [req.body.name, req.body.isDone],
        (error, result, field) => {
            if (error) { console.log(error) }
            res.send(result);
        })
})

// PUT
app.put("/api/:id", (req, res) => {
    connection.query("update todo_list set name=?, isDone=? where id=?",
        [req.body.name, req.body.isDone, req.params.id],
        (error, result, field) => {
            if (error) { console.log(error) }
            res.send(result);
        });
});

// DELETE
app.delete("/api/:id", (req, res) => {
    connection.query("delete from todo_list where id=?", req.params.id,
        (error, result, field) => {
            if (error) { console.log(error) }
            res.send(result);
        });
});


// page
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


const port = process.removeListener.PORT || 3000;
app.listen(port);
