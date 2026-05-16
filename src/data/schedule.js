const schedule = [
  {
    day: 'Thu, May 14',
    focus: 'Build the foundation',
    note: 'Main work block',
    blocks: [
      { time: '45 min', task: 'Module 0 + Module 1: AI math overview and probability basics' },
      { time: '75 min', task: 'Module 2: Bayes’ Rule, the Covid example, and calculator practice' },
      {
        time: '30 min',
        task: 'Mini-review: explain probability, prevalence, sensitivity, and specificity out loud',
      },
    ],
  },
  {
    day: 'Fri, May 15',
    focus: 'Connect the math to ML and Python',
    note: 'Main work block',
    blocks: [
      { time: '70 min', task: 'Module 3: vectors, matrices, and recommendation systems' },
      { time: '45 min', task: 'Module 4: images as numerical arrays' },
      { time: '65 min', task: 'Module 5: PCA and dimension reduction' },
      { time: '45 min', task: 'Module 6 + final quiz + one-page cheat sheet' },
    ],
  },
  {
    day: 'Sat, May 16',
    focus: 'Light review only',
    note: 'Do not cram',
    blocks: [
      { time: '30 min', task: 'Retake the final quiz without notes' },
      { time: '30 min', task: 'Review weak areas only and avoid adding new material' },
    ],
  },
]

export default schedule
