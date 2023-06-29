import React, { Component } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';
import Section from './Section';
import css from './App.module.css';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  toAddFeedback = option => {
    this.setState(state => ({
      [option]: state[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercent = () => {
    const { good } = this.state;
    return Math.round((good / this.countTotalFeedback()) * 100) || 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const objKey = Object.keys(this.state);
    const total = this.countTotalFeedback();
    const positivePercent = this.countPositiveFeedbackPercent();
    return (
      <div className={css.test}>
        <Section title="Please leave feedback">
          <div>
            <FeedbackOptions
              options={objKey}
              onLeaveFeedback={this.toAddFeedback}
            ></FeedbackOptions>
          </div>
        </Section>
        <Section title="Statistics">
          {!total ? (
            <Notification message="No feedback given" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercent={positivePercent}
            ></Statistics>
          )}
        </Section>
      </div>
    );
  }
}
