import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/jokeContext";
import scoreService from "../../services/scoreApi";
import { Button, Checkbox, Form, Input } from "antd";
const JokePage = () => {
  const { id } = useParams(); // joke id
  const { getJokeWithScores } = useContext(Context);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [jokeWithScores, setJokeWithScores] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      try {
        // Check if id is available before fetching the joke data

        const jokeData = getJokeWithScores(id);
        setJokeWithScores(jokeData);
      } catch (error) {
        console.error("Error fetching joke:", error.message);
      }
    };

    fetchData();
  }, [id, getJokeWithScores]);

  const addScore = async (score) => {
    try {
      // Call your scoreApi service to add a score
      await scoreService.addOneScore(score);
      // Update jokeWithScores with the new data
    } catch (error) {
      console.error("Error adding score:", error.message);
      throw error;
    }
  };
  const handleAddScore = (values) => {
    try {
      // Validate inputs

      // Add date and joke ID to the new score
      const currentDate = new Date().toISOString();
      const scoreToAdd = {
        username: values.username,
        score: values.score,
        date: currentDate,
        joke: id,
      };

      addScore(scoreToAdd);

      // Update jokeWithScores with the new data
      setJokeWithScores((prevJokeWithScores) => {
        if (!prevJokeWithScores) {
          return null;
        }
        return {
          ...prevJokeWithScores,
          scores: [...prevJokeWithScores.scores, scoreToAdd],
        };
      });
      // Reset form fields
      form.resetFields();
    } catch (error) {
      console.error("Error adding score:", error.message);
    }
  };

  return (
    <div>
      <h2>Joke Detail</h2>
      {jokeWithScores && jokeWithScores ? (
        <>
          <h3>{`Question: ${jokeWithScores.question}`}</h3>
          <p>{`Answer: ${jokeWithScores.answer}`}</p>
          <p>{`Category: ${jokeWithScores.category}`}</p>
          <p>{`Average Score: ${jokeWithScores.averageScore}`}</p>
          <p>{`Score Count: ${jokeWithScores.scoreCount}`}</p>
          <p>{`joke id: ${jokeWithScores.id}`}</p>
          <ul>
            {jokeWithScores.scores.map((score) => (
              <li key={score.id}>{`${score.username} - ${score.score}`}</li>
            ))}
          </ul>
          <div>
            <Form form={form} onFinish={handleAddScore}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input an author",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Score"
                name="score"
                rules={[
                  {
                    required: true,
                    message: "Please input an author",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      ) : (
        // Handle case when joke is not found
        <p>Joke not found.</p>
      )}
    </div>
  );
};

export default JokePage;
