import React from 'react';
import './App.css';
import StopsData from './Component/StopsData';

function App() {
  const name = 'Weather Mobile';
  console.log('App component rendering');
  
  return (
    <>
      <h1>{name}</h1>
      <br />
      <div>
        <StopsData />
      </div>
    </>
  );
}



/*function App() {
  const [count, setCount] = useState(0)
 <div> 
    <StopsData/>
  </div>
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
*/
export default App
