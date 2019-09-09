const express = require("express");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();
const nameAndWordController = require("./controllers/nameAndWordController");

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 //one day
    }
  })
);

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
  console.log("Database Connected :)");
});

app.get("/api/name", nameAndWordController.getName);
app.put("/api/new-name", nameAndWordController.editName);
app.get("/api/words", nameAndWordController.getWords);
app.delete("/api/words/:id", nameAndWordController.deleteWordById);
app.post("/api/words", nameAndWordController.addWord);

app.post("/auth/register", nameAndWordController.register);
app.post("/auth/login", nameAndWordController.login);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Now listening on Port:${process.env.SERVER_PORT}`)
);
