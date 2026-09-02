import Part from "./Part"

const Content = ({ parts }) => (
  <div>
    {parts.map((p) => (
      <Part
        key={p.id}
        name={p.name}
        exercises={p.exercises}
      />
    ))}
  </div>
)

export default Content
