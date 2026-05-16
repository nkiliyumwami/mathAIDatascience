import type {
  Exercise,
  FAQItem,
  FoundationCard,
  GlossaryItem,
  LearnerProfile,
  MatrixRecord,
  RoadmapItem,
  ScenarioCase,
} from '@/types/course'

export const sectionOrder = [
  'welcome',
  'foundations',
  'probability',
  'statistics',
  'matrices',
  'ai-connections',
  'use-cases',
  'practice',
  'qa',
  'next-steps',
] as const

export const sectionTitles: Record<(typeof sectionOrder)[number], string> = {
  welcome: 'Welcome / Onboarding',
  foundations: 'Foundations Before the Math',
  probability: 'Probability',
  statistics: 'Descriptive Statistics',
  matrices: 'Matrices',
  'ai-connections': 'Applied AI Connections',
  'use-cases': 'Refugee Resettlement Use Cases',
  practice: 'Practice Zone',
  qa: 'Q&A / Misconceptions',
  'next-steps': 'Next Steps',
}

export const learnerProfiles: LearnerProfile[] = [
  {
    id: 'career-switcher',
    title: 'Career Switcher',
    description: 'You want the ideas to feel practical fast, not abstract or academic.',
  },
  {
    id: 'program-staff',
    title: 'Program Staff',
    description: 'You work with people and services and want better data confidence for planning.',
  },
  {
    id: 'community-leader',
    title: 'Community Leader',
    description: 'You need to interpret dashboards and AI claims without giving up human judgment.',
  },
  {
    id: 'curious-beginner',
    title: 'Curious Beginner',
    description: 'You are new to technical study and want intuition first, formulas second.',
  },
]

export const foundationCards: FoundationCard[] = [
  {
    title: 'AI is pattern-finding with guardrails',
    icon: 'brain',
    body: 'AI systems look for patterns in examples. In social-impact settings, the goal is not to hand decisions over to a machine. The goal is to support staff with better signals and better questions.',
  },
  {
    title: 'Machine learning learns from examples',
    icon: 'sparkles',
    body: 'A machine learning model does not “understand” people the way a case worker does. It learns mathematical relationships from historical examples and makes a probabilistic guess on new cases.',
  },
  {
    title: 'Data science helps teams see the full picture',
    icon: 'bar-chart-3',
    body: 'Data science organizes messy service data, summarizes patterns, and helps teams check whether resources match real community needs.',
  },
]

export const glossary: GlossaryItem[] = [
  {
    term: 'Probability',
    definition: 'A way of describing uncertainty with numbers between 0 and 1, or 0% and 100%.',
  },
  {
    term: 'Outlier',
    definition: 'A value that is unusually far from the rest of the data and can change summaries a lot.',
  },
  {
    term: 'Matrix',
    definition: 'A rectangular grid of numbers arranged in rows and columns.',
  },
  {
    term: 'Bias',
    definition: 'A systematic distortion in the data or method that can unfairly favor or disadvantage certain groups.',
  },
]

export const misconceptionCallouts = [
  {
    title: 'Misconception: You need advanced calculus before learning AI',
    body: 'For early AI learning, the critical need is intuition. Beginners benefit most from understanding uncertainty, summaries, and structured numeric data. Advanced math can come later.',
  },
  {
    title: 'Misconception: A prediction is the same as a decision',
    body: 'A prediction is one input into a decision. Human context, policy, privacy, and fairness all still matter.',
  },
  {
    title: 'Misconception: More data always means better answers',
    body: 'If the data is biased, incomplete, or inconsistently collected, more of it can simply scale the problem.',
  },
]

export const probabilityBuckets = [
  'Certain',
  'Likely',
  'Unlikely',
  'Impossible',
] as const

export const probabilitySortItems = [
  {
    id: 'prob-sort-1',
    label: 'A family already approved for school support will appear in the support roster',
    category: 'Certain',
  },
  {
    id: 'prob-sort-2',
    label: 'A Massachusetts winter day will require zero transportation planning adjustments',
    category: 'Unlikely',
  },
  {
    id: 'prob-sort-3',
    label: 'A newly arrived multilingual family may need interpretation at intake',
    category: 'Likely',
  },
  {
    id: 'prob-sort-4',
    label: 'A caseload planning dashboard will have negative arrivals for a month',
    category: 'Impossible',
  },
]

