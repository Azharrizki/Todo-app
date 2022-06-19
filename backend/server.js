const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");
const handleErrors = require("./middlewares/errorHandler");

const app = express();
const port = 3001;

// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "notesDB";

app.use(bodyParser.json());

// Connect database
MongoClient.connect(url, (err, client) => {
	const db = client.db(dbName);
	const notesCollection = db.collection("notes");

	app.locals.notesCollection = notesCollection;
});

app.use(cors());

// Routes
app.use("/", routes);

// Menggunakan error handler
app.use(handleErrors);

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
