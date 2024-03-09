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
  let user = users.find((el) => {
    if (el.username === _req.body.username) {
      return el;
    }
  });

  if (!user) {
    res.sendStatus(400);
  } else if (_req.body.password === user.password) {
    res.status(200).send({ username: user.username, auth: "1234" });
  } else {
    res.sendStatus(400);
  }
});

// Get User
apiRouter.get("/user/*", (_req, res) => {
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

  if (user && user.meals) {
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
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
