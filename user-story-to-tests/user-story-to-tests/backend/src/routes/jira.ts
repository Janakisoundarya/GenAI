import express from 'express'
import { jiraService } from '../services/jiraService'
import { 
  JiraConnectRequestSchema, 
  JiraStoriesResponseSchema,
  JiraStoryDetailsSchema 
} from '../schemas'

export const jiraRouter = express.Router()

// POST /api/jira/connect
jiraRouter.post('/connect', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const validationResult = JiraConnectRequestSchema.safeParse(req.body)
    
    if (!validationResult.success) {
      res.status(400).json({
        error: `Validation error: ${validationResult.error.message}`
      })
      return
    }

    const { baseUrl, email, apiToken } = validationResult.data

    // Set Jira configuration
    jiraService.setConfig({ baseUrl, email, apiToken })

    // Test connection
    try {
      await jiraService.testConnection()
      res.json({ 
        success: true, 
        message: 'Successfully connected to Jira' 
      })
    } catch (error) {
      res.status(401).json({
        error: 'Failed to connect to Jira. Please check your credentials.'
      })
      return
    }
  } catch (error) {
    console.error('Error in Jira connect:', error)
    res.status(500).json({
      error: 'Internal server error'
    })
  }
})

// GET /api/jira/stories
jiraRouter.get('/stories', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const projectKey = 'GENAI' // Hardcoded as per requirements
    
    const issues = await jiraService.getStoriesFromProject(projectKey)
    
    const stories = issues.map(issue => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary || ''
    }))

    const response = { stories }
    const validationResult = JiraStoriesResponseSchema.safeParse(response)
    
    if (!validationResult.success) {
      res.status(500).json({
        error: 'Invalid response format'
      })
      return
    }

    res.json(validationResult.data)
  } catch (error) {
    console.error('Error fetching Jira stories:', error)
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch stories'
    })
  }
})

// GET /api/jira/stories/:key
jiraRouter.get('/stories/:key', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { key } = req.params
    
    const issue = await jiraService.getStoryDetails(key)
    
    // Convert description from ADF to text if needed
    const descriptionRaw = issue.fields.description || ''
    const description = typeof descriptionRaw === 'string' 
      ? descriptionRaw 
      : jiraService.convertAdfToText(descriptionRaw)
    const acceptanceCriteria = jiraService.extractAcceptanceCriteria(issue.fields.description)
    
    const storyDetails = {
      key: issue.key,
      title: issue.fields.summary || '',
      description: description,
      acceptanceCriteria: acceptanceCriteria
    }

    const validationResult = JiraStoryDetailsSchema.safeParse(storyDetails)
    
    if (!validationResult.success) {
      res.status(500).json({
        error: 'Invalid response format'
      })
      return
    }

    res.json(validationResult.data)
  } catch (error) {
    console.error(`Error fetching story ${req.params.key}:`, error)
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch story details'
    })
  }
})

