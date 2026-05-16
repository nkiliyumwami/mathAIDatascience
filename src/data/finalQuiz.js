const finalQuiz = [
  {
    q: 'A test has 90% sensitivity, 95% specificity, and prevalence 2%. What is P(Disease | Positive)?',
    a: 'About 27%. The exact Bayes calculation is (0.90 × 0.02) / ((0.90 × 0.02) + (0.05 × 0.98)) ≈ 0.269.',
  },
  {
    q: 'In a user-item matrix, what does each row typically represent?',
    a: 'One user’s ratings or interactions.',
  },
  { q: 'A 64 × 64 RGB image is how many numbers?', a: '64 × 64 × 3 = 12,288.' },
  {
    q: 'Why does Bayes’ Rule give a non-intuitive result for rare diseases?',
    a: 'Because there are many more healthy people than sick people, so even a small false-positive rate can swamp the true positives.',
  },
  { q: 'PCA keeps directions of maximum ____.', a: 'Variance.' },
  {
    q: 'If you double the prevalence, does P(Disease | Positive) usually go up or down?',
    a: 'Up. A positive result becomes more believable when the condition is more common to begin with.',
  },
  {
    q: 'Name one real-world AI system that secretly uses Bayes-like reasoning.',
    a: 'Spam filters, fraud detection, medical diagnosis, and Naive Bayes classifiers are all valid answers.',
  },
]

export default finalQuiz
