import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    console.error('React Error Boundary:', error, errorInfo)
  }
  render() {
    if (this.state.error) {
      return (
        <div role="alert" style={{ padding: '2rem', color: '#dc2626', fontFamily: 'monospace' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error.toString()}</p>
          <pre style={{ fontSize: '12px', color: '#888', whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo?.componentStack}
          </pre>
          <button
            onClick={() => this.setState({ error: null, errorInfo: null })}
            style={{ padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '16px' }}
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
