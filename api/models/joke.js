const mongoose = require('mongoose')



// Define Schema
const jokeSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String,
})

jokeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



// Export model
module.exports = mongoose.model('Joke', jokeSchema)
