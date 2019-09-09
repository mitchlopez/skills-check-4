const bcrypt = require("bcryptjs");

function getName(req, res) {
  const dbInstance = req.app.get("db");

  dbInstance
    .getName()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(e => {
      res.status(500).json("oops, something went wrong");
      console.log(e);
    });
}

function editName(req, res) {
  const dbInstance = req.app.get("db");
  const { name } = req.query;

  dbInstance
    .setName(name)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(e => {
      res.status(500).json("oops, something went wrong");
      console.log(e);
    });
}

function getWords(req, res) {
  const dbInstance = req.app.get("db");

  dbInstance
    .getWords()
    .then(words => {
      res.status(200).json(words);
    })
    .catch(e => console.log(e));
}

function deleteWordById(req, res) {
  const dbInstance = req.app.get("db");
  const { id } = req.params;

  dbInstance
    .deleteWordById(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(e => console.log(e));
}

function addWord(req, res) {
  const dbInstance = req.app.get("db");
  const { word } = req.body;

  dbInstance
    .addWord(word)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(e => console.log(e));
}

function checkIfUserExists(req, res) {
  const dbInstance = req.app.get("db");
  const { username } = req.body;

  dbInstance
    .checkIfUserExists(username)
    .then(res => {
      res.status(200).json(res);
    })
    .catch(e => console.log(e));
}

async function register(req, res) {
  const dbInstance = req.app.get("db");
  const { username, password, favoriteColor } = req.body;

  const response = await dbInstance.checkIfUserExists(username);
  if (+response[0].count > 0) {
    res.status(406).json({
      error: "Username Taken"
    });
  } else {
    const hash = await bcrypt.hash(password, 10);
    await dbInstance.createUser(username, hash, favoriteColor);
    req.session.user = {
      username: username,
      favoriteColor: favoriteColor
    };
    res.status(200).json(req.session.user);
  }
}

async function login(req, res) {
  const db = req.app.get("db");
  const { username, password } = req.body;

  const info = await db.getUserInfo(username);
  const isCorrect = await bcrypt.compare(password, info[0].hash);

  if (isCorrect === true) {
    req.session.user = {
      username: username,
      favoriteColor: info[0].fav_color
    };
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({
      error: "Incorrect Username or password"
    });
  }
}

module.exports = {
  getName,
  editName,
  getWords,
  deleteWordById,
  addWord,
  checkIfUserExists,
  register,
  login
};
