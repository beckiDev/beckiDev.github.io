import React from 'react';

import AuthForm from './components/AuthForm';
import './App.css';



const App = (props) => {

  return (
    <div>
       <AuthForm  {...props}/>
    </div>
  );
}

export default App;
