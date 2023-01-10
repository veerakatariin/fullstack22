const Course = props => {
    return(
      <div>
        {props.courses.map( course => {
          return <div key = {course.id}>
            <Header/>
            <Content course={course} />
            <Total course={course} />
          </div>
        })}
      </div>
    )
  }
  
  const Header = () => (
    <h1>
      Web development curriculum
    </h1>
  )
  
  
  const Content = ({course}) => {
    return(
   <div>
    <h2>{course.name}</h2>
    <ul> 
    {course.parts.map(part =>
      <li key={course.parts.id}>
        {part.name} {part.exercises}
      </li>
      )}
  </ul>
  </div>
    )
  }
  
  
  const Total = ({course}) => {
    return(
    <h3>
      Total of  {course.parts.reduce(
        (total, part) => total + part.exercises, 0)
         } exercises
    </h3>
    )
  }
  
  export default Course