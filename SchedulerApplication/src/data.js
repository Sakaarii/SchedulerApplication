import axios from 'axios';

export const getEvents = async (user, password) => {
    const data = {
        user: user,
        password: password
    }
    const response = await axios.get('http://localhost:3001/api/database', {params: data});
    return response.data;
}

export const addNewUser = async (user, password) =>{
    const datas = {
        user: user,
        password: password
    }
    const response = await axios.post("http://localhost:3001/api/database", null, {params: datas})
    return response.data
}

export const deleteEventFromDatabase = async (user, password, name, start, end, day, description, colorOne, colorTwo, week, year, date) =>{
    const data = {
        user: user, password: password, name: name, start: start, end: end, day: day, description: description, colorOne: colorOne, colorTwo: colorTwo, week: week, year: year, date: date
    }
    const response = await axios.patch("http://localhost:3001/api/database/add", null, {params: data})
    return response.data
}

export const addEventDatabase = async (user, password, name, start, end, day, description, colorOne, colorTwo, week, year, date) => {
    const data = {
        user: user, password: password, name: name, start: start, end: end, day: day, description: description, colorOne: colorOne, colorTwo: colorTwo, week: week, year: year, date: date
    }
    const response = await axios.post('http://localhost:3001/api/database/add',null, {params: data});
    return response.data;
    }
