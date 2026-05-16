const modules = [
  {
    id: 0,
    title: 'Why Math Matters in AI',
    time: '5 min',
    theme: 'Warm-up',
    story:
      'Data Science turns real questions into math, solves the math, then translates the answer back into a decision. AI may look magical, but underneath it uses probability, statistics, vectors, matrices, and patterns in numbers.',
    idea:
      'The three pillars are: probability for uncertainty, linear algebra for representing data, and statistics for describing what the data says overall.',
    example:
      'A refugee program question like “Which clients need follow-up first?” becomes a data question: What factors increase risk, how likely is each case to need support, and what pattern do we see across past clients?',
    lab: `# Reflection lab
questions = [
    "What is one work decision I make using data?",
    "What information would help me make that decision better?"
]
for q in questions:
    print(q)`,
    checks: [
      { q: 'What does probability help us answer?', a: 'How likely something is.' },
      {
        q: 'What do vectors and matrices help us do?',
        a: 'Store and compare data as numbers.',
      },
      {
        q: 'What does statistics help us summarize?',
        a: 'Averages, spread, patterns, and what is normal or unusual.',
      },
    ],
    project:
      'Write one work question from refugee resettlement that could become a data science question.',
  },
  {
    id: 1,
    title: 'Probability Basics',
    time: '45 min',
    theme: 'Foundations',
    story:
      'Probability is the math of uncertainty. You may not know what will happen next, but you can estimate how likely it is based on possible outcomes.',
    idea:
      'P(A) = favorable outcomes / total possible outcomes. Probability ranges from 0, impossible, to 1, certain.',
    example: 'A bag has 3 red marbles and 7 blue marbles. P(red) = 3 / 10 = 0.3, or 30%.',
    lab: `import random

bag = ['red']*3 + ['blue']*7
draws = [random.choice(bag) for _ in range(10000)]
print("Empirical P(red) =", draws.count('red') / 10000)`,
    checks: [
      { q: 'A die is rolled. What is P(even)?', a: '3/6 = 0.5.' },
      { q: 'If P(A) = 0.8, what is P(not A)?', a: '0.2.' },
      {
        q: 'Why does the simulation get closer to 0.3 with more draws?',
        a: 'Because more samples usually give a more stable estimate. This is the law of large numbers.',
      },
    ],
    project:
      'Create a simple probability example using program data, such as the probability that a randomly selected client belongs to a specific program.',
  },
  {
    id: 2,
    title: 'Conditional Probability & Bayes’ Rule',
    time: '75 min',
    theme: 'Core idea',
    story:
      'Bayes’ Rule explains why our intuition can be wrong when evidence depends on context. A test can be very accurate, but a positive result may still be less certain when the condition is rare.',
    idea:
      'P(Disease | Positive) = [P(Positive | Disease) × P(Disease)] / P(Positive). The key is that false positives can overwhelm true positives when prevalence is low.',
    example:
      'In 10,000 people: 100 have Covid. With 95% sensitivity, 95 true positives appear. Of 9,900 healthy people, 5% false positive gives 495 false positives. So P(Covid | Positive) = 95 / 590 ≈ 16.1%.',
    lab: `def bayes_disease(prevalence, sensitivity, specificity):
    p_pos_given_disease = sensitivity
    p_pos_given_healthy = 1 - specificity
    p_pos = p_pos_given_disease * prevalence + p_pos_given_healthy * (1 - prevalence)
    return (p_pos_given_disease * prevalence) / p_pos

print(bayes_disease(0.01, 0.95, 0.95))
print(bayes_disease(0.10, 0.95, 0.95))
print(bayes_disease(0.01, 0.95, 0.99))`,
    checks: [
      { q: 'With 99% specificity and 1% prevalence, what is P(Disease | Positive)?', a: 'About 49%.' },
      { q: 'Why does retesting work?', a: 'The first positive raises the prior probability, so the second test starts with stronger evidence.' },
      {
        q: 'Why is 95% not the answer in the Covid example?',
        a: 'Because specificity and prevalence matter. Many healthy people can produce false positives.',
      },
    ],
    project:
      'Use the Bayes calculator in this app and compare how the result changes when prevalence moves from 1% to 10%.',
  },
  {
    id: 3,
    title: 'Vectors, Matrices & Recommendations',
    time: '70 min',
    theme: 'Data as structure',
    story:
      'A recommendation system stores users and items as numbers. Each row might be a user, each column might be a movie, service, or product, and each cell stores a rating or interaction.',
    idea:
      'A vector is an ordered list of numbers. A matrix is a grid of numbers. Machine learning models compare rows, columns, and patterns inside the grid.',
    example:
      'A user-item matrix can predict missing ratings by comparing user averages and item averages. Simple methods use averages; stronger methods use similarity and factorization.',
    lab: `import numpy as np

R = np.array([
    [5,2,1,4,1],
    [4,0,1,3,3],
    [3,3,2,0,4],
    [2,1,2,2,5],
    [5,3,0,4,3],
])

a = np.array([row[row > 0].mean() for row in R])
b = np.array([R[:, j][R[:, j] > 0].mean() for j in range(R.shape[1])])

pred = (a[1] + b[1]) / 2
print("User averages:", a)
print("Item averages:", b)
print("Predicted rating:", round(pred, 2))`,
    checks: [
      { q: 'What is the shape of the matrix in the lab?', a: '5 × 5.' },
      { q: 'If you add a 6th movie, do you add a row or a column?', a: 'A column.' },
      {
        q: 'Why is average of averages limited?',
        a: 'It ignores deeper similarity between users and items.',
      },
    ],
    project:
      'Create a tiny matrix where rows are clients and columns are service needs. Mark 1 for received and 0 for not received, then think about what patterns might matter.',
  },
  {
    id: 4,
    title: 'Images as Numbers',
    time: '45 min',
    theme: 'Computer vision',
    story:
      'A computer does not see a picture the way humans do. It sees a grid of numbers. Each number describes brightness or color intensity.',
    idea:
      'A grayscale image is a matrix. A color image has three matrices: red, green, and blue. A 128 × 128 RGB image has 128 × 128 × 3 = 49,152 numbers.',
    example:
      'A white pixel is 255, a black pixel is 0, and gray values fall between them. Machine learning learns visual patterns from those numerical grids.',
    lab: `import numpy as np
import matplotlib.pyplot as plt

img = np.random.randint(0, 256, size=(8, 8))
plt.imshow(img, cmap='gray', vmin=0, vmax=255)
plt.show()
print(img)`,
    checks: [
      { q: 'How many numbers describe a 28 × 28 MNIST digit?', a: '784.' },
      { q: 'What value is pure white in an 8-bit image?', a: '255.' },
      {
        q: 'Why is it useful that images are numbers?',
        a: 'Because models can compare, transform, and learn from numbers.',
      },
    ],
    project:
      'Think of a scanned handwritten van log. Explain why OCR is hard when handwriting changes the pixel patterns.',
  },
  {
    id: 5,
    title: 'Dimension Reduction & PCA',
    time: '65 min',
    theme: 'Signal vs noise',
    story:
      'Many datasets contain repeated, noisy, or low-value details. Dimension reduction keeps the most informative parts while dropping some of the noise.',
    idea:
      'PCA keeps directions of maximum variance. Variance means the places where the data changes most, which often carry the strongest signal.',
    example:
      'A digit image can be reduced from 784 numbers to fewer components and still look recognizable. The trade-off is that less detail means a blurrier reconstruction.',
    lab: `from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

digits = load_digits()
X = digits.data

pca = PCA(n_components=10).fit(X)
print("Variance kept:", pca.explained_variance_ratio_.sum())

X_reduced = pca.transform(X)
X_back = pca.inverse_transform(X_reduced)

plt.imshow(X_back[0].reshape(8, 8), cmap='gray')
plt.title('Reconstructed from 10 dimensions')
plt.show()`,
    checks: [
      {
        q: 'If you reduce 784 dimensions to 50, what happens?',
        a: 'You keep only 50 features and remove about 93.6% of the original dimensions.',
      },
      { q: 'PCA keeps directions of maximum what?', a: 'Variance.' },
      { q: 'What is the main trade-off?', a: 'Less complexity, but some detail is lost.' },
    ],
    project:
      'Pick a large spreadsheet and identify which columns may be redundant, rarely used, or low-value for decision-making.',
  },
  {
    id: 6,
    title: 'Putting It All Together',
    time: '45 min',
    theme: 'Review',
    story:
      'The goal is not to become a mathematician overnight. The goal is to recognize the math ideas when they appear in AI, Python, dashboards, and decision systems.',
    idea:
      'Probability supports decisions under uncertainty. Vectors and matrices represent data. Statistics summarizes patterns. Dimension reduction keeps the signal and drops noise.',
    example:
      'A practical AI workflow starts with a real question, turns it into data, uses math to find a pattern, then returns to the real world as a recommendation, alert, forecast, or decision support tool.',
    lab: `skills = ["Probability", "Bayes", "Matrices", "Images", "PCA"]
for skill in skills:
    print(f"I can explain the basic idea of {skill} and where it appears in AI.")`,
    checks: [
      { q: 'Which idea helps with uncertainty?', a: 'Probability.' },
      {
        q: 'Which idea represents users, images, text, or ratings as numbers?',
        a: 'Vectors and matrices.',
      },
      {
        q: 'Which idea keeps signal while reducing complexity?',
        a: 'Dimension reduction / PCA.',
      },
    ],
    project:
      'Create a one-page cheat sheet with the four lenses: probability, matrices, statistics, and dimension reduction.',
  },
]

export default modules
