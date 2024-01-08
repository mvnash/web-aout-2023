import axios from "axios";

const baseUrl = 'http://localhost:3001/api/scores';


const addOneScore = (score) => axios.post(`${baseUrl}`, score).then(response => response.data);

const getAllScores = () => axios.get(`${baseUrl}`).then(response => response.data);

const scoreApi = { addOneScore, getAllScores };

export default scoreApi;