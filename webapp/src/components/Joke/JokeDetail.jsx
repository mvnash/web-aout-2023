import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../contexts/jokeContext";

const JokeDetail = () => {
  const { id } = useParams();
  const { getJokeWithScores, addScoreToJoke } = useContext(Context);
  const joke = getJokeWithScores(id);

  const [newScore, setNewScore] = useState("");
  const [username, setUsername] = useState("");

  const handleScoreChange = (e) => {
    setNewScore(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmitScore = (e) => {
    e.preventDefault();
    addScoreToJoke(id, username, parseInt(newScore));
    setNewScore("");
    setUsername("");
  };

  return (
    <div>
      <h2>Détails de la blague</h2>
      <p>Question: {joke.question}</p>
      <p>Réponse: {joke.answer}</p>
      <p>Category: {joke.category}</p>
      <p>Score moyen: {joke.averageScore}</p>
      <p>Nombre de scores: {joke.scoreCount}</p>

      {/* Afficher la liste des scores */}
      {joke.scores.length > 0 && (
        <div>
          <h3>Liste des scores :</h3>
          <ul>
            {joke.scores.map((score) => (
              <li key={score.id}>
                <p>Utilisateur: {score.username}</p>
                <p>Date: {score.date}</p>
                <p>Score: {score.score}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3>Ajouter un score :</h3>
      <form onSubmit={handleSubmitScore}>
        <label>
          Utilisateur:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Score:
          <input type="number" min={0} max={10} value={newScore} onChange={handleScoreChange} />
        </label>
        <button type="submit">Ajouter le score</button>
      </form>
    </div>
  );
};

export default JokeDetail;
