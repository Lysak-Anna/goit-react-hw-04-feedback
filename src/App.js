import './App.css';
import { useState } from 'react';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stateMap = {
    good: setGood,
    neutral: setNeutral,
    bad: setBad,
  };

  function clickHandler(event) {
    const option = event.target.textContent;
    stateMap[option](prev => prev + 1);
    // switch (option) {
    //   case 'good':
    //     return setGood(good + 1);
    //   case 'neutral':
    //     return setNeutral(neutral + 1);
    //   case 'bad':
    //     return setBad(bad + 1);
    //   default:
    //     return;
    // }
  }

  function countTotalFeedback() {
    return good + neutral + bad;
  }
  function countPositiveFeedbackPercentage() {
    const total = countTotalFeedback();
    return Math.round((good * 100) / total);
  }

  return (
    <div className="App">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={clickHandler}
        />
        {countTotalFeedback === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            percentage={
              !countPositiveFeedbackPercentage()
                ? '0'
                : `${countPositiveFeedbackPercentage()}%`
            }
          />
        )}
      </Section>
    </div>
  );
}

export default App;
