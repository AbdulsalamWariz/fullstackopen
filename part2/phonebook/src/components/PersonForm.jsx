const PersonForm = ({
  handleSubmit,
  newPerson,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          type='text'
          value={newPerson.name}
          onChange={handleNameChange}
        />
      </div>

      <div>
        number:
        <input
          type='tel'
          value={newPerson.number}
          onChange={handleNumberChange}
        />
      </div>

      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
