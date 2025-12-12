import fetch from 'node-fetch'

export interface JiraConfig {
  baseUrl: string
  email: string
  apiToken: string
}

export interface JiraIssue {
  id: string
  key: string
  fields: {
    summary: string
    description?: string | any // Can be string or Atlassian Document Format object
    [key: string]: any
  }
}

export class JiraService {
  private config: JiraConfig | null = null

  setConfig(config: JiraConfig): void {
    this.config = config
  }

  private getAuthHeader(): string {
    if (!this.config) {
      throw new Error('Jira not configured. Please connect first.')
    }
    const auth = Buffer.from(`${this.config.email}:${this.config.apiToken}`).toString('base64')
    return `Basic ${auth}`
  }

  private async makeRequest(endpoint: string, options: { method?: string; body?: any } = {}): Promise<any> {
    if (!this.config) {
      throw new Error('Jira not configured. Please connect first.')
    }

    const url = `${this.config.baseUrl.replace(/\/$/, '')}${endpoint}`
    const fetchOptions: any = {
      method: options.method || 'GET',
      headers: {
        'Authorization': this.getAuthHeader(),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body)
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Jira API error: ${response.status} ${response.statusText}. ${errorText}`)
    }

    return response.json()
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.makeRequest('/rest/api/3/myself')
      return true
    } catch (error) {
      console.error('Jira connection test failed:', error)
      throw error
    }
  }

  async getStoriesFromProject(projectKey: string): Promise<JiraIssue[]> {
    try {
      // JQL query to get all issues from GENAI project
      const jql = `project = ${projectKey} ORDER BY key DESC`
      
      // Use the new /rest/api/3/search/jql endpoint with POST
      const response = await this.makeRequest('/rest/api/3/search/jql', {
        method: 'POST',
        body: {
          jql: jql,
          fields: ['id', 'key', 'summary'],
          maxResults: 100
        }
      })
      
      return response.issues || []
    } catch (error) {
      console.error('Failed to fetch Jira stories:', error)
      throw error
    }
  }

  async getStoryDetails(issueKey: string): Promise<JiraIssue> {
    try {
      const response = await this.makeRequest(`/rest/api/3/issue/${issueKey}?fields=id,key,summary,description`)
      return response
    } catch (error) {
      console.error(`Failed to fetch story ${issueKey}:`, error)
      throw error
    }
  }

  /**
   * Converts Jira's Atlassian Document Format (ADF) to plain text
   */
  convertAdfToText(adf: any): string {
    if (!adf) return ''
    if (typeof adf === 'string') return adf
    
    // Handle Atlassian Document Format
    if (adf.type === 'doc' && adf.content) {
      return this.extractTextFromAdfContent(adf.content)
    }
    
    return ''
  }

  private extractTextFromAdfContent(content: any[]): string {
    let text = ''
    
    for (const node of content) {
      if (node.type === 'paragraph' && node.content) {
        for (const paraNode of node.content) {
          if (paraNode.type === 'text' && paraNode.text) {
            text += paraNode.text
          } else if (paraNode.type === 'hardBreak') {
            text += '\n'
          }
        }
        text += '\n'
      } else if (node.type === 'bulletList' || node.type === 'orderedList') {
        if (node.content) {
          for (const listItem of node.content) {
            if (listItem.content) {
              for (const para of listItem.content) {
                if (para.type === 'paragraph' && para.content) {
                  text += '• '
                  for (const paraNode of para.content) {
                    if (paraNode.type === 'text' && paraNode.text) {
                      text += paraNode.text
                    }
                  }
                  text += '\n'
                }
              }
            }
          }
        }
      } else if (node.type === 'hardBreak') {
        text += '\n'
      }
    }
    
    return text.trim()
  }

  extractAcceptanceCriteria(description: string | any | undefined): string {
    if (!description) return ''
    
    // Convert ADF to text if needed
    const descriptionText = this.convertAdfToText(description)
    if (!descriptionText) return ''
    
    // Try to extract acceptance criteria from description
    // Common patterns: "Acceptance Criteria:", "AC:", etc.
    const patterns = [
      /Acceptance Criteria:?\s*\n([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i,
      /AC:?\s*\n([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i,
      /Acceptance:?\s*\n([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i
    ]

    for (const pattern of patterns) {
      const match = descriptionText.match(pattern)
      if (match && match[1]) {
        return match[1].trim()
      }
    }

    // If no specific section found, return description
    return descriptionText
  }
}

// Singleton instance
export const jiraService = new JiraService()

