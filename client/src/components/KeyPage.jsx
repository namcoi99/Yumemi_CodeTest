import React, { useState } from 'react'

const KeyPage = () => {
    const [apiKey, setApiKey] = useState('')
    const [showKey, setShowKey] = useState(false)

    const handleSubmit = (e, key) => {
        e.preventDefault()
        localStorage.setItem('apiKey', key)
        window.location.href = '/home'
    }
    return (
        <div className="app-key-page">
            <div className="app-key-card">
                <form
                    className="app-form"
                    onSubmit={(event) => handleSubmit(event, apiKey)}
                >
                    <label htmlFor="apiKey">
                        <h3>Enter your API Key</h3>
                        <input
                            type={showKey ? 'text' : 'password'}
                            name="apiKey"
                            id="apiKey"
                            size="30"
                            minLength="12"
                            onChange={(event) => setApiKey(event.target.value)}
                            required
                        />
                    </label>
                    <label className="app-form-checkbox" htmlFor="showKey">
                        <input
                            type="checkbox"
                            name="showKey"
                            id="showKey"
                            onClick={() => setShowKey(!showKey)}
                        />
                        Show your API Key
                    </label>
                    <button className="app-form-btn" type="submit">
                        Check
                    </button>
                </form>
                {/* <button
                    type="button"
                    onClick={() => localStorage.removeItem('apiKey')}
                >
                    delete key
                </button> */}
            </div>
        </div>
    )
}

export default KeyPage