export const independenceItems = [
  {
    id: 'indep-1',
    label: 'Family size and whether a school enrollment packet is complete after staff review',
    category: 'Dependent',
  },
  {
    id: 'indep-2',
    label: 'Two separate random card draws with replacement from a language services deck',
    category: 'Independent',
  },
  {
    id: 'indep-3',
    label: 'Missing an appointment and lacking reminder text support',
    category: 'Dependent',
  },
  {
    id: 'indep-4',
    label: 'The result of one dice roll and the next roll of a fair die',
    category: 'Independent',
  },
]

export const serviceDatasets = {
  schoolEnrollmentDays: [4, 6, 7, 7, 8, 9, 10, 11, 12, 24],
  employmentAppointmentDays: [3, 4, 5, 6, 7, 7, 8, 9, 15, 19],
  rentAssistanceRequests: [550, 600, 620, 640, 650, 670, 700, 725, 760, 2400],
  familySizes: [2, 3, 3, 4, 4, 4, 5, 6, 6, 8],
}

export const chartData = [
  { month: 'Jan', arrivals: 18, appointmentsMissed: 5, interpretationHours: 22 },
  { month: 'Feb', arrivals: 22, appointmentsMissed: 6, interpretationHours: 24 },
  { month: 'Mar', arrivals: 31, appointmentsMissed: 7, interpretationHours: 27 },
  { month: 'Apr', arrivals: 28, appointmentsMissed: 4, interpretationHours: 23 },
  { month: 'May', arrivals: 35, appointmentsMissed: 8, interpretationHours: 31 },
]

export const countyDemandData = [
  { county: 'Suffolk', housing: 34, transport: 18, school: 29 },
  { county: 'Middlesex', housing: 24, transport: 14, school: 21 },
  { county: 'Worcester', housing: 18, transport: 12, school: 16 },
  { county: 'Hampden', housing: 14, transport: 10, school: 11 },
]

export const matrixRecords: MatrixRecord[] = [
  { familyId: 'F-101', languageNeeds: 1, transportNeeds: 1, schoolSupport: 1, housingUrgency: 3 },
  { familyId: 'F-102', languageNeeds: 0, transportNeeds: 1, schoolSupport: 0, housingUrgency: 2 },
  { familyId: 'F-103', languageNeeds: 1, transportNeeds: 0, schoolSupport: 1, housingUrgency: 1 },
  { familyId: 'F-104', languageNeeds: 1, transportNeeds: 1, schoolSupport: 0, housingUrgency: 2 },
]

