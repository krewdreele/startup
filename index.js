const express = require("express");
const app = express();

let users = [{ username: "admin", password: "h" }];

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
    login (post/auth)
    get user (get/user)

    create meal & update meal (post/meal?user='username')
    get all meals (get/meals?user='username')
    get meal info (get/meal?user='username'&meal='meal name')

    save main or daily goal (post/goal?user='username'&type='goal type')
    get main or daily goal info (get/goal?user='username'&type='goal type')

    get totals for a specific day(get/totals?user='username'&date='1/2/2024')
    update daily totals (put/totals?user='username')

    create a post (post/post?user='username')
    get all posts (get/posts?user='username')
    get profile info (get/profile?user='username')
    update profile (put/profile?user='username')
*/

// Create Account
apiRouter.post("/user", (_req, res) => {
  users.push(_req.body);
  res.status(200).send();
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
      let date = new Date();
      let date_str = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
      user.log = {};
      user.log[date_str] = {
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
    if (user.log[date]) {
      res.status(200).send(user.log[date]);
    } else {
      res.sendStatus(201);
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
    if (!user.log) {
      let date = new Date();
      let date_str = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
      user.log = {};
      user.log[date_str] = {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      };
    }
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
