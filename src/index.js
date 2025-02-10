import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { DataProvider } from './hooks/global/data'
import { AuthProvider } from './hooks/global/auth'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <AuthProvider>
        <DataProvider>
            <App />
        </DataProvider>
    </AuthProvider>
)
