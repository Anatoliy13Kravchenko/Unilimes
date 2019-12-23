import React from 'react';
import './App.css';
import Main from './resources/Main';
import Header from './resources/Header';

/**
 * @return {any}
 * @constructor
 */
const App: React.FC = () => {
  return (
              <div className="App">
                <Header/>
                <Main/>
              </div>
      );
};

export default App;
