export type Difficulty = 'Beginner' | 'Beginner Plus' | 'Challenge'

export type ExerciseType =
  | 'multiple-choice'
  | 'true-false'
  | 'fill-blank'
  | 'matching'
  | 'sorting'

export interface ExerciseBase {
  id: string
  moduleId: string
  difficulty: Difficulty
  type: ExerciseType
  prompt: string
  hint: string
  explanation: string
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: 'multiple-choice'
  options: string[]
  answer: string
}

export interface TrueFalseExercise extends ExerciseBase {
  type: 'true-false'
  answer: boolean
}

export interface FillBlankExercise extends ExerciseBase {
  type: 'fill-blank'
  acceptableAnswers: string[]
  placeholder?: string
}

export interface MatchingPair {
  left: string
  right: string
}

export interface MatchingExercise extends ExerciseBase {
  type: 'matching'
  pairs: MatchingPair[]
  options: string[]
}

export interface SortingItem {
  id: string
  label: string
  category: string
}

export interface SortingExercise extends ExerciseBase {
  type: 'sorting'
  categories: string[]
  items: SortingItem[]
}

export type Exercise =
  | MultipleChoiceExercise
  | TrueFalseExercise
  | FillBlankExercise
  | MatchingExercise
  | SortingExercise

export interface LearnerProfile {
  id: string
  title: string
  description: string
}

export interface FoundationCard {
  title: string
  icon: 'brain' | 'sparkles' | 'bar-chart-3'
  body: string
}

export interface GlossaryItem {
  term: string
  definition: string
}

export interface ScenarioCase {
  id: string
  title: string
  story: string
  learnerQuestion: string
  dataPoints: { label: string; value: string }[]
  options: string[]
  answer: string
  explanation: string
  ethics: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface RoadmapItem {
  title: string
  description: string
  action: string
}

export interface MatrixRecord {
  familyId: string
  languageNeeds: number
  transportNeeds: number
  schoolSupport: number
  housingUrgency: number
}
