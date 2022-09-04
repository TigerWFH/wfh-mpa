import * as React from 'react';
import logo from './logo.svg';
import './tools/tool';
import './App.css';

function App() {
  const [uuid, setUuid] = React.useState('');
  React.useEffect(() => {
    const uuid = sessionStorage.getItem('uuid');
    console.log('uuid===>', uuid);
    setUuid(uuid);
  }, []);

  const onClick = React.useCallback(() => {
    const uuid = sessionStorage.getItem('uuid');
    console.log('uuid===>', uuid);
    setUuid(uuid);
  }, [setUuid]);
  return (
    <div className="App">
      <button onClick={onClick}>获取UUID</button>
      <span>{uuid}</span>
    </div>
  );
}

export default App;
