export interface LessonBlock {
  title: string
  body: string
}

export interface SubLesson {
  level: 'Start' | 'Build' | 'Apply'
  title: string
  explanation: string
  example: string
  takeaway: string
  commonMistake: string
  quickCheck: {
    prompt: string
    options: string[]
    correctOption: string
    answer: string
    explanation: string
  }
}

export interface WorkedExample {
  title: string
  steps: string[]
  interpretation: string
}

export interface ModuleExercise {
  prompt: string
  options: string[]
  correctOption: string
  answer: string
  explanation: string
}

export interface CourseModule {
  id: string
  title: string
  shortLabel: string
  duration: string
  goal: string
  story: string
  idea: string
  subLessons: SubLesson[]
  mathBehind: LessonBlock[]
  workedExamples: WorkedExample[]
  aiApplications: LessonBlock[]
  refugeeUseCases: LessonBlock[]
  pythonLab: {
    title: string
    snippet: string
    explanation: string
  }
  questions: ModuleExercise[]
  miniProject: {
    title: string
    brief: string
    deliverable: string
  }
}

export interface ScheduleDay {
  id: string
  week: string
  title: string
  focus: string
  tasks: string[]
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  answer: string
  explanation: string
}

export interface CapstoneSection {
  title: string
  scenario: string
  datasetColumns: string[]
  moduleConnections: string[]
  tasks: string[]
  deliverable: string
}

