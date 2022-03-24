import React from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <Authenticator>
            {({ signOut, user }) => (
              <div className="Auth">
                <p>
                  Hi {user.username}
                  <button onClick={signOut}>Sign out</button>

                </p>
              </div>
            )}
        </Authenticator>
    </div>
  );
}

export default App;