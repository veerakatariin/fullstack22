import { render } from '@testing-library/react'
import React, { useState } from 'react'

const Button = ({handleClick, text}) => (    
  <button onClick = {handleClick}> 
   {text}
  </button>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)   
  const [all, setAll] = useState(0) 
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage(average + 1); 
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setAverage(average); 

  };

  const handleBadClick = () => {
    setBad(bad + 1);    
    setAll(all + 1);
    setAverage(average - 1);
  };

  return(
    <div>
       <h1>give feedback</h1>

      <Button handleClick = {handleNeutralClick} text = 'neutral' > </Button>
      <Button handleClick = {handleBadClick} text = 'bad' > </Button>
      <Button handleClick = {handleGoodClick} text = 'good' > </Button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}/>
        
    </div>
  )
}

const Statistics = ({good, neutral, bad, all, average}) => {

  if(all < 1){
    return(
      <div>
        <p> No feedback given </p>
      </div>
    )
  } else{
    return(
      <div>
        <table>
          <tbody>
      <StatisticLine text='good' value = {good} />
      <StatisticLine text='neutral' value = {neutral} />
      <StatisticLine text='bad' value = {bad} />
      <StatisticLine text='all' value = {all} />
      <StatisticLine text='average' value = {average/all} />
      <StatisticLine text='positive' value ={ (good*100)/all + '%'}  />
          </tbody>   
       </table>  
      </div>
    )
  }
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td> {text} </td>
      <td> {value}</td>
    </tr>
  )
}

export default App
