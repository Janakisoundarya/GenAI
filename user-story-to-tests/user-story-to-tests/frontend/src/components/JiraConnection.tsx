import { useState } from 'react'
import { connectJira } from '../api'
import { JiraConnectRequest } from '../types'

interface JiraConnectionProps {
  onConnectSuccess: () => void
}

export function JiraConnection({ onConnectSuccess }: JiraConnectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<JiraConnectRequest>({
    baseUrl: 'https://janakisoundarya.atlassian.net/',
    email: '',
    apiToken: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await connectJira(formData)
      setIsOpen(false)
      onConnectSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Jira')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: '#0052CC',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Connect Jira
      </button>
    )
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Connect to Jira</h2>
      
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

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '8px',
            color: '#2c3e50'
          }}>
            Base URL
          </label>
          <input
            type="text"
            value={formData.baseUrl}
            onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e8ed',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '8px',
            color: '#2c3e50'
          }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e8ed',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontWeight: 600,
            marginBottom: '8px',
            color: '#2c3e50'
          }}>
            API Token
          </label>
          <input
            type="password"
            value={formData.apiToken}
            onChange={(e) => setFormData({ ...formData, apiToken: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e8ed',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            required
          />
          <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
            Get your API token from{' '}
            <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noopener noreferrer">
              Atlassian Account Settings
            </a>
          </small>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: '#0052CC',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              setError(null)
            }}
            style={{
              background: '#e1e8ed',
              color: '#2c3e50',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}


