import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = `http://localhost:4000/`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}posts`);
        res.render("index.ejs", { content: response.data });
    } catch {
        res.sendStatus(404);
    }
});

app.get("/new", (req, res) => {
    res.render("create.ejs");
});

app.post("/api/new", async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}post`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        console.error("Error:", error.message);
        res.sendStatus(500);
    }
});

app.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}posts/${req.params.id}`);
        res.render("edit.ejs", { content: response.data });
    } catch (error) {
        res.sendStatus(404);
    }
});

app.post("/api/edit/:id", async (req, res) => {
    try{
        const sendData = await axios.patch(`${API_URL}posts/${req.params.id}`, req.body);
        res.redirect("/");
    } catch (error){
        res.sendStatus(404)
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        const response = await axios.delete(`${API_URL}posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Server running at ${port}.`);
});