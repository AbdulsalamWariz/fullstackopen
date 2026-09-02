import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ courses }) => {
  // <div>
  //         <Header course={c} />
  //         <Content parts={c.parts} />
  //         <Total parts={c.parts} />
  //       </div>
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  )
}

export default Course
