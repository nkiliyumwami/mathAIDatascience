export const courseModules = [
  {
    id: 'module-1',
    title: 'Module 1: Numbers, Patterns, and Data Confidence',
    shortLabel: 'Math Base',
    duration: 'Week 1',
    goal: 'Build comfort with quantities, change, averages, and reading simple charts.',
    story:
      'A school director wants to know whether attendance is improving after a tutoring program. Before any AI enters the picture, someone has to understand counts, percentages, and patterns clearly enough to tell the truth from the noise.',
    idea:
      'Math in data science is not about speed drills. It is about describing change carefully. You need to recognize scale, compare groups fairly, and summarize a messy situation with a few dependable measures.',
    example:
      'If attendance rises from 80 students to 92 students, the increase is 12 students. The percent increase is 12 divided by 80, which is 15%. That distinction matters because raw counts and relative change answer different questions.',
    pythonLab: [
      'Create a list of weekly attendance counts and calculate the average.',
      'Write a small script that computes both absolute change and percent change.',
      'Print a one-sentence interpretation of the result in plain language.',
    ],
    questions: [
      {
        prompt: 'Why is percent change often more useful than raw change when comparing groups?',
        answer:
          'Because percent change accounts for the starting size. A change of 10 means something very different when the baseline is 20 versus 2,000.',
      },
      {
        prompt: 'What does an average hide that a chart might reveal?',
        answer:
          'An average can hide variability. A chart may show spikes, drops, or clusters that the average smooths over.',
      },
    ],
    miniProject:
      'Track one real habit for seven days, such as study time or water intake, then summarize the pattern with a table and a short interpretation.',
  },
  {
    id: 'module-2',
    title: 'Module 2: Probability as Decision-Making',
    shortLabel: 'Probability',
    duration: 'Week 2',
    goal: 'Understand uncertainty, events, conditional thinking, and why probability helps decisions.',
    story:
      'A clinic uses a screening test to flag possible cases early. The test is useful, but not perfect. The real question is not whether the test sounds impressive, but what a positive result means in context.',
    idea:
      'Probability gives you a disciplined way to talk about uncertainty. Instead of treating outcomes as guaranteed, you measure how likely they are and update your belief when new evidence appears.',
    example:
      'If rain is forecast with 70% probability, that does not mean it will rain over 70% of the city today. It means that in situations like this, rain happened about 70% of the time.',
    pythonLab: [
      'Represent a coin flip experiment with Python lists.',
      'Simulate repeated random draws and estimate the proportion of heads.',
      'Compare the estimated proportion after 10, 100, and 1,000 trials.',
    ],
    questions: [
      {
        prompt: 'What is the difference between an event and a conditional event?',
        answer:
          'An event is a result of interest, like passing a test. A conditional event adds context, like passing given that the student attended tutoring.',
      },
      {
        prompt: 'Why does probability help with imperfect evidence?',
        answer:
          'Because it lets you combine what you believed before with the strength of new evidence instead of treating every signal as absolute truth.',
      },
    ],
    miniProject:
      'Write a short explanation for a non-technical friend about why a test with high accuracy can still produce misleading positive results.',
  },
  {
    id: 'module-3',
    title: 'Module 3: Python for Thinking with Data',
    shortLabel: 'Python',
    duration: 'Week 3',
    goal: 'Learn variables, lists, loops, functions, and basic data-cleaning habits.',
    story:
      'A nonprofit collects survey data from several volunteers. The entries are inconsistent, the spelling varies, and some values are missing. Python becomes your assistant for cleaning the mess repeatedly and reliably.',
    idea:
      'Python is valuable because it turns a process into a repeatable system. Instead of fixing one spreadsheet cell at a time, you describe the logic once and run it many times.',
    example:
      'You can store scores in a list, loop through them, and count how many are above a target threshold. That same pattern later becomes filtering rows in a dataset.',
    pythonLab: [
      'Create a list of student scores and count how many are 70 or higher.',
      'Write a function that labels each score as pass or review.',
      'Practice cleaning text by trimming spaces and converting names to lowercase.',
    ],
    questions: [
      {
        prompt: 'Why are functions useful for beginners?',
        answer:
          'Functions let you package logic into reusable steps. That reduces copy-paste mistakes and makes your code easier to test.',
      },
      {
        prompt: 'What is one sign that a list-processing task should become code instead of manual work?',
        answer:
          'If you need to repeat the same rule many times, code is usually safer, faster, and easier to update.',
      },
    ],
    miniProject:
      'Build a simple script that reads a list of names and quiz scores, cleans the names, and prints who needs extra review.',
  },
  {
    id: 'module-4',
    title: 'Module 4: Data Stories, Tables, and Features',
    shortLabel: 'Data Frames',
    duration: 'Week 4',
    goal: 'Move from raw values to structured datasets, features, and simple visual explanations.',
    story:
      'A team wants to predict which students may need support next month. They have attendance, assignment completion, and prior scores. The challenge is deciding which columns matter and what each one actually represents.',
    idea:
      'A dataset is not just rows and columns. Each column is a feature that captures one aspect of the story. Good features make useful patterns easier to learn; weak features add noise or bias.',
    example:
      'Attendance rate, late assignments, and prior average may all help predict support needs. A student ID number probably should not, because it has no meaningful relationship to the learning outcome.',
    pythonLab: [
      'Create a small table-like structure with dictionaries or pandas-style thinking.',
      'Identify target versus feature columns.',
      'Describe which columns are numeric, categorical, or possibly noisy.',
    ],
    questions: [
      {
        prompt: 'What makes a feature useful?',
        answer:
          'A useful feature has a believable connection to the outcome and is measured consistently enough to help a model find a pattern.',
      },
      {
        prompt: 'Why can a dataset have many columns but still be weak?',
        answer:
          'More columns do not guarantee more signal. Some columns may be redundant, irrelevant, or even misleading.',
      },
    ],
    miniProject:
      'Design a tiny dataset for a real-world problem you care about and explain which columns are features, which column is the target, and why.',
  },
  {
    id: 'module-5',
    title: 'Module 5: Machine Learning Without the Mystery',
    shortLabel: 'ML Ideas',
    duration: 'Week 5',
    goal: 'Understand prediction, training data, overfitting, evaluation, and why models make mistakes.',
    story:
      'A program manager wants a model that predicts which applicants are likely to finish a training course. The first model seems perfect on historical data, but performs poorly on new applicants. That is the classic trap of memorizing instead of learning.',
    idea:
      'Machine learning is pattern-finding under uncertainty. A model learns from examples, but the real goal is not to repeat the past exactly. The goal is to generalize well to new cases.',
    example:
      'If a model memorizes every detail of the training data, it can score extremely high there and still fail on unseen data. That is overfitting. A better model captures the broader pattern instead.',
    pythonLab: [
      'Split a toy dataset into training and testing groups on paper or in code.',
      'Compare a rule that is too simple, too complex, and more balanced.',
      'Describe which one should generalize better and why.',
    ],
    questions: [
      {
        prompt: 'Why do we need a test set?',
        answer:
          'Because checking performance only on training data can fool you into thinking the model learned more than it actually did.',
      },
      {
        prompt: 'What is overfitting in plain language?',
        answer:
          'It means the model learned the quirks of the old examples too closely and became worse at handling new examples.',
      },
    ],
    miniProject:
      'Explain a model evaluation plan for a simple prediction problem using plain English, including what you would measure and how you would check for overfitting.',
  },
  {
    id: 'module-6',
    title: 'Module 6: Responsible AI and the First Capstone Mindset',
    shortLabel: 'Capstone',
    duration: 'Week 6',
    goal: 'Connect data work to decisions, fairness, communication, and beginner-level project design.',
    story:
      'A city office wants to use a model to prioritize outreach for residents who may need assistance. The idea sounds efficient, but if the data is incomplete or biased, the model can reinforce unfair patterns rather than reduce them.',
    idea:
      'Applied AI is not only about getting a prediction. It is about asking whether the prediction should be used, who might be affected, and how to explain tradeoffs honestly.',
    example:
      'A model with solid accuracy may still be harmful if one group receives many more false positives or false negatives than another. Performance and fairness both matter.',
    pythonLab: [
      'List the inputs, output, stakeholders, and risks for a beginner capstone idea.',
      'Write a short model card style summary: purpose, data, risks, and evaluation checks.',
      'Practice explaining your project in three plain-language sentences.',
    ],
    questions: [
      {
        prompt: 'Why is a technically accurate model not automatically a good deployed model?',
        answer:
          'Because deployment affects real people. You also have to consider fairness, interpretability, privacy, and operational consequences.',
      },
      {
        prompt: 'What does a strong beginner capstone usually show?',
        answer:
          'It shows a clear problem, understandable data choices, simple evaluation, and honest reflection on limits and risks.',
      },
    ],
    miniProject:
      'Draft a one-page capstone concept for a community, education, health, or business problem and include the decision you want the model to support.',
  },
]

