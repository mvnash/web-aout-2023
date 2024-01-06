const mongoose = require('mongoose')



// Define Schema
const scoreSchema = new mongoose.Schema({
    username: String,
    date: Date,
    score: Number,
    joke: mongoose.Schema.Types.ObjectId,
})

scoreSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



// Export model
module.exports = mongoose.model('Score', scoreSchema)
