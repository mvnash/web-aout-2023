const router = require("express").Router();
const Joke = require("../models/joke");
const NotFoundError = require("../utils/NotFoundError");

// Read all
router.get("/", (req, res, next) => {
  Joke.find({})
    .then((jokes) => res.json(jokes))
    .catch((err) => next(err));
});

// Read by ID
router.get("/:id", (req, res, next) => {
  Joke.findById(req.params.id)
    .then((joke) => {
      if (joke) {
        res.json(joke);
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => next(err));
});

// Delete one
router.delete("/:id", (req, res, next) => {
  Joke.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        throw new NotFoundError();
      }
    })
    .catch((err) => next(err));
});

// Create one
router.post("/", (req, res, next) => {
  const body = req.body;
  // Check body
  const errorMessages = [];
  if (!body.question || body.question.length < 3) errorMessages.push("question must be presen and should be at least 3 char");
  if (!body.answer || body.answer.length < 3) errorMessages.push("answer must be present and should be at least 3 char");
  if (!body.category || body.category.length < 3) errorMessages.push("category must be present and should be at least 3 char");
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages });
    return;
  }

  // Insert
  const joke = new Joke(body);
  joke
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
