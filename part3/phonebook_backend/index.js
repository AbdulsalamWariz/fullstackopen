const express = require("express")
const morgan = require("morgan")
const app = express()

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(express.json())
// app.use(requestLogger)
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ")
  }),
)

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

const info = `
<p>Phonebook has info for ${persons.length} people</p>
<p>${new Date()}</p>
`
// const alreadyExists = name => {
//   name = persons.find(person => person.name === name)
//   console.log(name)
// }
const alreadyExists = name => {
  return !!persons.find(
    person => person.name.toLowerCase() === name.toLowerCase(),
  )
}

console.log(alreadyExists("Arto Hellas"))

app.get("/api/persons", (request, response) => {
  response.status(200).json(persons)
})

app.get("/info", (request, response) => {
  response.status(200).send(info)
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id

  const person = persons.find(person => person.id === id)

  if (!person) {
    return response.status(404).json({
      error: "Resource not found",
    })
  }
  response.status(200).json(person)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(422).json({ error: "The name or number is missing" })
  }

  if (alreadyExists(body.name)) {
    return response.status(409).json({ error: "name must be unique" })
  }

  const person = {
    id: Math.floor(Math.random() * 1000000000),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
