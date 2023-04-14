import { useState } from 'react';
const Header = (props) => {
  return <h1>{props.headers}</h1>;
};
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const Stats = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  if (all !== 0) {
    return (
      <table>
        <tbody>
          <Stats text="good" value={good} />
          <Stats text="neutral" value={neutral} />
          <Stats text="bad" value={bad} />
          <Stats text="all" value={all} />
          <Stats text="average" value={average} />
          <Stats text="positive" value={positive + ' %'} />
        </tbody>
      </table>
    );
  }
  return <div>No feedback given</div>;
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const headers = {
    hero: 'give feed back',
    statistics: 'statistics'
  };

  return (
    <div>
      <div>
        <Header headers={headers.hero} />
      </div>

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <div>
        <Header headers={headers.statistics} />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