export const courseModules: CourseModule[] = [
  {
    id: 'foundations',
    title: 'Module 1: Foundations Before the Math Gets Scary',
    shortLabel: 'Foundations',
    duration: '90 min',
    goal: 'Build a calm mental model for how data, math, and AI fit together before touching formulas.',
    story:
      'A new learner starts an Applied AI and Data Science program and hears words like dataset, feature, model, probability, and matrix. That can feel like ten new languages at once. This module slows the whole thing down. It shows that most AI work begins with a simple operational question, some rows of data, and a need to describe the world more clearly.',
    idea:
      'The beginner-friendly idea is this: data science helps you describe and organize reality, math helps you measure patterns and uncertainty, and AI uses those patterns to make predictions or recommendations. You do not begin with magic. You begin with structured questions.',
    subLessons: [
      {
        level: 'Start',
        title: 'Sub-Lesson 1: What a dataset really is',
        explanation:
          'A dataset is organized evidence. Most beginner datasets look like a table. Rows usually stand for cases such as families, appointments, or weekly reports. Columns usually stand for features such as county, language, family size, or whether follow-up was missed.',
        example:
          'If you track 12 newly arrived families, each family can be one row. Columns might include family size, interpreter needed, school-age children, and date of first appointment.',
        takeaway: 'If you can explain what one row and one column mean, you have started reading data correctly.',
        quickCheck: {
          prompt: 'If each row is one family, what is a column likely to represent?',
          options: [
            'One feature or variable about every family',
            'A single final decision only',
            'A random collection of notes',
            'The number of rows in the dataset',
          ],
          correctOption: 'One feature or variable about every family',
          answer: 'One feature or variable about every family, such as family size or county.',
        explanation:
          'This row-column structure is the basic shape used later in statistics, Python analysis, and machine learning.',
        },
        commonMistake:
          'Beginners often treat rows and columns as formal spreadsheet details instead of as the actual meaning of the data. If you do not know what one row stands for, you do not understand the dataset yet.',
      },
      {
        level: 'Build',
        title: 'Sub-Lesson 2: Turning a real-world problem into a data question',
        explanation:
          'Real-world work usually starts with a human problem, not a formula. Data work begins when you rewrite that problem in a measurable way. Good data questions are specific enough that you can imagine the rows, columns, and desired output.',
        example:
          'Human problem: “Some families need more appointment support.” Data question: “Can we identify which past features are associated with missed follow-up so staff can offer help earlier?”',
        takeaway: 'Strong data work begins when a human problem becomes a clear measurable question.',
        quickCheck: {
          prompt: 'Why is “Can AI help families?” too vague as a data question?',
          options: [
            'Because it does not define the exact outcome or variables',
            'Because AI can never be used in human services',
            'Because only Python questions are valid',
            'Because data questions should avoid measurable details',
          ],
          correctOption: 'Because it does not define the exact outcome or variables',
          answer:
            'Because it does not specify the exact outcome, population, timing, or measurable variables involved.',
          explanation:
            'A useful data question must be concrete enough to define what will be measured and what the output should mean.',
        },
        commonMistake:
          'A vague “use AI to help” goal sounds ambitious but usually produces weak analysis because nobody has agreed on the outcome, timescale, or unit of analysis.',
      },
      {
        level: 'Apply',
        title: 'Sub-Lesson 3: Output is not decision',
        explanation:
          'An output is what the system produces, such as a count, chart, risk score, or probability. A decision is what people do after seeing that output. In sensitive fields, the human decision must remain larger than the number.',
        example:
          'A model may output “0.72 probability of missed follow-up.” Staff still decide whether to call, arrange transportation, review notes, or do nothing because another source already solved the issue.',
        takeaway: 'A useful AI output supports judgment; it does not replace responsibility.',
        quickCheck: {
          prompt: 'Why should staff not treat a score as the final answer?',
          options: [
            'Because scores do not capture full human context',
            'Because scores are always mathematically wrong',
            'Because outputs should replace policy',
            'Because models never use data',
          ],
          correctOption: 'Because scores do not capture full human context',
          answer:
            'Because scores do not capture full human context, fairness concerns, recent updates, or policy rules.',
          explanation:
            'Responsible AI means using outputs as decision support, not as automatic replacements for judgment.',
        },
        commonMistake:
          'Learners often assume that a high score should trigger an automatic action. In human services, the number should start a review, not end it.',
      },
    ],
    mathBehind: [
      {
        title: '1. A dataset is just organized evidence',
        body:
          'A dataset is usually a table. Each row is one case, person, family, event, or time period. Each column is one measured feature such as age, wait time, language need, housing status, or whether support was needed. Before any model exists, the learner needs to be comfortable reading rows and columns as evidence.',
      },
      {
        title: '2. Variables are the measurable parts of a question',
        body:
          'If the question is “Which families may need extra follow-up support?”, then useful variables might include family size, prior missed appointments, transportation barriers, language access needs, or days since arrival. Math becomes useful once the situation is translated into measurable variables.',
      },
      {
        title: '3. Outputs are not the same as decisions',
        body:
          'A score, probability, or prediction is an output. A human decision is what staff choose to do with that output. This distinction matters in human-centered fields because the tool should support judgment, not replace it.',
      },
      {
        title: '4. Good questions come before good models',
        body:
          'If the question is vague, the data will be vague and the model will be weak. A good beginner habit is to ask: what exactly am I trying to predict, summarize, compare, or allocate?',
      },
    ],
    workedExamples: [
      {
        title: 'Worked Example: Reading a small service table',
        steps: [
          'Imagine a table with five rows, where each row is one newly arrived family.',
          'Columns include family size, county, school-age children, interpretation needed, and missed appointment history.',
          'Without any machine learning, you can already count how many families need school enrollment help or compare counties.',
          'That means the first level of data science is often careful description, not prediction.',
        ],
        interpretation:
          'This example teaches that the first math skill is often reading structure correctly. If you can read the table, you can ask useful questions.',
      },
      {
        title: 'Worked Example: Turning a human question into a data question',
        steps: [
          'Human question: “Which families may need extra follow-up?”',
          'Data version: “Can we estimate the probability of missed follow-up using past records?”',
          'Possible inputs: language support needed, prior missed visits, transportation access, and referral confirmation status.',
          'Possible output: estimated chance of follow-up failure.',
        ],
        interpretation:
          'This is how real AI work begins: not with code first, but with a translation from a human problem into a measurable one.',
      },
    ],
    aiApplications: [
      {
        title: 'How this shows up in data science',
        body:
          'Data scientists spend a large amount of time deciding what the rows and columns should mean, cleaning messy entries, and checking whether the question makes operational sense.',
      },
      {
        title: 'How this shows up in machine learning',
        body:
          'Machine learning models only see patterns in variables. If the variables are poor, incomplete, or biased, the model will learn poor patterns.',
      },
      {
        title: 'How this shows up in AI systems',
        body:
          'An AI workflow often combines data collection, descriptive analysis, prediction, interpretation, and human review. The beginner should see AI as a pipeline of choices, not as one mysterious black box.',
      },
    ],
    refugeeUseCases: [
      {
        title: 'Refugee resettlement example: Intake planning',
        body:
          'A resettlement team may want to know how many new arrivals next month are likely to need school enrollment support, transportation coordination, or interpretation. Before any prediction, the team must define the cases, the time window, and the outcomes clearly.',
      },
      {
        title: 'Interpretation',
        body:
          'If the data is missing for families with unstable contact information, the team may underestimate need. That means the numbers must be interpreted with humility, especially when the most vulnerable cases are also the hardest to record well.',
      },
    ],
    pythonLab: {
      title: 'Python Lab: Count one need in a tiny dataset',
      snippet: `families = [\n    {"family_id": "F1", "school_help": True},\n    {"family_id": "F2", "school_help": False},\n    {"family_id": "F3", "school_help": True},\n    {"family_id": "F4", "school_help": True},\n]\n\ncount = sum(1 for family in families if family["school_help"])\nprint("Families needing school help:", count)`,
      explanation:
        'This lab introduces the idea that a dataset can be represented in Python as a list of records. Even simple counting is already data work.',
    },
    questions: [
      {
        prompt: 'Why is a dataset often described as rows and columns?',
        options: [
          'Because rows are cases and columns are features',
          'Because datasets must always be square',
          'Because AI only works with spreadsheets',
          'Because columns are decisions and rows are formulas',
        ],
        correctOption: 'Because rows are cases and columns are features',
        answer:
          'Because rows usually represent cases and columns usually represent measured features, which makes the data easier to summarize or analyze.',
        explanation:
          'This structure is the bridge from spreadsheets to statistics and machine learning.',
      },
      {
        prompt: 'Why is a model output not the same as a human decision?',
        options: [
          'Because the output is only one signal among context and judgment',
          'Because outputs are never useful',
          'Because decisions should ignore evidence',
          'Because models do not use variables',
        ],
        correctOption: 'Because the output is only one signal among context and judgment',
        answer:
          'Because the output is only one signal. Staff still need context, ethics, policy, and case knowledge before acting.',
        explanation:
          'This is especially important in human services, where people should never be reduced to one score.',
      },
      {
        prompt: 'What should come before training a machine learning model?',
        options: [
          'A clear question and usable data',
          'A final dashboard design only',
          'A guarantee of perfect accuracy',
          'A matrix with no defined target',
        ],
        correctOption: 'A clear question and usable data',
        answer:
          'A clear question, usable data, and an understanding of what the variables mean.',
        explanation:
          'If the question or variables are weak, the model will be weak even if the code runs perfectly.',
      },
    ],
    miniProject: {
      title: 'Mini-Project: Build a beginner dataset map',
      brief:
        'Create a fictional intake spreadsheet for 10 families. Include at least one demographic column, one service-need column, one timing column, and one outcome column.',
      deliverable:
        'Write three descriptive questions, one probability question, and one ethical risk you would check before using the data for an AI tool.',
    },
  },
  {
    id: 'probability',
    title: 'Module 2: Probability and Bayes Rule for Beginners',
    shortLabel: 'Probability',
    duration: '110 min',
    goal: 'Learn what probability means, how conditional probability works, and why Bayes Rule matters in real decision support.',
    story:
      'A case-support dashboard says a family has a 70% chance of missing a follow-up appointment. That number looks powerful, but without context it can be misleading. Probability is the language of uncertainty, and this module teaches how to read it without fear.',
    idea:
      'Probability measures how likely something is. Conditional probability changes the question from “What is the chance of X?” to “What is the chance of X given Y?” Bayes Rule goes one step further and updates what you believe after new evidence appears.',
    subLessons: [
      {
        level: 'Start',
        title: 'Sub-Lesson 1: Basic probability as a proportion',
        explanation:
          'The most beginner-friendly view of probability is simple: count how often an event happened out of all observed cases. The result can be written as a decimal, fraction, or percentage.',
        example:
          'If 24 out of 40 families requested interpretation support, the probability is 24/40 = 0.60 = 60%.',
        takeaway: 'Probability starts as a proportion: how often the event happened out of all cases.',
        quickCheck: {
          prompt: 'If 9 out of 30 cases missed follow-up, what is the probability?',
          options: ['0.30 or 30%', '0.09 or 9%', '3.0 or 300%', '0.90 or 90%'],
          correctOption: '0.30 or 30%',
          answer: '9 / 30 = 0.30, or 30%.',
          explanation:
            'You divide the number of favorable outcomes by the total number of outcomes.',
        },
        commonMistake:
          'People often confuse a count with a probability. “9 missed visits” is a count. “9 out of 30” becomes a probability.',
      },
      {
        level: 'Build',
        title: 'Sub-Lesson 2: Conditional probability changes the group',
        explanation:
          'Conditional probability is about narrowing the cases you consider. The phrase “given that” means you are no longer looking at everyone. You are looking only at the group where some condition is already true.',
        example:
          'Instead of asking “What is the chance of a missed visit?”, ask “What is the chance of a missed visit given that no reminder text was sent?”',
        takeaway: 'Conditional probability changes the denominator because it changes which group you are studying.',
        quickCheck: {
          prompt: 'What changes when you ask “given that transportation is unavailable”?',
          options: [
            'You restrict the analysis to cases without transportation',
            'You stop using probability entirely',
            'You automatically double the probability',
            'You switch from rows to columns',
          ],
          correctOption: 'You restrict the analysis to cases without transportation',
          answer:
            'You restrict the analysis to the cases where transportation is unavailable, so the probability may change.',
          explanation:
            'Conditional questions are not about the whole population anymore. They focus on a subgroup.',
        },
        commonMistake:
          'A common mistake is comparing a subgroup rate to the overall rate without realizing the denominator has changed.',
      },
      {
        level: 'Apply',
        title: 'Sub-Lesson 3: Bayes Rule and base rates',
        explanation:
          'Bayes Rule matters most when the event you care about is rare. Even a strong positive signal can be less convincing than expected if the condition itself is uncommon and the system still makes some false-positive errors.',
        example:
          'If urgent housing crises are rare, a screening alert may still produce many false alarms even when it catches most real crises.',
        takeaway: 'A positive alert becomes meaningful only when you interpret it together with the base rate.',
        quickCheck: {
          prompt: 'Why does rarity make interpretation harder?',
          options: [
            'Because false positives can still pile up among many non-event cases',
            'Because rare events do not have probabilities',
            'Because Bayes Rule only works on common events',
            'Because rarity makes all alerts correct',
          ],
          correctOption: 'Because false positives can still pile up among many non-event cases',
          answer:
            'Because there are many more non-event cases, so even a small false-positive rate can generate many false alerts.',
          explanation:
            'This is the base-rate effect. It is one of the central beginner lessons behind Bayes reasoning.',
        },
        commonMistake:
          'People often over-trust a positive alert because the alert feels strong, while ignoring that the underlying condition may be rare.',
      },
    ],
    mathBehind: [
      {
        title: '1. Basic probability',
        body:
          'The simplest form is probability = favorable outcomes / total outcomes. If 60 out of 100 families needed school support, the probability is 60/100 = 0.60 = 60%.',
      },
      {
        title: '2. Conditional probability',
        body:
          'Conditional probability asks about a chance after some condition is already known. Example: what is the chance interpretation is needed given that the primary intake language is not English? The condition changes the sample you are looking at.',
      },
      {
        title: '3. Independence and dependence',
        body:
          'Two events are independent if one does not change the probability of the other. In real service work, many events are dependent. Transportation barriers can affect missed appointments. Reminder texts can affect attendance. Conditions matter.',
      },
      {
        title: '4. Bayes Rule in plain language',
        body:
          'Bayes Rule combines three ideas: how common the condition is to begin with, how often the signal is positive when the condition is really present, and how often the signal is positive when the condition is not present. The formula sounds intimidating, but the concept is just evidence-based belief updating.',
      },
    ],
    workedExamples: [
      {
        title: 'Worked Example: Plain probability',
        steps: [
          'Suppose 24 out of 40 newly arrived families requested interpretation support.',
          'Probability = 24 / 40 = 0.60.',
          'So the probability a randomly selected family needs interpretation is 60%.',
          'This does not mean every family will need it. It means 60% did in the observed group.',
        ],
        interpretation:
          'Probability is a proportion, not a promise.',
      },
      {
        title: 'Worked Example: Conditional probability',
        steps: [
          'Suppose 30 families had a reminder text sent, and 6 of them missed the appointment.',
          'Conditional probability of a miss given reminder = 6 / 30 = 20%.',
          'Suppose 10 families did not get a reminder, and 5 of them missed the appointment.',
          'Conditional probability of a miss given no reminder = 5 / 10 = 50%.',
        ],
        interpretation:
          'The condition matters. The probability changes depending on whether the reminder was sent.',
      },
      {
        title: 'Worked Example: Bayes intuition',
        steps: [
          'Suppose only 5% of cases actually need urgent housing intervention.',
          'A screening rule catches 90% of urgent cases, but it also wrongly flags 20% of non-urgent cases.',
          'Because non-urgent cases are much more common, there may still be many false alerts.',
          'That means a positive alert is useful, but not equal to certainty.',
        ],
        interpretation:
          'Rare events create base-rate problems. This is why Bayes Rule matters in AI and screening systems.',
      },
    ],
    aiApplications: [
      {
        title: 'Classification scores',
        body:
          'Many machine learning classifiers output probabilities such as the chance of churn, default, fraud, or missed follow-up. Those numbers are operationally useful only if staff understand that they describe uncertainty, not guaranteed outcomes.',
      },
      {
        title: 'Bayesian updating',
        body:
          'In AI systems, new evidence can update a belief. A previous risk estimate may change after new case notes, new referrals, or an attendance confirmation arrives.',
      },
      {
        title: 'Evaluation and calibration',
        body:
          'A model that says 80% should mean something close to 80% in the real world if it is well calibrated. Probability is not only for predictions; it is also for judging whether prediction systems are trustworthy.',
      },
    ],
    refugeeUseCases: [
      {
        title: 'Use case: Missed appointment support',
        body:
          'A resettlement agency may estimate the probability that a family will miss a medical or benefits appointment. The goal should be supportive intervention such as reminder calls, transport help, or interpretation, not punishment.',
      },
      {
        title: 'Use case: School enrollment planning',
        body:
          'If historical data shows that 55% of newly arrived families have school-age children, a team can estimate likely school enrollment demand next month by combining the arrival forecast with that proportion.',
      },
      {
        title: 'Interpretation warning',
        body:
          'If missed-appointment data is incomplete for families who move often or change phones, the probabilities may systematically understate need in the most unstable cases.',
      },
    ],
    pythonLab: {
      title: 'Python Lab: Compute a probability from observed data',
      snippet: `outcomes = ["missed", "attended", "attended", "missed", "attended", "attended"]\nmiss_probability = outcomes.count("missed") / len(outcomes)\nprint("Probability of a missed appointment:", miss_probability)`,
      explanation:
        'This is the beginner pattern: count the event you care about, divide by the total number of observed cases.',
    },
    questions: [
      {
        prompt: 'If 18 out of 30 families need interpretation, what is the probability?',
        options: ['0.60', '0.18', '18%', '1.8'],
        correctOption: '0.60',
        answer: '18 / 30 = 0.60, so the probability is 60%.',
        explanation:
          'Probability is favorable outcomes divided by total outcomes.',
      },
      {
        prompt: 'What is the main idea behind conditional probability?',
        options: [
          'It asks about probability within a restricted condition',
          'It means all events are independent',
          'It ignores subgroup context',
          'It turns percentages into counts',
        ],
        correctOption: 'It asks about probability within a restricted condition',
        answer:
          'You are asking about a chance after restricting attention to a smaller group defined by a condition.',
        explanation:
          '“Given that” changes the population under consideration.',
      },
      {
        prompt: 'Why can a positive alert still be weak when the true condition is rare?',
        options: [
          'Because false positives can outnumber true positives',
          'Because rare events have no probabilities',
          'Because alerts are always random',
          'Because conditional probability only works on large events',
        ],
        correctOption: 'Because false positives can outnumber true positives',
        answer:
          'Because false positives from the much larger non-condition group can outnumber true positives.',
        explanation:
          'This is the classic base-rate problem and one of the main reasons Bayes Rule is important.',
      },
    ],
    miniProject: {
      title: 'Mini-Project: Write a probability briefing note',
      brief:
        'Choose a fictional resettlement problem such as missed follow-up, school support need, or interpretation demand. Create one overall probability and one conditional probability using made-up but realistic counts.',
      deliverable:
        'Write a short staff note explaining what the probabilities support operationally and what they do not prove.',
    },
  },
  {
    id: 'statistics',
    title: 'Module 3: Descriptive Statistics That Tell the Truth',
    shortLabel: 'Statistics',
    duration: '110 min',
    goal: 'Understand mean, median, mode, range, and charts well enough to describe program data responsibly.',
    story:
      'A director asks, “How long does housing placement usually take?” If the learner reports only one average, they may hide delays, outliers, or subgroup differences. Descriptive statistics teach how to tell the story honestly.',
    idea:
      'Descriptive statistics summarize what has already happened. They help answer questions like what is typical, how much variation exists, whether an outlier is present, and whether one chart or average is hiding something important.',
    subLessons: [
      {
        level: 'Start',
        title: 'Sub-Lesson 1: Mean is the arithmetic average',
        explanation:
          'To compute the mean, add all values and divide by how many values there are. The mean uses every point, which makes it informative but also sensitive to extreme values.',
        example:
          'For wait times [5, 6, 7, 8, 9], the mean is 35 / 5 = 7.',
        takeaway: 'The mean uses every value, which is both its strength and its weakness.',
        quickCheck: {
          prompt: 'What is the mean of [4, 6, 10]?',
          options: ['6.67 approximately', '7 exactly', '20', '5'],
          correctOption: '6.67 approximately',
          answer: '(4 + 6 + 10) / 3 = 20 / 3 = 6.67 approximately.',
          explanation:
            'The mean is the total divided by the number of values.',
        },
        commonMistake:
          'Beginners sometimes report the mean as “the typical case” even when one extreme value is pulling it away from what most cases look like.',
      },
      {
        level: 'Build',
        title: 'Sub-Lesson 2: Median tells the middle story',
        explanation:
          'The median is the middle value after sorting the data. It is often better than the mean when a dataset has outliers or is skewed.',
        example:
          'For [5, 6, 7, 8, 30], the median is 7 even though the mean is much larger because of the 30.',
        takeaway: 'Median often tells the typical-case story more clearly when outliers distort the average.',
        quickCheck: {
          prompt: 'Why might median be better than mean for rent assistance amounts with one huge case?',
          options: [
            'Because median is less affected by the huge value',
            'Because median always equals the minimum',
            'Because mean only works for text categories',
            'Because outliers should never be counted',
          ],
          correctOption: 'Because median is less affected by the huge value',
          answer:
            'Because the huge case can pull the mean upward, while the median stays closer to the typical case.',
          explanation:
            'Median is more resistant to outliers.',
        },
        commonMistake:
          'Some learners think median is “better” than mean in every situation. It is not. It is better for some questions, especially when outliers distort the average.',
      },
      {
        level: 'Apply',
        title: 'Sub-Lesson 3: Mode and range answer different questions',
        explanation:
          'Mode tells you the most common value or category. Range tells you how far apart the minimum and maximum are. They solve different descriptive problems.',
        example:
          'If primary languages are Arabic, Dari, Arabic, Swahili, Arabic, then the mode is Arabic. If days to support range from 3 to 15, the range is 12.',
        takeaway: 'Good summaries depend on the question: most common, middle, average, or spread are not interchangeable.',
        quickCheck: {
          prompt: 'Which statistic best answers “What language appears most often?”',
          options: ['Mode', 'Range', 'Mean', 'Median'],
          correctOption: 'Mode',
          answer: 'Mode.',
          explanation:
            'Mode is designed for the most frequent value or category.',
        },
        commonMistake:
          'A common mistake is using mean for category questions like language or referral type, even though averages do not make sense there.',
      },
    ],
    mathBehind: [
      {
        title: '1. Mean',
        body:
          'The mean is the arithmetic average. Add all values, then divide by the number of values. It is useful, but it can be pulled strongly by very large or very small outliers.',
      },
      {
        title: '2. Median',
        body:
          'The median is the middle value after ordering the data. It is often better than the mean when the data is skewed or has one extreme case.',
      },
      {
        title: '3. Mode',
        body:
          'The mode is the most frequent value or category. It is especially useful for categorical questions like the most common primary language or most common referral type.',
      },
      {
        title: '4. Range and spread',
        body:
          'The range is maximum minus minimum. It gives a quick sense of spread, though it only uses two values. Spread matters because two datasets can have the same mean but very different consistency.',
      },
      {
        title: '5. Outliers',
        body:
          'An outlier is a value unusually far from the rest. Outliers can reflect error, rare but real cases, or system breakdown. They should not automatically be removed. They should be investigated.',
      },
    ],
    workedExamples: [
      {
        title: 'Worked Example: Mean versus median',
        steps: [
          'Suppose days to school enrollment are [5, 6, 6, 7, 7, 8, 30].',
          'Mean = (5 + 6 + 6 + 7 + 7 + 8 + 30) / 7 = 69 / 7 = about 9.86 days.',
          'Median = the middle ordered value = 7 days.',
          'The mean is pulled upward by the one long delay of 30 days.',
        ],
        interpretation:
          'If the goal is “typical experience,” the median may tell the story better. If the goal is resource burden, the large delay still matters.',
      },
      {
        title: 'Worked Example: Mode for categorical data',
        steps: [
          'Suppose the primary languages in a small caseload are Arabic, Swahili, Arabic, Dari, Arabic, Swahili.',
          'Count each category.',
          'Arabic appears 3 times, Swahili 2 times, and Dari 1 time.',
          'So the mode is Arabic.',
        ],
        interpretation:
          'Mode is the right descriptive statistic when the data is categorical rather than numeric.',
      },
      {
        title: 'Worked Example: Same mean, different spread',
        steps: [
          'Dataset A = [7, 7, 7, 7, 7]. Mean is 7.',
          'Dataset B = [2, 4, 7, 10, 12]. Mean is also 7.',
          'The averages match, but Dataset B varies much more.',
          'That means averages alone can hide operational instability.',
        ],
        interpretation:
          'Spread is part of the story, not an optional extra.',
      },
    ],
    aiApplications: [
      {
        title: 'Exploratory data analysis',
        body:
          'Before training models, data scientists inspect means, medians, missing values, category counts, and unusual values. This helps them understand whether the data is usable and whether the future model may inherit obvious problems.',
      },
      {
        title: 'Feature understanding',
        body:
          'A model may treat one column as numeric input, but a human still needs to understand that column’s distribution. If one feature has impossible values or extreme skew, it can distort training.',
      },
      {
        title: 'Monitoring operations',
        body:
          'Descriptive statistics are not only pre-model tools. They are also used after deployment to monitor whether demand, outcomes, or service quality are changing over time.',
      },
    ],
    refugeeUseCases: [
      {
        title: 'Use case: Housing placement wait time',
        body:
          'A resettlement program may track days from arrival to housing placement. Median wait time helps describe the typical experience, while the maximum and outliers may reveal severe delays needing escalation.',
      },
      {
        title: 'Use case: Language access planning',
        body:
          'Mode can identify the most common primary languages in a region, which helps plan interpretation staffing and translated materials.',
      },
      {
        title: 'Interpretation warning',
        body:
          'If one county has far longer delays than another, an overall average may hide that inequality. Subgroup summaries matter.',
      },
    ],
    pythonLab: {
      title: 'Python Lab: Compare mean and median',
      snippet: `from statistics import mean, median\n\ndays_to_housing = [8, 9, 9, 10, 11, 12, 35]\nprint("Mean:", mean(days_to_housing))\nprint("Median:", median(days_to_housing))`,
      explanation:
        'This code shows how the mean and median can differ when one delay is much larger than the rest.',
    },
    questions: [
      {
        prompt: 'Why might the mean be misleading in a dataset with one extreme delay?',
        options: [
          'Because the extreme value can pull the mean upward',
          'Because mean ignores all values',
          'Because mean is only for categories',
          'Because outliers lower the sample size',
        ],
        correctOption: 'Because the extreme value can pull the mean upward',
        answer:
          'Because the mean uses every value and can be pulled upward strongly by the extreme value.',
        explanation:
          'That is why median is often safer for typical-case interpretation in skewed data.',
      },
      {
        prompt: 'What statistic best answers “What is the most common language?”',
        options: ['Mode', 'Median', 'Range', 'Mean'],
        correctOption: 'Mode',
        answer: 'Mode.',
        explanation:
          'Mode is the most frequent category or value.',
      },
      {
        prompt: 'Why should you care about spread and not only average?',
        options: [
          'Because similar averages can hide very different variability',
          'Because spread always equals the mean',
          'Because averages are never useful',
          'Because spread replaces all charts',
        ],
        correctOption: 'Because similar averages can hide very different variability',
        answer:
          'Because two datasets can have the same average while having very different consistency or operational risk.',
        explanation:
          'Variation tells you whether the process is stable or uneven.',
      },
    ],
    miniProject: {
      title: 'Mini-Project: Summarize a fictional program dataset',
      brief:
        'Create 12 realistic values for one refugee-resettlement measure such as days to benefits enrollment, number of transport rides, or weekly interpretation hours.',
      deliverable:
        'Report the mean, median, range, any possible outlier, and a two-sentence interpretation of what the numbers say operationally.',
    },
  },
  {
    id: 'matrices',
    title: 'Module 4: Matrices, Tables, and Why AI Loves Them',
    shortLabel: 'Matrices',
    duration: '115 min',
    goal: 'Understand matrices as structured numeric tables and see exactly how they connect to data science, machine learning, and AI.',
    story:
      'The word matrix scares many beginners because it sounds abstract. In practice, a matrix is often just a table of numbers. If you have ever looked at a spreadsheet where rows are families and columns are needs or services, you already have the right intuition.',
    idea:
      'A matrix is a rectangular grid of numbers arranged in rows and columns. In machine learning, many datasets are converted into matrix form so algorithms can compute patterns across many records at once.',
    subLessons: [
      {
        level: 'Start',
        title: 'Sub-Lesson 1: A matrix is a numeric table',
        explanation:
          'A matrix is just a rectangular arrangement of numbers. If the table has 4 rows and 3 columns, it has shape 4 × 3. Each row usually represents one observation, and each column represents one variable.',
        example:
          'A county-by-service table with four counties and three service categories is a 4 × 3 matrix.',
        takeaway: 'A matrix becomes less intimidating once you see it as a structured numeric table.',
        quickCheck: {
          prompt: 'If a family-by-feature dataset has 20 families and 5 features, what is its shape?',
          options: ['20 × 5', '5 × 20', '25 × 1', '20 × 20'],
          correctOption: '20 × 5',
          answer: '20 × 5.',
          explanation:
            'Rows count families and columns count features.',
        },
        commonMistake:
          'Learners often flip the shape because they remember the feature count more clearly than the case count. Always ask: what does one row represent?',
      },
      {
        level: 'Build',
        title: 'Sub-Lesson 2: How matrices enter machine learning',
        explanation:
          'Most tabular machine learning begins with a feature matrix. Each row is one case. Each column is one numeric or encoded feature. The model looks for patterns across that structured grid.',
        example:
          'A row might be [family_size, transport_barrier, school_support_needed, prior_missed_visits]. One row stands for one family.',
        takeaway: 'The feature matrix is the machine-readable version of a spreadsheet of cases and variables.',
        quickCheck: {
          prompt: 'Why is the feature matrix useful to a model?',
          options: [
            'Because it gives a consistent numeric structure across cases',
            'Because it removes the need for a target variable',
            'Because it guarantees fairness',
            'Because it turns every problem into a chart',
          ],
          correctOption: 'Because it gives a consistent numeric structure across cases',
          answer:
            'Because it gives the model a consistent numeric structure across many cases and variables.',
          explanation:
            'Algorithms need structured numeric input to compute patterns efficiently.',
        },
        commonMistake:
          'A matrix is sometimes treated as an advanced algebra object only. In beginner ML, it is often just the practical numeric version of a table.',
      },
      {
        level: 'Apply',
        title: 'Sub-Lesson 3: Matrix thinking in AI systems',
        explanation:
          'Even when data starts as text, images, or categories, AI systems often convert it into numeric vectors and matrices. Neural networks repeatedly apply matrix operations to transform one representation into another.',
        example:
          'A resettlement case summary might eventually become numeric features or embeddings before an AI system can process it.',
        takeaway: 'Matrices matter because AI systems compute on numeric representations, even when the original data feels human-readable.',
        quickCheck: {
          prompt: 'Why do people say matrices are everywhere in AI?',
          options: [
            'Because many AI computations operate on structured numeric arrays',
            'Because AI never uses text or images',
            'Because matrices are only for spreadsheets',
            'Because one matrix can replace all human decisions',
          ],
          correctOption: 'Because many AI computations operate on structured numeric arrays',
          answer:
            'Because many AI computations operate on structured numeric arrays, including feature tables, vectors, weights, and hidden-layer transformations.',
          explanation:
            'The visible app may look human-friendly, but the internal computation is often matrix-heavy.',
        },
        commonMistake:
          'People sometimes assume AI “understands” directly in natural language the way humans do. In practice, models operate on numeric representations under the hood.',
      },
    ],
    mathBehind: [
      {
        title: '1. Rows, columns, and cells',
        body:
          'Rows usually represent individual cases. Columns represent features or variables. A single entry inside the table is a cell. If there are 40 families and 6 features, the matrix shape is 40 × 6.',
      },
      {
        title: '2. Why matrices matter mathematically',
        body:
          'Matrices let us store many numbers in an organized way and perform systematic calculations on them. Even before advanced operations like matrix multiplication, the structure alone is useful because it makes computation across many cases possible.',
      },
      {
        title: '3. Matrix as feature representation',
        body:
          'In machine learning, one row is often one observation and one column is one feature. Example columns might be language support needed, family size, school-age children count, or prior appointment misses. The matrix is how the model “sees” the dataset numerically.',
      },
      {
        title: '4. Matrix multiplication intuition',
        body:
          'A full course would go deeper, but the beginner intuition is enough here: matrix multiplication is one way to combine structured inputs with structured weights or transformations. Many AI computations use repeated matrix operations under the hood.',
      },
      {
        title: '5. Embeddings and vectors',
        body:
          'Modern AI systems often represent words, sentences, images, or people-related patterns as vectors, which are just one-row or one-column matrices. Large AI models operate on very large matrix-like structures constantly.',
      },
    ],
    workedExamples: [
      {
        title: 'Worked Example: Family-by-service matrix',
        steps: [
          'Suppose each row is one family.',
          'Columns are interpretation needed, transport barrier, school support needed, and housing urgency score.',
          'A row like [1, 0, 1, 3] means interpretation is needed, no transport barrier is recorded, school support is needed, and housing urgency is high.',
          'Once all rows are stacked together, the dataset becomes a matrix.',
        ],
        interpretation:
          'This is exactly how a spreadsheet starts becoming machine-learning-ready structure.',
      },
      {
        title: 'Worked Example: County-by-language planning matrix',
        steps: [
          'Rows are counties: Suffolk, Middlesex, Worcester, Hampden.',
          'Columns are interpreter hours needed for Arabic, Dari, Haitian Creole, and Swahili.',
          'Each cell holds the estimated monthly hours needed for that county-language pair.',
          'The matrix makes shortages, imbalances, and planning priorities easier to compare.',
        ],
        interpretation:
          'Matrices are not only for algorithms. They are also great for operational planning and visual comparison.',
      },
      {
        title: 'Worked Example: Matrix idea inside a model',
        steps: [
          'Suppose a model uses three input features for each family: family size, prior missed appointments, and days since arrival.',
          'Each family becomes one numeric row with three values.',
          'The model applies a learned set of weights to these rows to produce a risk score or probability.',
          'Even if the learner never sees the full algebra, the key idea is that the model computes over the matrix representation of many families.',
        ],
        interpretation:
          'Matrices are the language that lets models process many records in one structured system.',
      },
    ],
    aiApplications: [
      {
        title: 'Machine learning tabular models',
        body:
          'Most beginner machine learning on spreadsheets starts with a feature matrix. Rows are observations. Columns are features. The target or label is stored separately as the outcome to predict.',
      },
      {
        title: 'Neural networks',
        body:
          'Neural networks rely heavily on matrix multiplications. Inputs, weights, and hidden layers are all represented in structured numeric arrays. This is why GPUs are so useful: they are good at doing many matrix operations quickly.',
      },
      {
        title: 'Recommendation and matching systems',
        body:
          'Systems that match people to resources, services, or content often use matrix-style representations. For example, a model may learn patterns from a family-by-needs matrix or a county-by-service-demand matrix.',
      },
    ],
    refugeeUseCases: [
      {
        title: 'Use case: Resource allocation',
        body:
          'A resettlement organization could build a county-by-service matrix where columns represent housing, transport, school support, legal support, and interpretation hours. This helps identify which regions face the heaviest combined pressure.',
      },
      {
        title: 'Use case: Family-support feature matrix',
        body:
          'A family-by-feature matrix could represent transportation barriers, number of children, recent arrival status, prior missed visits, and language needs. That matrix could be used for descriptive analysis or as input to a predictive support model.',
      },
      {
        title: 'Interpretation warning',
        body:
          'A matrix is a useful abstraction, but it simplifies human lives into numeric structure. It can support planning and learning, but staff must never forget that real families have context that a matrix cannot fully capture.',
      },
    ],
    pythonLab: {
      title: 'Python Lab: Represent a tiny matrix',
      snippet: `family_matrix = [\n    [1, 0, 1, 3],\n    [0, 1, 0, 2],\n    [1, 1, 1, 4],\n]\n\nfor row in family_matrix:\n    print(row)`,
      explanation:
        'This lab introduces a matrix as a list of lists in Python. Each inner list is one row.',
    },
    questions: [
      {
        prompt: 'If a dataset has 50 families and 4 numeric features, what is the matrix shape?',
        options: ['50 × 4', '4 × 50', '54 × 1', '50 × 50'],
        correctOption: '50 × 4',
        answer: '50 × 4.',
        explanation:
          'Rows represent families and columns represent features.',
      },
      {
        prompt: 'Why are matrices useful in machine learning?',
        options: [
          'They give algorithms consistent numeric structure',
          'They remove the need for labels',
          'They guarantee fairness automatically',
          'They only matter in accounting',
        ],
        correctOption: 'They give algorithms consistent numeric structure',
        answer:
          'Because they provide a clean numeric structure that algorithms can compute over efficiently across many records and features.',
        explanation:
          'The matrix is the bridge between a spreadsheet and a model.',
      },
      {
        prompt: 'What is one refugee-resettlement example of a useful matrix?',
        options: [
          'A county-by-language planning matrix',
          'A single paragraph narrative only',
          'A list with no columns',
          'A photo gallery of service centers',
        ],
        correctOption: 'A county-by-language planning matrix',
        answer:
          'A county-by-language or family-by-service-needs matrix for planning support and comparing demand patterns.',
        explanation:
          'Matrices help with both analytics and operational resource allocation.',
      },
    ],
    miniProject: {
      title: 'Mini-Project: Design one operational matrix',
      brief:
        'Choose one real-world resettlement problem such as interpreter planning, family follow-up, or school support demand. Design a matrix that would help describe or predict the problem.',
      deliverable:
        'List what each row represents, what each column represents, what each cell means, and how the matrix could help either planning or a machine learning workflow.',
    },
  },
  {
    id: 'python-ml',
    title: 'Module 5: Python, Machine Learning, and AI Workflow',
    shortLabel: 'Python + ML',
    duration: '120 min',
    goal: 'Connect beginner Python and the earlier math into one realistic machine learning workflow.',
    story:
      'By this point, the learner has seen structured data, uncertainty, summary statistics, and matrices. Now the final step is to understand how those pieces come together when a team says they are building an AI or machine learning tool.',
    idea:
      'A practical machine learning workflow often looks like this: define the question, prepare the dataset, choose the target, build the feature matrix, train a model, evaluate it, and interpret whether the result is useful and safe.',
    subLessons: [
      {
        level: 'Start',
        title: 'Sub-Lesson 1: Features and target',
        explanation:
          'In supervised machine learning, features are the inputs and the target is the outcome you want to predict. The target must be clearly defined or the whole workflow becomes unstable.',
        example:
          'Features might be family size, interpretation needed, transport barrier, and days since arrival. Target might be whether follow-up was missed.',
        takeaway: 'A model cannot learn well unless you clearly separate inputs from the outcome to predict.',
        quickCheck: {
          prompt: 'What is the target in a missed-follow-up model?',
          options: [
            'Whether follow-up was missed or not',
            'The list of features',
            'The model’s file name',
            'The average family size',
          ],
          correctOption: 'Whether follow-up was missed or not',
          answer: 'The outcome variable that says whether follow-up was missed or not.',
          explanation:
            'The target is the label the model tries to learn from historical examples.',
        },
        commonMistake:
          'Beginners often mix up a useful input variable with the outcome to predict. If the target is not clearly defined, the whole model setup gets blurry.',
      },
      {
        level: 'Build',
        title: 'Sub-Lesson 2: Training versus testing',
        explanation:
          'A model should not be judged only on the same data it learned from. Training data teaches the pattern. Test data checks whether the model can generalize to new examples.',
        example:
          'If you train on 80 historical families and test on 20 others, the test performance gives a better sense of real-world usefulness than the training performance alone.',
        takeaway: 'Training shows what the model learned; testing shows whether that learning transfers.',
        quickCheck: {
          prompt: 'Why is training accuracy alone not enough?',
          options: [
            'Because a model may memorize training data and fail on new cases',
            'Because test data should never be used',
            'Because accuracy is always zero on real data',
            'Because features are more important than outcomes',
          ],
          correctOption: 'Because a model may memorize training data and fail on new cases',
          answer:
            'Because a model may memorize the training data and still perform poorly on new cases.',
          explanation:
            'The point of ML is not memorization. It is useful generalization.',
        },
        commonMistake:
          'A model that performs perfectly on training data can still fail badly in practice. Learners often overestimate what training performance proves.',
      },
      {
        level: 'Apply',
        title: 'Sub-Lesson 3: Evaluation and human oversight',
        explanation:
          'A good model is not just one with a strong score. You also need to ask what types of errors it makes, which groups are affected, and whether people can use it responsibly in practice.',
        example:
          'A model that misses urgent-need families may be unacceptable even if it has high overall accuracy, because the cost of those false negatives is too high.',
        takeaway: 'A model is only useful when its errors, risks, and operational role are understood.',
        quickCheck: {
          prompt: 'Why might two models with similar accuracy still differ a lot in usefulness?',
          options: [
            'Because they may make different kinds of errors',
            'Because accuracy makes all other evaluation unnecessary',
            'Because only the fastest model matters',
            'Because models with the same accuracy are always equivalent',
          ],
          correctOption: 'Because they may make different kinds of errors',
          answer:
            'Because they may make different kinds of errors, affect different groups, or fit the workflow differently.',
          explanation:
            'Evaluation must match the operational stakes, not only a headline metric.',
        },
        commonMistake:
          'People often stop at accuracy because it is easy to read. But the most important question is usually what kinds of mistakes the system makes and who is affected.',
      },
    ],
    mathBehind: [
      {
        title: '1. Features and target',
        body:
          'Features are the input variables used to learn patterns. The target is the outcome you want to predict. Example: features might be family size, days since arrival, language support need, and prior missed visits. The target might be whether follow-up is missed.',
      },
      {
        title: '2. Training and testing',
        body:
          'A model learns from one portion of historical data and is then checked on another portion it did not train on. This helps estimate whether the model generalizes beyond memorizing the past.',
      },
      {
        title: '3. Evaluation metrics',
        body:
          'A beginner should know that accuracy is only one score. Precision, recall, false positives, false negatives, and calibration all matter depending on the problem. In support settings, false negatives and false positives may create very different harms.',
      },
      {
        title: '4. Human oversight',
        body:
          'Even a technically strong model needs review for fairness, interpretability, privacy, and operational fit. A useful AI system is not only accurate. It is also appropriately scoped and responsibly used.',
      },
    ],
    workedExamples: [
      {
        title: 'Worked Example: Predicting follow-up support need',
        steps: [
          'Question: which families are likely to need extra follow-up support after intake?',
          'Features: family size, interpretation needed, prior missed appointments, housing instability marker, days since arrival.',
          'Target: whether follow-up failed or required multiple retries.',
          'After training, the model may output a probability for each new family.',
        ],
        interpretation:
          'The output can help staff prioritize supportive outreach, but it must not become the only decision-making tool.',
      },
      {
        title: 'Worked Example: Why one score is not enough',
        steps: [
          'Suppose a model has 90% accuracy on paper.',
          'But if urgent-need cases are rare, the model may still miss too many of them.',
          'A system can look strong overall while performing poorly on the cases you care about most.',
          'That is why confusion-matrix thinking and subgroup review matter.',
        ],
        interpretation:
          'Evaluation should match the real-world stakes, not only produce a flattering headline number.',
      },
    ],
    aiApplications: [
      {
        title: 'Prediction workflows',
        body:
          'Many AI tools in operations are prediction tools: demand forecasting, follow-up risk estimation, document classification, service routing, or anomaly detection.',
      },
      {
        title: 'Workflow automation with safeguards',
        body:
          'An AI tool may help draft summaries, flag cases for review, or prioritize outreach. But in human-centered settings, automation should create support and efficiency, not remove accountability.',
      },
      {
        title: 'Interpretation in practice',
        body:
          'The technical result is never the final result. Teams still need to ask whether the model is understandable, whether the data is biased, whether the process changes behavior, and whether staff trust the output appropriately.',
      },
    ],
    refugeeUseCases: [
      {
        title: 'Use case: Outreach prioritization',
        body:
          'A model could estimate which families are most likely to need extra appointment support so that staff can proactively offer reminder calls, translated instructions, or transport coordination.',
      },
      {
        title: 'Use case: Capacity forecasting',
        body:
          'Historical arrivals, family composition, and service-need distributions could be used to estimate likely school enrollment, interpretation, or housing coordination demand in coming weeks.',
      },
      {
        title: 'Interpretation warning',
        body:
          'If a model learns from historically unequal service patterns, it may reproduce those patterns. For example, families who were under-documented in the past may appear “low need” simply because the data failed to capture their barriers.',
      },
    ],
    pythonLab: {
      title: 'Python Lab: Build features and a target in plain Python',
      snippet: `families = [\n    {"family_size": 5, "transport_barrier": 1, "missed_followup": 1},\n    {"family_size": 2, "transport_barrier": 0, "missed_followup": 0},\n    {"family_size": 6, "transport_barrier": 1, "missed_followup": 1},\n]\n\nfeatures = [[f["family_size"], f["transport_barrier"]] for f in families]\ntarget = [f["missed_followup"] for f in families]\n\nprint("Features:", features)\nprint("Target:", target)`,
      explanation:
        'This lab shows how rows of records become a simple feature matrix plus a target list, which is a core machine learning pattern.',
    },
    questions: [
      {
        prompt: 'What is the difference between features and target?',
        options: [
          'Features are inputs and target is the predicted outcome',
          'Features and target are the same thing',
          'Target is always the largest feature',
          'Features are only used after prediction',
        ],
        correctOption: 'Features are inputs and target is the predicted outcome',
        answer:
          'Features are the input variables used for learning. The target is the outcome the model is trying to predict.',
        explanation:
          'This distinction is central to supervised machine learning.',
      },
      {
        prompt: 'Why is accuracy alone often not enough?',
        options: [
          'Because important error types can still be harmful',
          'Because accuracy is never used in ML',
          'Because every model has identical tradeoffs',
          'Because accuracy only applies to regression tables',
        ],
        correctOption: 'Because important error types can still be harmful',
        answer:
          'Because a model can have strong overall accuracy while still making harmful mistakes on important or rare cases.',
        explanation:
          'Real evaluation depends on the type of error and the context of use.',
      },
      {
        prompt: 'Why must a human remain in the loop in resettlement-focused AI tools?',
        options: [
          'Because outputs do not capture full context and fairness concerns',
          'Because AI tools cannot produce outputs',
          'Because human review makes data unnecessary',
          'Because models should replace policy',
        ],
        correctOption: 'Because outputs do not capture full context and fairness concerns',
        answer:
          'Because model outputs do not capture full human context, fairness concerns, privacy issues, or operational judgment.',
        explanation:
          'Supportive human oversight is part of responsible AI, not an optional extra.',
      },
    ],
    miniProject: {
      title: 'Mini-Project: Design a responsible ML concept',
      brief:
        'Choose one refugee-resettlement workflow that might benefit from prediction or prioritization. Define the target, possible features, the intended supportive action, and the main risk if the model is wrong.',
      deliverable:
        'Write a short project proposal that includes one fairness risk, one data-quality risk, and one rule for keeping human oversight in the process.',
    },
  },
]

