import axios from "axios"
const baseUrl = "http://localhost:3001/persons"


const update = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data)
}

update()