export const useCases: ScenarioCase[] = [
  {
    id: 'case-housing',
    title: 'Housing prioritization support',
    story:
      'A team in western Massachusetts wants to identify which families may need faster housing search support next month. The fictional dataset shows family size, transportation barriers, and prior housing wait time.',
    learnerQuestion:
      'Which summary would be most helpful before building any AI support tool?',
    dataPoints: [
      { label: 'Median prior wait time', value: '41 days' },
      { label: 'Families with transport barriers', value: '38%' },
      { label: 'Families needing interpretation', value: '46%' },
    ],
    options: [
      'Check only the longest wait time and build a ranking from that',
      'Start with descriptive statistics, subgroup patterns, and fairness checks',
      'Ignore context because the model will learn everything automatically',
    ],
    answer: 'Start with descriptive statistics, subgroup patterns, and fairness checks',
    explanation:
      'Before prediction, the team needs a grounded view of the current system and whether key groups are represented fairly.',
    ethics:
      'Housing decisions affect stability and dignity. Any ranking tool must be reviewed for fairness, transparency, and the risk of amplifying incomplete case notes.',
  },
  {
    id: 'case-school',
    title: 'School enrollment demand planning',
    story:
      'A fictional Boston-area program wants to plan school enrollment support for newly arrived children over the next two months using recent arrivals and family composition data.',
    learnerQuestion:
      'What math idea is most useful for estimating how many new cases may need school support next month?',
    dataPoints: [
      { label: 'New arrivals last month', value: '35 families' },
      { label: 'Families with school-age children', value: '57%' },
      { label: 'Average enrollment support contacts', value: '3.2 per family' },
    ],
    options: [
      'Probability plus simple proportions',
      'Only matrix multiplication',
      'No math is needed because planners can guess',
    ],
    answer: 'Probability plus simple proportions',
    explanation:
      'Planners can estimate likely demand by combining recent arrivals with the proportion of families who need the service.',
    ethics:
      'Forecasts should support staffing, not treat families as identical. Staff should still review unusual cases and recent policy changes.',
  },
  {
    id: 'case-language',
    title: 'Language access planning',
    story:
      'A statewide fictional coalition wants to allocate interpreter hours across counties for Dari, Haitian Creole, Spanish, and Arabic.',
    learnerQuestion:
      'Which representation makes the county-by-language planning problem easiest to compare?',
    dataPoints: [
      { label: 'Counties tracked', value: '4' },
      { label: 'Languages tracked', value: '4' },
      { label: 'Monthly interpretation requests', value: '128 total' },
    ],
    options: ['A narrative memo only', 'A county-by-language matrix', 'A single average with no breakdown'],
    answer: 'A county-by-language matrix',
    explanation:
      'A matrix makes it easier to compare rows, columns, totals, and service imbalances across counties and languages.',
    ethics:
      'Language data is operationally helpful, but it should never be used to stereotype communities or deny service options.',
  },
  {
    id: 'case-referrals',
    title: 'Referral follow-up analysis',
    story:
      'A fictional nonprofit reviews referral outcomes for transportation assistance. Some families miss appointments because the route is complicated, while others miss because the referral was never confirmed.',
    learnerQuestion:
      'Why would a probability estimate alone be insufficient for action?',
    dataPoints: [
      { label: 'Missed follow-up rate', value: '21%' },
      { label: 'Cases with incomplete contact info', value: '17%' },
      { label: 'Cases with interpretation requested', value: '33%' },
    ],
    options: [
      'Because different causes of missed follow-up need different interventions',
      'Because probability should never be used in service work',
      'Because averages are always better than predictions',
    ],
    answer: 'Because different causes of missed follow-up need different interventions',
    explanation:
      'A single risk score can hide very different operational problems. Good practice combines predictions with human review and service context.',
    ethics:
      'Incomplete data can systematically disadvantage families with unstable housing or communication barriers. Missingness itself can reflect inequity.',
  },
]

export const faqs: FAQItem[] = [
  {
    question: 'Do I need advanced math for AI?',
    answer:
      'No. To start well, you need intuition about uncertainty, summaries, and structured numeric data. Advanced math can come later once the basics feel familiar.',
  },
  {
    question: 'What is the difference between mean and median?',
    answer:
      'The mean is the arithmetic average. The median is the middle value when the numbers are ordered. Median is often safer when outliers are present.',
  },
  {
    question: 'Why does probability matter?',
    answer:
      'AI predictions are rarely certainties. Probability helps staff understand how confident a system is and where caution is needed.',
  },
  {
    question: 'Are matrices just tables?',
    answer:
      'They are closely related. A matrix is a table-like structure of numbers, often used because machine learning systems need numeric structure for computation.',
  },
  {
    question: 'Why do outliers matter?',
    answer:
      'One unusual value can distort an average and change the story you tell. Outliers can also point to true special cases that need attention.',
  },
  {
    question: 'Can AI predictions be wrong?',
    answer:
      'Yes. Predictions can be wrong because the data is noisy, incomplete, biased, or because conditions have changed since the model was trained.',
  },
  {
    question: 'Can statistics reinforce bias?',
    answer:
      'Yes. If the underlying data reflects unequal access, inconsistent documentation, or policy bias, the summaries and models built on it can reinforce those patterns.',
  },
  {
    question: 'What if the data is incomplete or messy?',
    answer:
      'That is normal in real service settings. It means teams need careful data cleaning, uncertainty awareness, and humility before turning numbers into decisions.',
  },
]