export const studySchedule: ScheduleDay[] = [
  {
    id: 'week-1',
    week: 'Week 1',
    title: 'Foundations and vocabulary',
    focus: 'Move slowly and build confidence with the language of data.',
    tasks: [
      'Complete the Home overview and Module 1.',
      'Write your own definition of row, column, variable, and output.',
      'Create one fictional intake table with at least five columns.',
    ],
  },
  {
    id: 'week-2',
    week: 'Week 2',
    title: 'Probability and Bayes',
    focus: 'Practice uncertainty without rushing through the formulas.',
    tasks: [
      'Complete Module 2.',
      'Use the Bayes calculator for one common event and one rare event.',
      'Write one explanation of why a positive alert is not the same as certainty.',
    ],
  },
  {
    id: 'week-3',
    week: 'Week 3',
    title: 'Descriptive statistics',
    focus: 'Learn how to tell the difference between average and typical.',
    tasks: [
      'Complete Module 3.',
      'Build a 10-value dataset and compare mean versus median.',
      'Identify whether an outlier changes the story.',
    ],
  },
  {
    id: 'week-4',
    week: 'Week 4',
    title: 'Matrices and structure',
    focus: 'Translate spreadsheets into machine-learning-ready shape.',
    tasks: [
      'Complete Module 4.',
      'Design one family-by-feature matrix and one county-by-service matrix.',
      'Write one paragraph on how matrices are used in AI.',
    ],
  },
  {
    id: 'week-5',
    week: 'Week 5',
    title: 'Python and ML workflow',
    focus: 'See how the whole pipeline fits together.',
    tasks: [
      'Complete Module 5.',
      'Write a tiny Python script that separates features from target.',
      'Draft a responsible ML use case in your field.',
    ],
  },
  {
    id: 'week-6',
    week: 'Week 6',
    title: 'Review and consolidation',
    focus: 'Use active recall and practice to lock in the concepts.',
    tasks: [
      'Review all exercises with hidden answers first.',
      'Take the final practice quiz.',
      'Rewrite the two concepts that still feel weakest in your own words.',
    ],
  },
]

