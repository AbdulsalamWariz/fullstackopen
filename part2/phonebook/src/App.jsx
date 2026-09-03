import { useEffect, useState } from "react"
import personService from "./services/persons"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Success from "./components/Success"
import Error from "./components/Error"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
    id: persons.length + 1,
  })
  const [query, setQuery] = useState("")
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    if (!!checkIfAdded) {
      updatePerson(checkIfAdded)
    } else {
      addNewPerson()
    }
    setNewPerson({ ...newPerson, name: "", number: "" })
  }

  const addNewPerson = () => {
    const newContact = {
      name: newPerson.name,
      number: newPerson.number,
      id: newPerson.id,
    }
    personService.addPerson(newContact).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      notify("success", "Added", returnedPerson.name)
    })
  }

  const handleNameChange = event => {
    const updatedName = event.target.value
    setNewPerson({ ...newPerson, name: updatedName })
  }

  const handleNumberChange = event => {
    const updatedNumber = event.target.value
    setNewPerson({ ...newPerson, number: updatedNumber })
  }

  const checkIfAdded = persons.find(p => p.name === newPerson.name)

  const updatePerson = checkedPerson => {
    let verify = confirm(
      `${checkedPerson.name} is Already added to the phonebook, replace the old number with a new one?`,
    )
    if (verify) {
      personService
        .update(checkedPerson.id, newPerson)
        .then(res => {
          setPersons(persons.map(p => (p.id === checkedPerson.id ? res : p)))
          notify("Updated", res.name)
        })
        .catch(error => {
          notify("error", "None", checkedPerson.name)
        })
    }
  }

  const handleFilterChange = event => setQuery(event.target.value)

  const filtered = persons.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  )

  const handleDelete = (name, id) => {
    console.log(persons)
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(deletedObject => {
        let filtered = persons.filter(p => p.id !== id)
        setPersons(filtered)
        console.log(filtered)
      })
    } else {
      return
    }
  }

  const notify = (type, operation, name) => {
    if (type === "success") {
      setSuccess(`${operation} ${name}`)
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } else {
      setError(`Information of ${name} has been removed from the server`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={success} />
      <Error message={error} />
      <Filter query={query} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        handleSubmit={handleSubmit}
        newPerson={newPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {filtered.map(person => (
        <Persons key={person.id} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  )
}

export default App
