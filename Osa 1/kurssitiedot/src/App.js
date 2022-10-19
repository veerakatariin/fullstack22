import React from 'react'

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }

    return (
    <div>
      <Header course = {course.name} />
      
      < Content course = {course}  />
      < Total course = {course} />
    </div>
  )
}

export default App

const Header = props => {
  return (
  <div>
    <h1>
      {props.course};
    </h1>
  </div>
  )
}

const Content = props => {
    return (
      <div>
        <Part part = {props.course.parts[0]} />
        <Part part = {props.course.parts[1]} />
        <Part part = {props.course.parts[2]} />
      </div>
    );
  };

  const Part = props => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };

const Total = props => {
  return (
<div>
  <p> Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
</div>
  )
}