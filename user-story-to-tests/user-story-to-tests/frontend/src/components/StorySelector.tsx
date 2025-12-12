import { useState, useEffect } from 'react'
import { getJiraStories, getJiraStoryDetails } from '../api'
import { JiraStory, JiraStoryDetails } from '../types'

interface StorySelectorProps {
  onStoryLinked: (details: JiraStoryDetails) => void
}

export function StorySelector({ onStoryLinked }: StorySelectorProps) {
  const [stories, setStories] = useState<JiraStory[]>([])
  const [selectedKey, setSelectedKey] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await getJiraStories()
      setStories(response.stories)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stories')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLinkStory = async () => {
    if (!selectedKey) return

    setIsLoadingDetails(true)
    setError(null)
    setSuccessMessage(null)
    try {
      const details = await getJiraStoryDetails(selectedKey)
      onStoryLinked(details)
      setSuccessMessage(`Story ${details.key} linked successfully! Form fields have been populated.`)
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load story details')
    } finally {
      setIsLoadingDetails(false)
    }
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Select Jira Story</h2>

      {error && (
        <div style={{
          background: '#e74c3c',
          color: 'white',
          padding: '15px',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div style={{
          background: '#27ae60',
          color: 'white',
          padding: '15px',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          {successMessage}
        </div>
      )}

      {isLoading ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          Loading stories from GENAI project...
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#2c3e50'
            }}>
              Select Story
            </label>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e8ed',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="">-- Select a story --</option>
              {stories.map((story) => (
                <option key={story.id} value={story.key}>
                  {story.key} - {story.summary}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleLinkStory}
            disabled={!selectedKey || isLoadingDetails}
            style={{
              background: selectedKey ? '#27ae60' : '#bdc3c7',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: selectedKey && !isLoadingDetails ? 'pointer' : 'not-allowed',
              opacity: selectedKey && !isLoadingDetails ? 1 : 0.6
            }}
          >
            {isLoadingDetails ? 'Loading...' : 'Link Story'}
          </button>
        </>
      )}
    </div>
  )
}