export const schedulePlan = [
  {
    week: 'Week 1',
    focus: 'Math confidence and descriptive thinking',
    checkpoint: 'Finish Module 1 and write two notes about patterns you notice in everyday data.',
  },
  {
    week: 'Week 2',
    focus: 'Probability and Bayes intuition',
    checkpoint: 'Finish Module 2 and test three slider combinations in the Bayes calculator.',
  },
  {
    week: 'Week 3',
    focus: 'Python basics and repetition',
    checkpoint: 'Finish Module 3 and type each lab exercise yourself rather than only reading it.',
  },
  {
    week: 'Week 4',
    focus: 'Features, tables, and telling data stories',
    checkpoint: 'Finish Module 4 and sketch one tiny dataset of your own.',
  },
  {
    week: 'Week 5',
    focus: 'Model evaluation and overfitting intuition',
    checkpoint: 'Finish Module 5 and explain train/test split to someone else in plain language.',
  },
  {
    week: 'Week 6',
    focus: 'Responsible AI and capstone framing',
    checkpoint: 'Finish Module 6 and draft your mini-capstone idea.',
  },
]

export const finalQuiz = [
  {
    question: 'Why is it risky to judge a model only by training accuracy?',
    answer:
      'Training accuracy can be high even when the model memorized the past. You need separate evaluation data to check whether it generalizes.',
  },
  {
    question: 'What does Bayes thinking help you do?',
    answer:
      'It helps you update what you believe after seeing new evidence, especially when evidence is imperfect.',
  },
  {
    question: 'What is the role of a feature in a dataset?',
    answer:
      'A feature is an input variable that describes part of the situation and may help a model predict the target.',
  },
  {
    question: 'Why should notes and reflection be part of your study process?',
    answer:
      'Because writing explanations in your own words exposes confusion early and makes the ideas easier to recall later.',
  },
]
