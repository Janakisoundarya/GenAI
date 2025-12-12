# User Story to Tests Generator

A full-stack application that automatically generates comprehensive test cases from user stories using AI (Groq LLM) and integrates with Jira for seamless story management.

## 🚀 Features

- **AI-Powered Test Generation**: Converts user stories into detailed test cases using Groq's LLM
- **Jira Integration**: Connect to Jira and fetch user stories directly from your GENAI project
- **Automatic Form Population**: Link Jira stories to automatically populate form fields
- **Comprehensive Test Cases**: Generates test cases with multiple categories:
  - Positive test cases
  - Negative test cases
  - Edge cases
  - Authorization test cases
  - Non-functional test cases
- **Modern UI**: Clean, responsive interface built with React and TypeScript

## 🏗️ Architecture

This is a monorepo containing:
- **Backend**: Express.js API server with TypeScript
- **Frontend**: React application with Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git (for cloning the repository)
- Groq API key (for test generation)
- Jira account with API token (for Jira integration)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Janakisoundarya/GenAI.git
   cd GenAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=8080
   CORS_ORIGIN=http://localhost:5173
   NODE_ENV=development

   # Groq API Configuration
   groq_API_KEY=your_groq_api_key_here
   groq_API_BASE=https://api.groq.com/openai/v1
   groq_MODEL=llama3-8b-8192
   ```

   **To get your Groq API key:**
   - Visit https://console.groq.com/
   - Sign up or log in
   - Navigate to API Keys section
   - Create a new API key

4. **Frontend Environment (Optional)**
   
   Create `.env` file in the `frontend` directory if you need to customize the API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

## 🎯 Usage

### Development Mode

Run both backend and frontend concurrently:
```bash
npm run dev
```

This will start:
- **Backend server**: http://localhost:8080
- **Frontend application**: http://localhost:5173

### Individual Commands

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

### Production Build

**Build backend:**
```bash
cd backend
npm run build
npm start
```

**Build frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📖 How to Use

### Option 1: Manual Entry
1. Fill in the form fields:
   - Story Title (required)
   - Description (optional)
   - Acceptance Criteria (required)
   - Additional Info (optional)
2. Click "Generate" to create test cases

### Option 2: Jira Integration
1. Click "Connect Jira" button
2. Enter your Jira credentials:
   - Base URL: `https://janakisoundarya.atlassian.net/` (pre-filled)
   - Email: Your Jira account email
   - API Token: Your Jira API token
3. After successful connection, select a story from the GENAI project dropdown
4. Click "Link Story" to automatically populate the form
5. Review and edit the populated fields if needed
6. Click "Generate" to create test cases

**To get your Jira API token:**
- Go to https://id.atlassian.com/manage-profile/security/api-tokens
- Click "Create API token"
- Copy the generated token

## 🔌 API Endpoints

### Test Generation
- `POST /api/generate-tests` - Generate test cases from user story

### Jira Integration
- `POST /api/jira/connect` - Connect to Jira
- `GET /api/jira/stories` - Fetch stories from GENAI project
- `GET /api/jira/stories/:key` - Get story details by key

### Health Check
- `GET /api/health` - Server health status

## 🗂️ Project Structure

```
user-story-to-tests/
├── backend/
│   ├── src/
│   │   ├── llm/
│   │   │   └── groqClient.ts      # Groq API client
│   │   ├── routes/
│   │   │   ├── generate.ts        # Test generation routes
│   │   │   └── jira.ts            # Jira integration routes
│   │   ├── services/
│   │   │   └── jiraService.ts     # Jira service layer
│   │   ├── schemas.ts             # Zod validation schemas
│   │   ├── prompt.ts              # LLM prompt templates
│   │   └── server.ts              # Express server setup
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JiraConnection.tsx # Jira connection component
│   │   │   └── StorySelector.tsx  # Story selection component
│   │   ├── api.ts                 # API client functions
│   │   ├── types.ts               # TypeScript type definitions
│   │   ├── App.tsx                # Main application component
│   │   └── main.tsx               # Application entry point
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Zod** - Schema validation
- **node-fetch** - HTTP client
- **dotenv** - Environment variable management
- **Groq API** - LLM for test generation

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server

## 🔐 Security Notes

- API tokens are stored securely and never exposed to the frontend
- Environment variables are not committed to the repository
- CORS is configured to prevent unauthorized access

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary.

## 👤 Author

**Janaki Soundarya**
- GitHub: [@Janakisoundarya](https://github.com/Janakisoundarya)

## 🙏 Acknowledgments

- Groq for providing the LLM API
- Atlassian for Jira API

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Note**: Make sure to never commit your `.env` file or API keys to the repository!

