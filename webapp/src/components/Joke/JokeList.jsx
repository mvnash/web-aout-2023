import React, { useContext } from "react";
import { Context } from "../../contexts/jokeContext";
import { Link } from "react-router-dom";

const JokeList = () => {
  const { jokes } = useContext(Context);

  return (
    <div>
      <h2>Liste des blagues</h2>
      <ul>
        {jokes.map((joke) => (
          <li key={joke.id}>
          <Link to={`/jokes/${joke.id}`}>
            <p>Question: {joke.question}</p>
            <p>Answer: {joke.answer}</p>
          </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default JokeList;
