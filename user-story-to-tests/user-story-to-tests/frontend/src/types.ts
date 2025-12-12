export interface GenerateRequest {
  storyTitle: string
  acceptanceCriteria: string
  description?: string
  additionalInfo?: string
}

export interface TestCase {
  id: string
  title: string
  steps: string[]
  testData?: string
  expectedResult: string
  category: string
}

export interface GenerateResponse {
  cases: TestCase[]
  model?: string
  promptTokens: number
  completionTokens: number
}

export interface JiraConnectRequest {
  baseUrl: string
  email: string
  apiToken: string
}

export interface JiraStory {
  id: string
  key: string
  summary: string
}

export interface JiraStoriesResponse {
  stories: JiraStory[]
}

export interface JiraStoryDetails {
  key: string
  title: string
  description?: string
  acceptanceCriteria?: string
}