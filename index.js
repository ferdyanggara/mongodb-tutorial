require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const User = require('./models/User')


const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
    console.log('connected to mongodb');  
    app.listen(5000,()=>{
      'connected to 5000'
    })
  } catch (err) {
    console.log('error:' ,err.message);
  }
}

connectToMongo();

app.get('/add-user', async(req,res)=>{
  const newUser = new User({
    name: 'jonathan',
    age: 19, 
  })
  const result = await newUser.save();
  res.send(result)
})

app.get('/all-users', async(req,res)=>{
  const allUser = await User.find()
  res.send(allUser)
})
app.get('/del-users', async(req,res)=>{
  const deleteUser = await User.findByIdAndDelete('6007dba5a28db873f2d8e7f7')
  res.send(deleteUser)
})