export const finalQuiz: QuizQuestion[] = [
  {
    id: 'quiz-1',
    prompt: 'If 24 out of 40 families requested interpretation support, what is the probability a randomly selected family needs interpretation support?',
    options: ['0.24', '0.60', '24%', '40%'],
    answer: '0.60',
    explanation: 'Probability = 24 / 40 = 0.60, or 60%.',
  },
  {
    id: 'quiz-2',
    prompt: 'Which statistic usually gives the safer typical-case summary when one delay is much larger than all the others?',
    options: ['Median', 'Mode', 'Maximum', 'Range'],
    answer: 'Median',
    explanation: 'The median is less affected by outliers than the mean.',
  },
  {
    id: 'quiz-3',
    prompt: 'What does a family-by-feature matrix represent in machine learning?',
    options: [
      'A list of unrelated stories',
      'A numeric structure where rows are families and columns are features',
      'Only the final decisions made by staff',
      'A chart of yearly budgets only',
    ],
    answer: 'A numeric structure where rows are families and columns are features',
    explanation: 'This is the core tabular representation used in many ML workflows.',
  },
  {
    id: 'quiz-4',
    prompt: 'Why is a positive alert in a rare-event setting not equal to certainty?',
    options: [
      'Because the alert system is always useless',
      'Because false positives can still be numerous when the base rate is low',
      'Because rare events cannot be studied',
      'Because conditional probability does not apply to operations',
    ],
    answer: 'Because false positives can still be numerous when the base rate is low',
    explanation: 'This is the base-rate issue that Bayes Rule helps clarify.',
  },
  {
    id: 'quiz-5',
    prompt: 'What is the target in a supervised machine learning workflow?',
    options: [
      'The outcome the model is trying to predict',
      'The list of all features',
      'The code editor',
      'The spreadsheet title',
    ],
    answer: 'The outcome the model is trying to predict',
    explanation: 'The target is the label or outcome variable.',
  },
]

