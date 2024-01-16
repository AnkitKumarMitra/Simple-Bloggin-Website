import expres from "express";
import bodyParser from "body-parser";

const app = expres();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


function getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getUTCFullYear().toString().slice(-2);
    const month = ('0' + (currentDate.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getUTCDate()).slice(-2);

    const hours = ('0' + currentDate.getUTCHours()).slice(-2);
    const minutes = ('0' + currentDate.getUTCMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getUTCSeconds()).slice(-2);

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

    return formattedDateTime;
}

/* 

To get all the posts: "GET /posts",
To get specific post by using id: "GET /posts/:id",
To add a post: "POST /post"
To edit/patch a post by using id: "PATCH /posts/:id",
To delete a post by using id: "DELETE /posts/:id"

*/

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const desiredPost = posts.find((post) => post.id === id);
    res.json(desiredPost);
});

app.post("/post", (req, res) => {
    console.log(req.body);
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: getCurrentDate()
    };
    
    posts.push(newPost);
    res.status(201).json(newPost);
});

app.patch("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const existingPost = posts.findIndex((post) => post.id === id);
    const editedPost = {
        id: id,
        title: req.body.title || existingPost.title,
        content: req.body.content || existingPost.content,
        author: req.body.author || existingPost.author,
        date: getCurrentDate()
    };
    const existingPostIndex = posts.findIndex((post) => post.id === id);
    posts[existingPostIndex] = editedPost;
    console.log(`This post with id: ${id} got edited. ${editedPost}`);
    res.json(posts[existingPostIndex]);
});

app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = posts.findIndex((post) => post.id === id);
    if (searchIndex > -1) {
        posts.splice(searchIndex, 1);
        res.sendStatus(200);
    }
});

app.listen(port, () => {
    console.log(`Server Running on port ${port}.`);
});

let posts = [
    {
        id: 1,
        title: "The World of Batman",
        content:
            "In the gritty realm of Gotham City, Batman prowls the shadows as a symbol of justice. Clad in the iconic cape and cowl, Bruce Wayne, the tortured billionaire, wages a one-man war against crime. His dark, brooding existence is juxtaposed against a rogues' gallery of villains, each reflecting the city's twisted psyche.",
        author: "Jhonny Sins",
        date: "2023-05-20T15:45:00Z",
    },
    {
        id: 2,
        title: "The World of Ben 10",
        content:
            "In the enchanting world of Ben 10, wielder of the powerful Omnitrix, Ben Tennyson embarks on intergalactic adventures. Transforming into diverse alien forms, he battles extraterrestrial threats, from sinister invaders to cosmic villains. Ben's journey unfolds with humor and heart, as he navigates the complexities of saving the universe while juggling teenage challenges.",
        author: "Mia Khalifa",
        date: "2023-11-07T09:20:00Z",
    },
    {
        id: 3,
        title: "The World of Baba Ram Rahim Singh Ji Insaan",
        content:
            "Baba Ram Rahim Singh Ji Insaan is the spiritual leader and head of the socio-spiritual organization Dera Sacha Sauda. His world revolves around promoting humanitarian causes, education, and social welfare. Despite controversies, his followers view him as a guide, emphasizing selfless service and contributing to a world marked by compassion and upliftment.",
        author: "Selmon Bhoi",
        date: "2023-07-03T21:10:00Z",
    },
];