import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 


import SubscriptionGuard from "./components/subscription/SubscriptionGuard";

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
     <SubscriptionGuard>
        <App />
    </SubscriptionGuard>
  </React.StrictMode>
)





