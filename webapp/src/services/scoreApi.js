import axios from "axios";

const baseUrl = 'http://localhost:3001/api/scores';


const addOneScore = async (score) => {
    const postHeader = {
      headers: {
        'Content-Type': 'application/json',
      }
      
    }
    const request = axios.post(baseUrl, score, postHeader)
    try {
        const response = await request;
        return response.data[0];
    } catch (error) {
        console.log('fail :', error);
    }
  }

  

const getAllScores = () => {
    const request = axios.get(baseUrl)
    return request
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log('fail :', error)
        })
}


export default { addOneScore, getAllScores }