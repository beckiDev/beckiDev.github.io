import React from 'react';
import { Alert } from 'reactstrap';
import './components.css';

 const Home = (props) => {
   const getUserName = localStorage.getItem('user');
   const getAllUsersInChat = () =>{}
   console.log(props.auth.getToken());
    return (
      <div className="wrapper">
        <aside className="chat_users">
          <p>In Chat Room</p>
          <Alert color="success">
             { getUserName ?  getUserName : '' }
          </Alert>
        </aside>
        <article className="chat_messages">
          <Alert color="primary" className="message userMessage">
              This is a primary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
          </Alert>
          <Alert color="info" className="message guest_message">
              This is a primary alert with  Give it a click if you like.
          </Alert>
        </article>
      </div>
    );
}


export default Home
