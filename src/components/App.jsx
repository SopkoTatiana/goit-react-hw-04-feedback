import { useState } from 'react';
import FeedbackOptions from './FeedbacksOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = { good, neutral, bad };

  const feedbackHeandler = ({ currentTarget: { name } }) => {
    switch (name) {
      case 'good':
        setGood(good + 1);
        break;

      case 'neutral':
        setNeutral(neutral + 1);
        break;

      case 'bad':
        setBad(bad + 1);
        break;

      default:
        break;
    }
  };

  const total = () =>
    Object.values(options).reduce((acc, value) => (acc += value), 0);

  const positivePersentage = () => Math.round((good / total()) * 100);

  return (
    <>
      <h1>Please leave feedback</h1>
      <FeedbackOptions
        options={Object.keys(options)}
        onLeaveFeedback={feedbackHeandler}
      />
      <h2>Statistic</h2>
      {total() > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total()}
          positivePersentage={positivePersentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
}
