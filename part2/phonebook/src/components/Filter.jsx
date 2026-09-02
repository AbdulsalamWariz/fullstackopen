const Filter = ({ query, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type='text'
        value={query}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter
