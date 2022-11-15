import * as React from 'react';
import logo from './logo.svg';
import withRouter from '../../hoc/withRouter.js';
import { network } from '../../tools/network';
import './index.css';

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

  onDragStart = (event) => {
    console.log('dragstart===>', event);
  };

  onDragOver = (event) => {
    console.log('dragover===>', event);
    event.preventDefault();
  };

  onDrop = (event) => {
    console.log('drop===>', event);
  };

  onBlur = () => {
    console.log('失去焦点');
  };

  onAbout = () => {
    const { router } = this.props;
    const { navigate } = router;
    navigate('/about');
  };

  render() {
    return (
      <div className="App" onDrop={this.onDrop}>
        <div onClick={this.onAbout}>About</div>
        <div draggable={true} onDragStart={this.onDragStart}>
          拖拽
        </div>
        <div
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          style={{ width: '200px', height: '200px', border: '1px solid red' }}>
          Drop Zone
        </div>
        <button onClick={this.onClick}>获取UUID</button>
        <span>{this.state.uuid}</span>
        <form>
          <input placeholder="请输入内容" onBlur={this.onBlur} />
        </form>
      </div>
    );
  }
}

export default withRouter(MyApp);
