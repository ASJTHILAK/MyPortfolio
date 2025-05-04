import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Error boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          color: '#fff',
          background: '#000010' 
        }}>
          <h2>Something went wrong.</h2>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#4a90e2',
              border: 'none',
              borderRadius: '5px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create root with concurrent features enabled
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render with Suspense and Error Boundary
root.render(
  <ErrorBoundary>
    <Suspense fallback={
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000010',
        color: '#fff'
      }}>
        Loading...
      </div>
    }>
      <App />
    </Suspense>
  </ErrorBoundary>
);
