const router = require("express").Router();
const Score = require("../models/score");
const NotFoundError = require("../utils/NotFoundError");

// Read all
router.get("/", (req, res, next) => {
  Score.find({})
    .then((scores) => res.json(scores))
    .catch((err) => next(err));
});

// Create one
router.post("/", async (req, res, next) => {
  const body = req.body;
  // Check body
  const errorMessages = [];
  if (!body.username || body.username.length < 3) errorMessages.push("username must be present and should be at least 3 char");
  if (!body.date) errorMessages.push("date must be present");
  if (!body.score) errorMessages.push("score must be present");
  if (!body.joke) {
    errorMessages.push("joke must be present");
  } else {
    // Check if the associated joke exists in the database
    try {
      const existingJoke = Joke.findById(body.joke);
      if (!existingJoke) {
        errorMessages.push(
          "The associated joke does not exist in the database"
        );
        res.status(409).json({ errorMessages });
        return;
      }
    } catch (err) {
      next(err);
      return;
    }

    // Check if the user has already given a score to this joke
    try {
      const existingScore = await Score.findOne({
        username: body.username,
        joke: body.joke,
      });
      if (existingScore) {
        errorMessages.push("The user has already given a score to this joke");
        res.status(401).json({ errorMessages });
        return;
      }
    } catch (err) {
      next(err);
      return;
    }
  }

  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages });
    return;
  }

  // Insert
  const score = new Score(body);
  score
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