export const capstoneProject: CapstoneSection = {
  title: 'Capstone: Build a Support Planning Brief for a Refugee Resettlement Team',
  scenario:
    'A fictional refugee resettlement program wants a beginner-friendly data brief to plan school enrollment help, transport support, and follow-up outreach for new arrivals next month. The team is not asking for a full production model. It wants a careful analysis that could justify whether prediction support is useful and safe.',
  datasetColumns: [
    'family_id',
    'county',
    'family_size',
    'school_age_children',
    'interpretation_needed',
    'transport_barrier',
    'days_since_arrival',
    'prior_missed_followup',
    'housing_urgency_score',
    'missed_followup_target',
  ],
  moduleConnections: [
    'Foundations: define the question, the rows, the columns, and what the outcome means.',
    'Probability: estimate the chance of missed follow-up overall and under key conditions.',
    'Statistics: summarize typical wait times, common needs, and the spread in service burden.',
    'Matrices: convert the family-by-feature table into a numeric feature matrix.',
    'Python + ML: separate features from target and propose a safe prediction workflow.',
  ],
  tasks: [
    'Describe what one row represents and what each column contributes.',
    'Compute at least one overall probability and one conditional probability.',
    'Report one mean or median and explain why that summary was chosen.',
    'Sketch the feature matrix the model would see.',
    'Name one fairness risk, one data-quality risk, and one reason human review must stay in the loop.',
  ],
  deliverable:
    'Write a short planning brief or slide outline that explains the data, the math, the likely use case, and the limits of any AI support tool built from it.',
}
