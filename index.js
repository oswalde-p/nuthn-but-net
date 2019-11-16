const express = require('express')
const mongoose = require('mongoose')
const ip = require('ip')

const app = express()

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT)
  }
)


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
  if (err) throw err
  console.log('db connected to ' + process.env.MONGO_URI)
})

app.get('/', (req ,res) => {
  res.status(200).send('ip: ' + ip.address())
})


const DogSchema = new mongoose.Schema({
  name: String
})

const Dog = mongoose.model('Dog', DogSchema)

app.post('/dog/:name', async (req, res) => {
  const { name } = req.params
  console.log(name)
  await Dog.create({name})
  res.sendStatus(200)
})

app.get('/dogs', async (req, res) => {
  const allDogs = await Dog.find()
  res.send(allDogs)
})
