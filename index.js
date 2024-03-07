class User {
  constructor(first, last, username, password) {
    this.first = first;
    this.last = last;
    this.username = username;
    this.password = password;
    this.biography = "";
    this.meals = [];
    this.log = [];
    this.posts = [];
    this.main_goal = null;
    this.daily_goal = null;
    this.total_calories = 0;
    this.total_protein = 0;
    this.total_fat = 0;
    this.total_carbs = 0;
  }
}

const express = require("express");
const app = express();

let users = [];

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static("public"));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

/*  
    -- Endpoints --

    create account (post/user)
    login (create auth token) (post/auth)
    get user (get/user)

    create meal (post/meal)
    update meal (put/meal)
    get meal info (get/meal)

    create main goal (post/main)
    update main goal (put/main)
    get main goal info (get/main)

    create daily goal (post/daily)
    update daily goal (put/daily)
    get daily goal info (get/daily)

    .
    .
    .
*/
// Create Account
apiRouter.post("/user", (_req, res) => {
  users.push(_req.body);
  res.status(200).send();
});

// Login
apiRouter.post("/auth", (_req, res) => {
  user = users.find((el) => {
    if (el.username === _req.body.username) {
      return el;
    }
  });

  if (!user) {
    res.status(400).send("bad request");
  } else if (_req.body.password === user.password) {
    res.status(200).send("token");
  } else {
    res.status(400).send("bad request");
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
