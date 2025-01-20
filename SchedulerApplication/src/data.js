import mongoose from 'mongoose';

const URL = "mongodb+srv://samuelpaunonenn:pitsapepperoni@cluster0.mhu9ulf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})

const Event = mongoose.model("Event", {
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
})

const UserData = mongoose.model("UserData", {
    user: String,
    password: String,
    events: [Event]
})

export function getUserData(user, password){
    return UserData.find({user: user, password: password})
}

export function addUser(user, password){
    const userData = new UserData({user: user, password: password, events: []})
    return userData.save()
}

export function addEventDatabase(user, password, name, start, end, day, description, date, week, year, colorOne, colorTwo){
    const event = new Event({user: user, password: password, name: name, start: start, end: end, day: day, description: description, date: date, week: week, year: year, colorOne: colorOne, colorTwo: colorTwo})
    return UserData.updateOne({user: user, password: password}, {$push: {events: event}})
}

export function deleteEvent(user, password, name, start, end, day, description, date, week, year, colorOne, colorTwo){
    const deletedEvent = new Event({user: user, password: password, name: name, start: start, end: end, day: day, description: description, date: date, week: week, year: year, colorOne: colorOne, colorTwo: colorTwo})
    return UserData.updateOne({user: user, password: password}, {$pull: {events: deletedEvent}})
}

