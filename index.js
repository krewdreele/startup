const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const DB = require("./database.js");

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
apiRouter.post("/auth", (_req, res) => {
  let user = users.find((el) => {
    if (el.username === _req.body.username) {
      return el;
    }
  });

  if (user) {
    if (!user.log) {
      user.log = {};
      user.log[_req.body.date] = {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      };
    }
    if (_req.body.password === user.password) {
      res.status(200).send({ username: user.username, auth: "1234" });
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

// Create meal or save meal info
apiRouter.post("/meal", (_req, res) => {
  let params = _req.url.split("?")[1];
  let username = params.split("=")[1];
  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    if (!user.meals) {
      user["meals"] = [];
    }
    let index = user.meals.findIndex((el) => {
      return el.name === _req.body.name;
    });
    if (index >= 0) {
      user.meals[index] = _req.body;
    } else {
      user.meals.push(_req.body);
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Get all meals
apiRouter.get("/meals", (_req, res) => {
  let username = _req.url.split("=")[1];
  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    if (!user.meals) {
      user.meals = [];
    }
    res.status(200).send(user.meals);
  } else {
    res.sendStatus(400);
  }
});

// Get meal info
apiRouter.get("/meal", (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let mealname = params[1].split("=")[1];
  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    let meal = user.meals.find((el) => {
      if (el.name === mealname) {
        return el;
      }
    });
    if (meal) {
      res.send(meal);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

// Save main or daily goal
apiRouter.post("/goal", (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let type = params[1].split("=")[1];

  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    if (type === "main") {
      user.main_goal = _req.body;
    } else {
      user.daily_goal = _req.body;
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Get main or daily goal
apiRouter.get("/goal", (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let type = params[1].split("=")[1];

  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    if (type === "main") {
      if (!user.main_goal) {
        user.main_goal = {
          start_date: "01/01/2024",
          start_weight: "0",
          goal_weight: "01/01/2024",
          goal_date: "0",
        };
      }
      res.status(200).send(user.main_goal);
    } else {
      if (!user.daily_goal) {
        user.daily_goal = {
          calories: "< 0",
          protein: "< 0",
          fat: "< 0",
          carbs: "< 0",
        };
      }
      res.status(200).send(user.daily_goal);
    }
  } else {
    res.sendStatus(400);
  }
});

// Get the totals
apiRouter.get("/totals", (_req, res) => {
  let params = _req.url.split("?")[1].split("&");
  let username = params[0].split("=")[1];
  let date = params[1].split("=")[1];

  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user && user.log) {
    if (!user.log[date]) {
      user.log[_req.body.date] = {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      };
      res.status(201).send(user.log[date]);
    } else {
      res.status(200).send(user.log[date]);
    }
  } else {
    res.sendStatus(400);
  }
});

// Update daily totals
apiRouter.put("/totals", (_req, res) => {
  let username = _req.url.split("=")[1];
  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    let totals = user.log[_req.body.date];

    totals.calories += Number(_req.body.calories);
    totals.protein += Number(_req.body.protein);
    totals.fat += Number(_req.body.fat);
    totals.carbs += Number(_req.body.carbs);

    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Create a post
apiRouter.post("/post", (_req, res) => {
  let username = _req.url.split("=")[1];
  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    if (!user.posts) {
      user.posts = [];
    }
    user.posts.push(_req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Get all the posts
apiRouter.get("/posts", (_req, res) => {
  let username = _req.url.split("=")[1];
  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    if (!user.posts) {
      user.posts = [];
    }
    res.status(200).send(user.posts);
  } else {
    res.sendStatus(400);
  }
});

// Get profile info
apiRouter.get("/profile", (_req, res) => {
  let username = _req.url.split("=")[1];
  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    if (!user.profile) {
      user.profile = {
        biography: "No biography found!",
      };

      user.friends = [];
    }

    res.status(200).send(user.profile);
  } else {
    res.sendStatus(400);
  }
});

// Update profile
apiRouter.put("/profile", (_req, res) => {
  let username = _req.url.split("=")[1];
  let user = users.find((el) => {
    if (el.username === username) {
      return el;
    }
  });

  if (user) {
    user.profile = _req.body.profile;
    user.username = _req.body.username;
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
