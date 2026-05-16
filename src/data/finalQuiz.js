const finalQuiz = [
  {
    q: 'A test has 90% sensitivity, 95% specificity, and 2% prevalence. What is P(Disease | Positive)?',
    a: 'About 27%. Use the Bayes calculator to verify.',
  },
  { q: 'In a user-item matrix, what does each row typically represent?', a: 'One user.' },
  { q: 'A 64 × 64 RGB image is how many numbers?', a: '64 × 64 × 3 = 12,288.' },
  {
    q: 'Why does Bayes’ Rule give non-intuitive results for rare diseases?',
    a: 'Because false positives from the much larger healthy group can swamp true positives.',
  },
  { q: 'PCA keeps directions of maximum ____.', a: 'Variance.' },
  { q: 'If prevalence doubles, does P(Disease | Positive) usually go up or down?', a: 'Up.' },
  {
    q: 'Name one real-world AI system that uses Bayes-like reasoning.',
    a: 'Spam filter, fraud detection, medical diagnosis, or Naive Bayes classifier.',
  },
]

export default finalQuiz
