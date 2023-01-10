import axios from "axios";

const url = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(url)
}

const deletePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const addPerson = (newObject) => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    getPersons()
    return request.then(response => response.data)
}


export default{
    getPersons: getPersons,
    deletePerson: deletePerson,
    addPerson: addPerson,
    updatePerson, updatePerson
}
