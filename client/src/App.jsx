import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import KeyPage from './components/KeyPage'

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <KeyPage />
                    </Route>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