export const roadmap: RoadmapItem[] = [
  {
    title: 'Python basics',
    description: 'Learn variables, lists, loops, and functions so the examples in this course become easy to extend.',
    action: 'Build one tiny notebook that summarizes fictional caseload data.',
  },
  {
    title: 'Data cleaning',
    description: 'Study missing values, inconsistent categories, and messy date formats because service data is rarely tidy.',
    action: 'Practice standardizing a fictional intake spreadsheet.',
  },
  {
    title: 'Visualization and dashboards',
    description: 'Learn how charts support planning, communication, and accountability across programs.',
    action: 'Recreate a monthly arrivals and support-needs dashboard.',
  },
  {
    title: 'Machine learning basics',
    description: 'Move from descriptive analysis into classification, forecasting, evaluation, and model risk.',
    action: 'Start with simple classifiers and focus on interpretation before optimization.',
  },
  {
    title: 'AI ethics',
    description: 'Learn fairness, privacy, documentation, transparency, and when not to automate.',
    action: 'Write a short ethics checklist for a fictional prioritization tool.',
  },
  {
    title: 'Social-impact projects',
    description: 'Apply the math to realistic nonprofit, community, and public-service questions.',
    action: 'Design a small project around housing support, school enrollment, or transportation planning.',
  },
]

