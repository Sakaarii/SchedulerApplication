import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
const PORT = 3001

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const Event = mongoose.model("Event", new mongoose.Schema({
    name: String,
    start: Number,
    end: Number,
    day: Number,
    description: String,
    date: String,
    week: Number,
    year: Number,
    colorOne: String,
    colorTwo: String
}))

const UserData = mongoose.model("UserData", new mongoose.Schema({
    user: String,
    password: String,
    events: [Event.schema]
}))

function getUserData(user, password){
    return UserData.find({user: user, password: password})
}

function addUser(user, password){
    const userData = new UserData({user: user, password: password, events: []})
    return userData.save()
}

function addEventDatabase(user, password, name, start, end, day, description, date, week, year, colorOne, colorTwo){
    const event = new Event({name: name, start: start, end: end, day: day, description: description, date: date, week: week, year: year, colorOne: colorOne, colorTwo: colorTwo})
    return UserData.updateOne({user: user, password: password}, {$push: {events: event}})
}

function deleteEvent(user, password, name, start, end, day, description, date, week, year, colorOne, colorTwo){
    const deletedEvent = new Event({name: name, start: start, end: end, day: day, description: description, date: date, week: week, year: year, colorOne: colorOne, colorTwo: colorTwo})
    return UserData.updateOne({user: user, password: password}, {$pull: {events: {name: name, date: date}}})
}

app.get("/api/database", (req, res) => {
    getUserData(req.query.user, req.query.password).then(data => {
        console.log("User Data:", data)
        res.send(data)
    }).catch(err => {
        console.log("User Data ERROR:", err)
    })
})

app.post("/api/database", (req,res) =>{
    addUser(req.query.user, req.query.password).then(data =>{
        console.log("New User Data:", data)
        res.send(data)
    }).catch(err =>{
        console.log("New User Data ERROR", err)
    })
})

app.post("/api/database/add", (req, res) => {
    console.log(req.query)
    addEventDatabase(req.query.user, req.query.password, req.query.name, req.query.start, req.query.end, req.query.day, req.query.description, req.query.date, req.query.week, req.query.year, req.query.colorOne, req.query.colorTwo).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log("Event ADD ERROR:", err)
    })
})

app.patch("/api/database/add", (req, res) =>{
    console.log(req.query)
    deleteEvent(req.query.user, req.query.password, req.query.name, req.query.start, req.query.end, req.query.day, req.query.description, req.query.date, req.query.week, req.query.year, req.query.colorOne, req.query.colorTwo).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err =>{
        console.log("Event DELETE ERROR:", err)
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
 