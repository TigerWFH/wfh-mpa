import * as React from 'react';
import logo from './logo.svg';
import { network } from './tools/network';
import './App.css';

// function App() {
//   const [uuid, setUuid] = React.useState('');
//   React.useEffect(() => {
//     const uuid = sessionStorage.getItem('uuid');
//     console.log('uuid===>', uuid);
//     setUuid(uuid);
//   }, [setUuid]);

//   const onClick = React.useCallback(() => {
//     const uuid = sessionStorage.getItem('uuid');
//     console.log('uuid===>', uuid);
//     setUuid(uuid);
//   }, [setUuid]);
//   return (
//     <div className="App">
//       <button onClick={onClick}>获取UUID</button>
//       <span>{uuid}</span>
//     </div>
//   );
// }

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: ''
    };
  }

  componentDidMount() {
    const uuid = sessionStorage.getItem('uuid');
    this.setState({
      uuid
    });
  }

  onClick = (event) => {
    const uuid = sessionStorage.getItem('uuid');
    this.setState({
      uuid
    });
    network.get('/api/list');
    console.log('click get uuid======>', this.state.uuid);
    // setTimeout(() => {
    //   console.log('click get uuid======>', this.state.uuid);
    // }, 3000);
  };

  onCapture = () => {
    console.log('capture');
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.onClick}>获取UUID</button>
        <span>{this.state.uuid}</span>
      </div>
    );
  }
}

export default MyApp;