export const exercises: Exercise[] = [
  {
    id: 'found-1',
    moduleId: 'foundations',
    difficulty: 'Beginner',
    type: 'multiple-choice',
    prompt: 'What is the best beginner definition of machine learning in this course?',
    options: [
      'A system that memorizes every rule exactly once',
      'A way for computers to learn patterns from examples',
      'Any spreadsheet with formulas in it',
      'A guarantee that future cases will match the past',
    ],
    answer: 'A way for computers to learn patterns from examples',
    hint: 'Think patterns, not certainty.',
    explanation:
      'Machine learning is about learning relationships from examples so a system can make a guess on new cases.',
  },
  {
    id: 'found-2',
    moduleId: 'foundations',
    difficulty: 'Beginner',
    type: 'true-false',
    prompt: 'True or false: You must master advanced calculus before AI concepts can make sense.',
    answer: false,
    hint: 'This course starts with intuition first.',
    explanation:
      'Beginners can productively start with probability, descriptive statistics, and structured data without advanced math.',
  },
  {
    id: 'found-3',
    moduleId: 'foundations',
    difficulty: 'Beginner Plus',
    type: 'fill-blank',
    prompt: 'Probability helps answer “How ______ is this outcome?”',
    acceptableAnswers: ['likely', 'probable'],
    placeholder: 'type one word',
    hint: 'It is a question about uncertainty.',
    explanation: 'Probability is the language of likelihood under uncertainty.',
  },
  {
    id: 'prob-1',
    moduleId: 'probability',
    difficulty: 'Beginner',
    type: 'multiple-choice',
    prompt: 'If 60 out of 100 fictional families need school enrollment support, what is the probability a randomly selected family needs it?',
    options: ['0.06', '0.6', '6', '60'],
    answer: '0.6',
    hint: 'Probability is favorable outcomes divided by total outcomes.',
    explanation: '60 / 100 = 0.6, or 60%.',
  },
  {
    id: 'prob-2',
    moduleId: 'probability',
    difficulty: 'Beginner',
    type: 'sorting',
    prompt: 'Drag each statement into the right probability bucket.',
    categories: [...probabilityBuckets],
    items: probabilitySortItems,
    hint: 'Use common sense and the meaning of the categories.',
    explanation:
      'This exercise builds intuition before formulas. Some events are guaranteed, some impossible, and many sit between.',
  },
  {
    id: 'prob-3',
    moduleId: 'probability',
    difficulty: 'Beginner Plus',
    type: 'sorting',
    prompt: 'Sort the examples into Independent or Dependent.',
    categories: ['Independent', 'Dependent'],
    items: independenceItems,
    hint: 'Ask whether one event changes the chance of the other.',
    explanation:
      'Independent events do not affect each other. Dependent events do.',
  },
  {
    id: 'prob-4',
    moduleId: 'probability',
    difficulty: 'Beginner Plus',
    type: 'multiple-choice',
    prompt: 'Which scenario is a conditional probability question?',
    options: [
      'How many families arrived this month?',
      'What is the chance a family needs interpretation given that the primary intake language was not English?',
      'What is the average family size?',
      'How many counties are in the dashboard?',
    ],
    answer:
      'What is the chance a family needs interpretation given that the primary intake language was not English?',
    hint: 'Look for the “given that” structure.',
    explanation:
      'Conditional probability asks about one event in the context of another event already being known.',
  },
  {
    id: 'prob-5',
    moduleId: 'probability',
    difficulty: 'Challenge',
    type: 'fill-blank',
    prompt: 'In Bayes-like reasoning, when the condition is rare, a positive test can still be weak because of ______ positives.',
    acceptableAnswers: ['false', 'false positives'],
    hint: 'The issue comes from the healthy group.',
    explanation:
      'Rare conditions can produce many false positives relative to the small number of true positives.',
  },
  {
    id: 'prob-6',
    moduleId: 'probability',
    difficulty: 'Challenge',
    type: 'true-false',
    prompt: 'True or false: If an appointment reminder system lowers missed visits, that means missed visits and reminders were probably unrelated.',
    answer: false,
    hint: 'Interventions affect dependent processes.',
    explanation:
      'If reminders change the outcome, the events are not independent in practice.',
  },
  {
    id: 'stats-1',
    moduleId: 'statistics',
    difficulty: 'Beginner',
    type: 'multiple-choice',
    prompt: 'Which metric is usually safer when one family had an extremely unusual rent assistance amount?',
    options: ['Median', 'Mean', 'Random guess', 'Matrix total'],
    answer: 'Median',
    hint: 'Think about outliers.',
    explanation:
      'The median is less sensitive to extreme values than the mean, so it often tells a fairer “typical case” story.',
  },
  {
    id: 'stats-2',
    moduleId: 'statistics',
    difficulty: 'Beginner',
    type: 'true-false',
    prompt: 'True or false: Descriptive statistics explain what happened in the data you already have.',
    answer: true,
    hint: 'These are summary tools.',
    explanation:
      'Descriptive statistics summarize the data in front of you rather than predicting the future by themselves.',
  },
  {
    id: 'stats-3',
    moduleId: 'statistics',
    difficulty: 'Beginner Plus',
    type: 'fill-blank',
    prompt: 'The difference between the maximum and minimum value is called the ______.',
    acceptableAnswers: ['range'],
    hint: 'It is a simple spread measure.',
    explanation: 'Range = maximum minus minimum.',
  },
  {
    id: 'stats-4',
    moduleId: 'statistics',
    difficulty: 'Challenge',
    type: 'multiple-choice',
    prompt: 'If monthly arrivals are [18, 22, 31, 28, 35], what is the best first visual for seeing the month-to-month pattern?',
    options: ['Line chart', 'One pie chart', 'Scatter of family IDs', 'No chart at all'],
    answer: 'Line chart',
    hint: 'These are values ordered over time.',
    explanation:
      'A line chart shows sequential change clearly when the values are ordered across months.',
  },
  {
    id: 'stats-5',
    moduleId: 'statistics',
    difficulty: 'Challenge',
    type: 'multiple-choice',
    prompt: 'A program director asks for the “most common” primary language in a caseload. Which descriptive statistic fits?',
    options: ['Mean', 'Mode', 'Median', 'Range'],
    answer: 'Mode',
    hint: 'It is about the most frequent category.',
    explanation: 'Mode is the most common value or category.',
  },
  {
    id: 'matrix-1',
    moduleId: 'matrices',
    difficulty: 'Beginner',
    type: 'multiple-choice',
    prompt: 'In a family-by-service matrix, what does each row usually represent?',
    options: ['One service', 'One family', 'One probability formula', 'One fiscal year'],
    answer: 'One family',
    hint: 'Rows often represent entities.',
    explanation: 'Rows commonly represent cases, families, or records, while columns represent features or services.',
  },
  {
    id: 'matrix-2',
    moduleId: 'matrices',
    difficulty: 'Beginner',
    type: 'true-false',
    prompt: 'True or false: Matrices matter in AI because models need structured numeric inputs.',
    answer: true,
    hint: 'Think about computation.',
    explanation:
      'Matrices make it possible to compute across many examples and many features efficiently.',
  },
  {
    id: 'matrix-3',
    moduleId: 'matrices',
    difficulty: 'Beginner Plus',
    type: 'matching',
    prompt: 'Match each matrix term to the best description.',
    pairs: [
      { left: 'Row', right: 'One record or case across several features' },
      { left: 'Column', right: 'One feature measured across many records' },
      { left: 'Cell', right: 'A single numeric value in the grid' },
    ],
    options: [
      'A single numeric value in the grid',
      'One feature measured across many records',
      'One record or case across several features',
    ],
    hint: 'Think spreadsheet structure.',
    explanation:
      'Matrix language becomes natural once you connect it to tables and spreadsheets you already know.',
  },
  {
    id: 'matrix-4',
    moduleId: 'matrices',
    difficulty: 'Challenge',
    type: 'fill-blank',
    prompt: 'If you add another service type to a family-by-service matrix, you add a new ______.',
    acceptableAnswers: ['column'],
    hint: 'You are adding a new feature.',
    explanation:
      'New features are usually added as columns when each row is still one family.',
  },
  {
    id: 'connections-1',
    moduleId: 'ai-connections',
    difficulty: 'Beginner Plus',
    type: 'matching',
    prompt: 'Match each math idea to the AI use case it most directly supports.',
    pairs: [
      { left: 'Probability', right: 'Estimating the chance a referral follow-up is missed' },
      { left: 'Descriptive statistics', right: 'Summarizing average wait times before planning staff coverage' },
      { left: 'Matrices', right: 'Representing families and services for a matching model' },
    ],
    options: [
      'Estimating the chance a referral follow-up is missed',
      'Representing families and services for a matching model',
      'Summarizing average wait times before planning staff coverage',
    ],
    hint: 'One is about uncertainty, one about summaries, and one about structure.',
    explanation:
      'The three ideas often work together, but each has a primary role in an AI workflow.',
  },
  {
    id: 'connections-2',
    moduleId: 'ai-connections',
    difficulty: 'Challenge',
    type: 'true-false',
    prompt: 'True or false: Human-centered programs should use AI outputs without policy review if the model accuracy is high.',
    answer: false,
    hint: 'Accuracy is not the same as safety or fairness.',
    explanation:
      'High accuracy does not remove the need for privacy review, fairness checks, documentation, and human oversight.',
  },
  {
    id: 'practice-1',
    moduleId: 'practice',
    difficulty: 'Beginner',
    type: 'multiple-choice',
    prompt: 'A referral success rate of 80% means what?',
    options: [
      'Every referral will succeed',
      'About 8 in 10 referrals succeeded in the observed data',
      'No more data review is needed',
      'The median success is 80 families',
    ],
    answer: 'About 8 in 10 referrals succeeded in the observed data',
    hint: 'Interpret the percentage plainly.',
    explanation: 'A success rate is a proportion, not a guarantee.',
  },
  {
    id: 'practice-2',
    moduleId: 'practice',
    difficulty: 'Beginner',
    type: 'true-false',
    prompt: 'True or false: If two families both have high need scores, they must need the same intervention.',
    answer: false,
    hint: 'Scores can hide different reasons.',
    explanation:
      'Two high scores can come from different underlying needs. Human review is still necessary.',
  },
  {
    id: 'practice-3',
    moduleId: 'practice',
    difficulty: 'Beginner',
    type: 'fill-blank',
    prompt: 'When one very large value pulls the average upward, that value is often called an ______.',
    acceptableAnswers: ['outlier'],
    hint: 'It is unusually far from the rest.',
    explanation: 'Outliers can strongly affect means and deserve extra interpretation.',
  },
  {
    id: 'practice-4',
    moduleId: 'practice',
    difficulty: 'Beginner Plus',
    type: 'multiple-choice',
    prompt: 'Which measure best answers “How many appointment days do we usually see?” when the data includes one very long delay?',
    options: ['Median', 'Maximum', 'Range', 'Matrix size'],
    answer: 'Median',
    hint: 'Protect the “typical” answer from the outlier.',
    explanation:
      'Median is often the strongest choice when you want a typical value and the dataset has extreme values.',
  },
  {
    id: 'practice-5',
    moduleId: 'practice',
    difficulty: 'Beginner Plus',
    type: 'matching',
    prompt: 'Match the scenario to the best math idea.',
    pairs: [
      { left: 'Chance a transportation referral is accepted', right: 'Probability' },
      { left: 'Summarize monthly arrivals by county', right: 'Descriptive statistics' },
      { left: 'Represent family-service features numerically', right: 'Matrices' },
    ],
    options: ['Probability', 'Descriptive statistics', 'Matrices'],
    hint: 'Think uncertainty, summary, or structure.',
    explanation:
      'This is the core conceptual map of the course.',
  },
  {
    id: 'practice-6',
    moduleId: 'practice',
    difficulty: 'Beginner Plus',
    type: 'multiple-choice',
    prompt: 'A county dashboard shows a large increase in interpretation demand. What should happen first?',
    options: [
      'Deploy an AI tool immediately without review',
      'Check the data quality, context, and whether the increase reflects a real operational need',
      'Ignore it because one chart can never matter',
      'Average it with last year and stop there',
    ],
    answer:
      'Check the data quality, context, and whether the increase reflects a real operational need',
    hint: 'Human-centered interpretation comes first.',
    explanation:
      'Good analytics starts with validation and contextual understanding, especially in sensitive service settings.',
  },
  {
    id: 'practice-7',
    moduleId: 'practice',
    difficulty: 'Challenge',
    type: 'multiple-choice',
    prompt: 'If a service-matching matrix has 40 families and 6 service features, what is its shape?',
    options: ['6 × 40', '40 × 6', '46 × 1', '40 × 40'],
    answer: '40 × 6',
    hint: 'Rows are families here.',
    explanation: 'With families as rows and services as columns, the shape is 40 × 6.',
  },
  {
    id: 'practice-8',
    moduleId: 'practice',
    difficulty: 'Challenge',
    type: 'true-false',
    prompt: 'True or false: Statistics can reinforce bias if the source data reflects unequal access or inconsistent documentation.',
    answer: true,
    hint: 'Think beyond the formula.',
    explanation:
      'Numbers do not erase bias. If the source process is inequitable, the summaries can reproduce that inequity.',
  },
  {
    id: 'practice-9',
    moduleId: 'practice',
    difficulty: 'Challenge',
    type: 'fill-blank',
    prompt: 'A prediction should support human judgment, not ______ it.',
    acceptableAnswers: ['replace'],
    hint: 'This is a major ethics theme across the course.',
    explanation:
      'In community-facing settings, AI should support staff judgment rather than replace it.',
  },
  {
    id: 'practice-10',
    moduleId: 'practice',
    difficulty: 'Challenge',
    type: 'multiple-choice',
    prompt: 'Why might a missed-appointment prediction model underperform after a new transportation partner is added?',
    options: [
      'Because the world changed and the historical patterns may no longer fit',
      'Because matrices stop working over time',
      'Because mean and median are identical',
      'Because conditional probability never applies in planning',
    ],
    answer: 'Because the world changed and the historical patterns may no longer fit',
    hint: 'Think model drift and changing conditions.',
    explanation:
      'Operational changes can make historical patterns less relevant, so teams need monitoring and recalibration.',
  },
  {
    id: 'practice-11',
    moduleId: 'practice',
    difficulty: 'Challenge',
    type: 'multiple-choice',
    prompt: 'Which question is most directly answered by descriptive statistics?',
    options: [
      'What is the average time from arrival to first housing orientation?',
      'Will every family make the next appointment?',
      'Is this model definitely fair?',
      'What is the symbolic meaning of the data?',
    ],
    answer: 'What is the average time from arrival to first housing orientation?',
    hint: 'Look for a summary question.',
    explanation:
      'Descriptive statistics summarize observed data, such as averages, medians, and ranges.',
  },
  {
    id: 'practice-12',
    moduleId: 'practice',
    difficulty: 'Beginner Plus',
    type: 'sorting',
    prompt: 'Sort the statements into the main idea they belong to.',
    categories: ['Probability', 'Descriptive Statistics', 'Matrices'],
    items: [
      { id: 'pz-s1', label: 'Chance that interpretation is needed', category: 'Probability' },
      { id: 'pz-s2', label: 'Median days to housing placement', category: 'Descriptive Statistics' },
      { id: 'pz-s3', label: 'Family-by-service numeric grid', category: 'Matrices' },
      { id: 'pz-s4', label: 'Average monthly arrivals by county', category: 'Descriptive Statistics' },
      { id: 'pz-s5', label: 'Probability a reminder text lowers no-shows', category: 'Probability' },
      { id: 'pz-s6', label: 'County-by-language planning table', category: 'Matrices' },
    ],
    hint: 'Ask whether the statement is about uncertainty, summarizing, or numeric structure.',
    explanation:
      'This exercise reinforces the boundaries between the three big mathematical ideas in the session.',
  },
]
