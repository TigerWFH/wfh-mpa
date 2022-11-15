import * as React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { network } from '../../tools/network';

function About(props) {
  const navigate = useNavigate();
  function onHome() {
    navigate('/');
  }
  return (
    <div className="App">
      <div onClick={onHome}>GoHome</div>
    </div>
  );
}

export default About;
