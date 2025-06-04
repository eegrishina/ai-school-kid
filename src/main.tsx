import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux"
import { store } from "./app/store.ts"
import { ThemeProvider } from 'styled-components'
import { theme } from "./styles/theme.ts"
import './styles/globalStyles.ts'
import { GlobalStyles } from "./styles/globalStyles.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
