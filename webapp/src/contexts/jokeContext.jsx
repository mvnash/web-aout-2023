import React, { useEffect, useState } from "react";
import jokeService from "../services/jokeApi";
import scoreService from "../services/scoreApi";

const Context = React.createContext(null);

const ProviderWrapper = ({ children }) => {
  const [jokes, setJokes] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    scoreService.getAllScores().then((allScores) => {
      setScores(allScores);
    });

    jokeService.getAllJokes().then((allJokes) => {
      setJokes(allJokes);
    });
  }, []);

  const getJokesWithScores = () => {
    const jokesWithScores = jokes.map((joke) => {
      const jokeScores = scores.filter((score) => score.joke === joke.id);
      const scoreCount = jokeScores.length;
      const totalScore = jokeScores.reduce(
        (sum, score) => sum + score.score,
        0
      );
      const averageScore =
        scoreCount > 0 ? parseFloat((totalScore / scoreCount).toFixed(1)) : 0;

      return {
        ...joke,
        scoreCount,
        averageScore,
      };
    });

    return jokesWithScores;
  };

  const addScoreToJoke = (id, username, newScore) => {
    const newScores = scores.concat({
      username: username,
      date: new Date().toISOString(),
      score: newScore, 
      joke: id, 
    });

    setScores(newScores);
  };

  const getJokeWithScores = (jokeId) => {
    const joke = jokes.find((joke) => joke.id === jokeId);

    if (!joke) {
        return null;
    }

    const jokeScores = scores.filter((score) => score.joke === jokeId);

    const scoreCount = jokeScores.length;
    const averageScore =
        scoreCount > 0
            ? jokeScores.reduce((acc, score) => acc + score.score, 0) / scoreCount
            : 0;

    return {
        question: joke.question,
        answer: joke.answer,
        category: joke.category,
        id: joke.id,
        scores: jokeScores,
        scoreCount,
        averageScore,
    };
};

  const exposedValue = {
    jokes: getJokesWithScores(),
    scores,
    getJokeWithScores,
    addScoreToJoke,
  };

  return <Context.Provider value={exposedValue}>{children}</Context.Provider>;
};

export { Context, ProviderWrapper };
