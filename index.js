const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const DB = require("./database.js");
const uuid = require("uuid");
const { websocketService } = require("./websocket.js");
const authCookieName = "token";

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static("public"));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set("trust proxy", true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Set the cookie response header with auth token
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

// Create Account
apiRouter.post("/user", async (_req, res) => {
  if (await DB.getUser(_req.body.username)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await DB.createUser(_req.body.username, _req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);
    res.status(200).send();
  }
});

// Login
apiRouter.post("/auth", async (_req, res) => {
  let user = await DB.getUser(_req.body.username);

  if (user) {
    if (await bcrypt.compare(_req.body.password, user.password)) {
      token = uuid.v4();
      setAuthCookie(res, token);
      DB.updateUser(_req.body.username, { $set: { token: token } });
      res.status(200).send(user);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

// Get User
apiRouter.get("/user", (_req, res) => {
  let user = users.find((el) => {
    if (el.username === _req.body.username) {
      return el;
    }
  });

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(400);
  }
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Logout
secureApiRouter.delete("/auth", (_req, res) => {
  res.clearCookie(authCookieName);
  res.sendStatus(200);
});

// Create meal or save meal info
secureApiRouter.post("/meal", async (_req, res) => {
  const meal = await DB.getMeal(_req.body.username, _req.body.name);

  if (meal) {
    DB.updateMeal(_req.body);
  } else {
    DB.createMeal(_req.body);
  }

  res.sendStatus(200);
});

// Get all meals
secureApiRouter.get("/meals", async (_req, res) => {
  let username = _req.url.split("=")[1];
  const meals = await DB.getAllMeals(username);
  if (meals) {
    res.status(200).send(meals);
  } else {
    res.sendStatus(404);
  }
});

// Get meal info
//**This should be a get method but the meal name was not
// transferring through the URL nicely when it had special characters
// and you cannot have a body in a GET request**
secureApiRouter.put("/meal", async (_req, res) => {
  const meal = await DB.getMeal(_req.body.username, _req.body.meal_name);

  if (meal) {
    res.status(200).send(meal);
  } else {
    res.sendStatus(404);
  }
});

secureApiRouter.delete("/meal", async (_req, res) => {
  const meal = await DB.getMeal(_req.body.username, _req.body.meal_name);

  if (meal) {
    DB.deleteMeal(meal);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Save main or daily goal
secureApiRouter.post("/goal", (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let type = params[1].split("=")[1];

  let new_vals = null;
  if (type == "main") {
    new_vals = { $set: { main_goal: _req.body } };
  } else {
    new_vals = { $set: { daily_goal: _req.body } };
  }
  DB.updateUser(username, new_vals);
  res.sendStatus(200);
});

// Get main or daily goal
secureApiRouter.get("/goal", async (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let type = params[1].split("=")[1];

  let user = await DB.getUser(username);

  if (user) {
    let new_vals = null;
    if (type === "main") {
      if (!user.main_goal) {
        let main = {
          start_date: "01/01/2024",
          start_weight: "0",
          goal_weight: "01/01/2024",
          goal_date: "0",
        };

        new_vals = {
          $set: {
            main_goal: main,
          },
        };
        DB.updateUser(username, new_vals);
        res.status(201).send(main);
      } else {
        res.status(200).send(user.main_goal);
      }
    } else {
      if (!user.daily_goal) {
        let daily = {
          calories: "< 0",
          protein: "< 0",
          fat: "< 0",
          carbs: "< 0",
        };
        new_vals = {
          $set: {
            daily_goal: daily,
          },
        };
        DB.updateUser(username, new_vals);
        res.status(201).send(daily);
      } else {
        res.status(200).send(user.daily_goal);
      }
    }
  } else {
    res.sendStatus(400);
  }
});

// Get the totals for a whole month
secureApiRouter.get("/monthly/totals", async (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let month = params[1].split("=")[1];

  const entrys = await DB.getLogEntrys(username, month);

  if (entrys) res.status(200).send(entrys);
  else res.sendStatus(404);
});

// Get the totals for a specific day
secureApiRouter.get("/totals", async (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let date = params[1].split("=")[1];

  const entry = await DB.getLogEntry(username, date);
  if (!entry) {
    const create = await DB.createLogEntry(username, date);
    res.status(201).send(create);
  } else {
    res.status(200).send(entry);
  }
});

// Update daily totals
secureApiRouter.put("/totals", async (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let date = params[1].split("=")[1];

  let totals = await DB.getLogEntry(username, date);

  totals.calories += Number(_req.body.calories);
  totals.protein += Number(_req.body.protein);
  totals.fat += Number(_req.body.fat);
  totals.carbs += Number(_req.body.carbs);

  DB.updateLogEntry(username, date, {
    $set: {
      calories: totals.calories,
      protein: totals.protein,
      fat: totals.fat,
      carbs: totals.carbs,
    },
  });
  res.sendStatus(200);
});

// Create a post
secureApiRouter.post("/post", (_req, res) => {
  DB.createPost(_req.body);
  res.sendStatus(200);
});

// Get all the posts
secureApiRouter.get("/posts", async (_req, res) => {
  let username = _req.url.split("=")[1];

  const posts = await DB.getAllPosts(username);

  if (posts) {
    res.status(200).send(posts);
  } else {
    res.sendStatus(404);
  }
});

// Get profile info
secureApiRouter.get("/profile", async (_req, res) => {
  let username = _req.url.split("=")[1];
  let user = await DB.getUser(username);

  if (user) {
    if (!user.profile) {
      let profile = {
        biography: "No biography found!",
      };

      let new_vals = { $set: { profile: profile } };
      DB.updateUser(username, new_vals);

      res.status(201).send(profile);
    } else {
      res.status(200).send(user.profile);
    }
  } else {
    res.sendStatus(400);
  }
});

// Update profile
secureApiRouter.put("/profile", async (_req, res) => {
  let username = _req.url.split("=")[1];
  let user = await DB.getUser(username);

  if (user) {
    let new_vals = { $set: _req.body };
    DB.updateUser(username, new_vals);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

let httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

websocketService(httpService);
