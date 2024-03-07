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
    login (get/auth)
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

// GetScores
apiRouter.get("/scores", (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post("/score", (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
