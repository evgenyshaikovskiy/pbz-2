// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import '../styles/app.css';


export function App() {
  const [result, setResult] = useState('0');
  return <div className="app">Main application</div>;
}

export default App;
