import axios from "axios";

const baseUrl = "http://localhost:3001/api/jokes";


const addOneJoke = (joke) => axios.post(`${baseUrl}`, joke).then(response => response.data);

const getAllJokes = () => axios.get(`${baseUrl}`).then(response => response.data);

const getOneJoke = (id) => axios.get(`${baseUrl}/${id}`).then(response => response.data);

const deleteOneJoke = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data);


const jokeApi = { addOneJoke, getAllJokes, getOneJoke, deleteOneJoke };

export default jokeApi;
