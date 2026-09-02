import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad, all }) => {
  const average = (good * 1 + bad * -1) / all
  const positive = (good / all) * 100
  if (all > 0) {
    return (
      <div>
        <StatisticLine
          text='good'
          value={good}
        />
        <StatisticLine
          text='neutral'
          value={neutral}
        />
        <StatisticLine
          text='bad'
          value={bad}
        />
        <StatisticLine
          text='all'
          value={all}
        />
        <StatisticLine
          text='average'
          value={all && average}
        />
        <StatisticLine
          text='positive'
          value={all && `${positive}%`}
        />
      </div>
    )
  } else {
    return <p>No feedback given</p>
  }
}

export default Statistics
