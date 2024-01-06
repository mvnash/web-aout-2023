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
      score: newScore, // Assurez-vous d'utiliser la bonne propriété pour la valeur du score
      joke: id, // Assurez-vous d'utiliser la bonne propriété pour l'ID de la blague
    });

    setScores(newScores);
  };

  const getJokeWithScores = (id) => {
    const selectedJoke = getJokesWithScores().find((joke) => joke.id === id);
    const jokeScores = scores.filter((score) => score.joke === id);
    
    // Trier d'abord par score décroissants
    jokeScores.sort((a, b) => b.value - a.value);

    // Ensuite, trier par date la plus récente en cas d'égalité de score
    jokeScores.sort((a, b) => {
      if (a.value === b.value) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0; // Le tri par score a déjà été effectué
    });

    return {
      ...selectedJoke,
      scores: jokeScores,
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
