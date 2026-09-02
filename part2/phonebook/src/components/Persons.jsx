const Persons = ({ person, handleDelete }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
        {"  "}
        <button onClick={() => handleDelete(person.name, person.id)}>
          DELETE
        </button>
      </p>
    </>
  )
}

export default Persons
