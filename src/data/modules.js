const modules = [
  {
    id: 0,
    title: 'Why Math Matters in AI',
    time: '5 min',
    theme: 'Warm-up',
    story: [
      'Data Science turns business or program questions into math, solves the math, then translates the answer back into a decision. AI may look magical, but underneath it uses probability, statistics, vectors, matrices, and patterns in numbers.',
      'You do not need to be a math person to start. You need to be a curious person who is willing to connect real questions to numbers and run small Python experiments.',
    ],
    idea: [
      'The three pillars you will keep meeting are probability, linear algebra, and statistics.',
      'Probability asks “How likely?” and powers Bayes Rule, spam filters, medical tests, recommendations, and many decision systems.',
      'Linear algebra gives us vectors and matrices so we can store users, movies, images, and text as numbers. Statistics helps us summarize what the data says on average, how much it varies, and what looks normal or unusual.',
    ],
    example: [
      'A refugee program question like “Which clients need follow-up first?” becomes a data question: What factors increase risk, how likely is each case to need support, and what pattern do we see across past clients?',
      'That is the core loop of applied AI: take a human problem, represent it with data, use math to reason about it, then turn the result back into action.',
    ],
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
    story: [
      'You toss a coin. Will it land heads? You do not know, but you know it is about 50/50. That “about 50/50” feeling is probability.',
      'Probability is the math of uncertainty. You may not know what will happen next, but you can estimate how likely it is based on possible outcomes.',
    ],
    idea: [
      'Probability of event A is P(A) = favorable outcomes / total possible outcomes.',
      'It is always between 0, meaning impossible, and 1, meaning certain.',
    ],
    example: [
      'A bag has 3 red marbles and 7 blue marbles. P(red) = 3 / (3 + 7) = 3 / 10 = 0.3 = 30%.',
      'The point is not just to compute the number. The point is to translate a situation into outcomes and then describe uncertainty clearly.',
    ],
    lab: `import random

bag = ['red'] * 3 + ['blue'] * 7
draws = [random.choice(bag) for _ in range(10000)]
print("Empirical P(red) =", draws.count('red') / 10000)  # ~0.3`,
    checks: [
      { q: 'A die is rolled. What is P(even)?', a: '3/6 = 0.5.' },
      { q: 'If P(A) = 0.8, what is P(not A)?', a: '0.2.' },
      {
        q: 'Run the code with 100 draws then 100,000 draws. Why does the answer get closer to 0.3?',
        a: 'Because of the law of large numbers: more samples usually give a more accurate and stable estimate.',
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
    story: [
      'This is the centerpiece of the course. A Covid test is 95% accurate. You test positive. What is the chance you actually have Covid?',
      'Most people guess 95%. The real answer is around 16%. Bayes’ Rule explains why intuition breaks when evidence depends on context.',
    ],
    idea: [
      'Conditional probability P(A | B) means “the probability of A given that B happened.”',
      'Bayes’ Rule says P(Disease | Positive) = [P(Positive | Disease) × P(Disease)] / P(Positive).',
      'The three ingredients are sensitivity, specificity, and prevalence. Sensitivity is P(Positive | Disease). Specificity is P(Negative | No Disease). Prevalence is P(Disease) before testing.',
      'When prevalence is low, false positives from the much larger healthy population can overwhelm the true positives.',
    ],
    example: [
      'Take 10,000 people. If prevalence is 1%, then 100 people actually have Covid and 9,900 do not.',
      'With 95% sensitivity, 95 of the 100 true cases test positive.',
      'With 95% specificity, 5% of the 9,900 healthy people test positive by mistake. That gives 495 false positives.',
      'Total positives = 95 + 495 = 590. Of those 590 positives, only 95 truly have Covid, so P(Covid | Positive) = 95 / 590 ≈ 16.1%.',
    ],
    deepDive: [
      'How do we improve tests in practice? Test only symptomatic people, because that raises prevalence in the tested group and pushes the posterior probability up.',
      'Retest positives. After the first positive, your posterior becomes the new prior, so the second test starts from much stronger evidence.',
      'Increase specificity. In rare-disease settings, cutting false positives has an enormous effect.',
      'This is exactly why Bayes-like reasoning appears in spam filters, fraud detection, and medical AI.',
    ],
    lab: `def bayes_disease(prevalence, sensitivity, specificity):
    p_pos_given_disease = sensitivity
    p_pos_given_healthy = 1 - specificity
    p_pos = p_pos_given_disease * prevalence + p_pos_given_healthy * (1 - prevalence)
    return (p_pos_given_disease * prevalence) / p_pos

print(bayes_disease(0.01, 0.95, 0.95))  # ~0.161 -> Covid scenario
print(bayes_disease(0.10, 0.95, 0.95))  # ~0.679 -> if prevalence rises to 10%
print(bayes_disease(0.01, 0.95, 0.99))  # ~0.490 -> better specificity helps a lot`,
    checks: [
      {
        q: 'If the test had 99% specificity and 1% prevalence, what is P(Disease | Positive)?',
        a: 'About 49%. Better specificity cuts false positives dramatically.',
      },
      {
        q: 'Why does retesting work?',
        a: 'After the first positive, your prior is no longer 1%. The posterior from the first test becomes the new prior, so a second positive is much more convincing.',
      },
      {
        q: 'Why is 95% not the answer in the Covid example?',
        a: 'Because sensitivity alone is not enough. Prevalence and specificity matter, and a large healthy population can generate many false positives.',
      },
    ],
    project:
      'Recreate the Bayes Rule Covid calculation in Python and verify the result is about 0.161. Then compare it to prevalence 10% and specificity 99%.',
  },
  {
    id: 3,
    title: 'Vectors, Matrices & Linear Algebra',
    time: '70 min',
    theme: 'Data as structure',
    story: [
      'Netflix knows what to recommend because it stores ratings as numbers. Each user can become a row, each movie can become a column, and each cell stores a rating or interaction.',
      'A recommender system is not magic. It is a structured table plus math for comparing rows, columns, and patterns in that grid.',
    ],
    idea: [
      'A vector is an ordered list of numbers, like [5, 2, 1, 4, 1]. A matrix is a grid of numbers arranged in rows and columns.',
      'A user-item matrix uses rows for users, columns for items, and ratings inside the cells. Missing entries are what the recommender wants to predict.',
      'There are simple ways to predict missing values, such as user averages and item averages, and stronger approaches such as matrix factorization and cosine similarity.',
    ],
    example: [
      'Approach 1 is content-based recommendation: “You watched two action films, so I recommend another action film.” That relies on item similarity.',
      'Approach 2 is demographic or filtering-based: “People like you tend to enjoy these items.”',
      'The deeper lecture math introduces user mean a_i and item mean b_j. A prediction can combine those averages, although real systems go further than average-of-averages.',
    ],
    lab: `import numpy as np

R = np.array([
    [5, 2, 1, 4, 1],
    [4, 0, 1, 3, 3],  # 0 = missing
    [3, 3, 2, 0, 4],
    [2, 1, 2, 2, 5],
    [5, 3, 0, 4, 3],
])

# user averages (ignoring zeros)
a = np.array([row[row > 0].mean() for row in R])

# item averages
b = np.array([R[:, j][R[:, j] > 0].mean() for j in range(R.shape[1])])

print("User averages a_i:", a)
print("Item averages b_j:", b)

# very simple prediction for missing cell (user 2, item 2)
pred = (a[1] + b[1]) / 2
print("Predicted rating for user2/item2:", round(pred, 2))`,
    checks: [
      { q: 'What is the shape of the matrix above?', a: '5 × 5.' },
      { q: 'If you add a 6th movie, do you add a row or a column?', a: 'A column.' },
      {
        q: 'Why might average-of-averages be a poor predictor in real life?',
        a: 'Because it ignores which users are similar to one another and which items behave alike. Real systems use richer similarity structure.',
      },
    ],
    project:
      'Create a tiny user-item or client-service matrix of your own. Mark missing values and describe which patterns you would want a recommender to learn.',
  },
  {
    id: 4,
    title: 'Images as Numbers',
    time: '45 min',
    theme: 'Image representation',
    story: [
      'A computer does not see a photo the way humans do. It sees a giant spreadsheet of brightness values.',
      'That is powerful because once an image becomes numbers, machine learning can compare, transform, compress, and learn from it.',
    ],
    idea: [
      'A grayscale image of size 128 × 128 is a matrix with 16,384 numbers, each between 0 and 255.',
      'A color image has three such matrices for red, green, and blue, so a 128 × 128 RGB image contains 49,152 numbers.',
    ],
    example: [
      'A white pixel is 255. A black pixel is 0. Gray values fall in between.',
      'Even a tiny 3 × 3 patch of an image is just a small table of intensities. Computer vision starts from that numeric view.',
    ],
    lab: `import numpy as np
import matplotlib.pyplot as plt

img = np.random.randint(0, 256, size=(8, 8))  # fake tiny image
plt.imshow(img, cmap='gray', vmin=0, vmax=255)
plt.show()
print(img)  # see the raw numbers`,
    checks: [
      { q: 'How many numbers describe a 28 × 28 MNIST digit?', a: '784.' },
      { q: 'What value is pure white?', a: '255.' },
      {
        q: 'Why is it useful that an image is just numbers?',
        a: 'Because everything math and machine learning can do to numbers can now be done to images.',
      },
    ],
    project:
      'Think of a scanned handwritten van log. Explain why OCR is hard when different handwriting styles change the pixel patterns.',
  },
  {
    id: 5,
    title: 'Dimension Reduction & PCA',
    time: '65 min',
    theme: 'Signal vs noise',
    story: [
      'A handwritten digit image may have hundreds of pixel values, but not all of them are equally important. Many are background or redundant.',
      'Dimension reduction keeps the most informative parts while dropping noise and unnecessary detail.',
    ],
    idea: [
      'A common description is: increase interpretability while preserving as much information as possible.',
      'PCA keeps directions of maximum variance. Those directions usually carry the strongest signal because they are where the data changes the most.',
      'This is the foundation of PCA, a core tool for compression, visualization, and noise reduction.',
    ],
    example: [
      'A digit image can be reduced from 784 values to fewer components and still remain recognizable.',
      'The lecture example reduces a digit “8” from 784 to 154 to 59 components. As the number of components drops, the image becomes blurrier, but much of the signal remains.',
    ],
    lab: `from sklearn.datasets import load_digits
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

digits = load_digits()
X = digits.data  # shape (1797, 64)

pca = PCA(n_components=10).fit(X)
print("Variance kept:", pca.explained_variance_ratio_.sum())

X_reduced = pca.transform(X)
X_back = pca.inverse_transform(X_reduced)

fig, axes = plt.subplots(1, 2)
axes[0].imshow(X[0].reshape(8, 8), cmap='gray')
axes[0].set_title('Original 64 dims')
axes[1].imshow(X_back[0].reshape(8, 8), cmap='gray')
axes[1].set_title('Reconstructed from 10 dims')
plt.show()`,
    checks: [
      {
        q: 'If you reduce 784 dimensions to 50, by how much have you compressed?',
        a: 'By about 93%. You keep only 50 of the original 784 dimensions.',
      },
      {
        q: 'Why does PCA prefer directions of maximum variance?',
        a: 'Because variance often carries the signal that distinguishes examples. Low-variance directions tend to look similar across samples and add less information.',
      },
      {
        q: 'What is the trade-off?',
        a: 'You get less complexity and often less noise, but you also lose some detail.',
      },
    ],
    project:
      'Pick a large spreadsheet and identify which columns might be redundant, low-value, or mostly noise. Explain what information you would want to keep.',
  },
  {
    id: 6,
    title: 'Putting It All Together',
    time: '45 min',
    theme: 'Review',
    story: [
      'The goal is not to become a mathematician overnight. The goal is to recognize these math ideas when they appear in AI, Python notebooks, dashboards, and decision systems.',
      'You now have four reusable lenses for reasoning about real AI work.',
    ],
    idea: [
      'Probability handles uncertainty and decisions.',
      'Vectors and matrices represent users, images, ratings, and text as numbers.',
      'Statistics summarizes what is normal, how much data varies, and what stands out.',
      'Dimension reduction keeps the signal and drops some of the noise.',
    ],
    example: [
      'A practical AI workflow starts with a real question, turns it into data, uses math to find a pattern, then returns to the real world as a recommendation, alert, forecast, or decision support tool.',
      'You can now see that recommendation systems, image models, and medical testing all reuse the same underlying mathematical habits.',
    ],
    lab: `skills = ["Probability", "Bayes", "Matrices", "Images", "PCA"]
for skill in skills:
    print(f"I can explain the basic idea of {skill} and where it appears in AI.")`,
    checks: [
      { q: 'Which idea helps with uncertainty and decisions?', a: 'Probability.' },
      {
        q: 'Which idea represents users, images, text, or ratings as numbers?',
        a: 'Vectors and matrices.',
      },
      {
        q: 'Which idea keeps the signal while reducing complexity?',
        a: 'Dimension reduction, especially PCA.',
      },
    ],
    project:
      'Create a one-page cheat sheet with the four lenses: probability, vectors and matrices, statistics, and dimension reduction.',
  },
]

export default modules
