import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render(path) {
  return renderToString(
    <StrictMode>
      <App ssrPath={path} />
    </StrictMode>
  )
}
