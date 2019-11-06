import React, { useState, useEffect } from 'react';

import {
  Navbar,
  NavbarBrand,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  InputGroup,
  InputGroupAddon  } from 'reactstrap';

  const AuthForm = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [credentials, setCredentials] = useState({
      email:'',
      password: ''
    })
    const [localStorageAuth, setlocalStorageAuth] = useState('');
    const toggle = () => setIsOpen(!isOpen);
    const logo2 = <img alt="Logo" src="https://assets.tractionco.com/static/img/traction_bug.svg" width="80px;"/>
    const logout = () =>{
      props.auth.logout();
      props.history.replace('/');
    }
    const loginBtn = <Button className="col-sm-1 offset-sm-9" onClick={()=>{setIsOpen(true)}} outline color="info">Sign In</Button>
    const logoutButton = <Button className="col-sm-1 offset-sm-9" onClick={logout} outline color="info">Sign Out</Button>
    const changeHandleUid = (e) => {
      const { email, value } =  e.target;
      setCredentials(prevState => ({
        ...prevState, email: value
      }))
    }
    const changeHandlePwd = (e) => {
      const { password, value } =  e.target;
      setCredentials(prevState => ({
        ...prevState, password: value
      }))
    }
    const authenticate = (e) => {
      e.preventDefault();
      props.auth.login(credentials)
        .then(res =>{
          setlocalStorageAuth(res);
          setIsOpen(false)
           props.history.replace('/Home');
          }).catch(err =>{alert(err)})
    }

    useEffect(() => {
      localStorage.setItem('currentUser', JSON.stringify(localStorageAuth));
      localStorage.setItem('user', JSON.stringify(credentials.email))
    }, [localStorageAuth]);

    console.log('auth', props.auth.loggedIn())
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{logo2}</NavbarBrand>
        {props.auth.loggedIn() === true ? logoutButton : loginBtn }
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}> Sign in </ModalHeader>
           <ModalBody>
               <InputGroup>
                 <InputGroupAddon addonType="prepend">email</InputGroupAddon>
                 <Input onChange={changeHandleUid} placeholder="username" />
               </InputGroup>
               <br />
               <InputGroup>
                 <Input type="password" onChange={changeHandlePwd} name="password" id="password" placeholder="password" />
               </InputGroup>
               <br />
               <Button onClick={authenticate} type="submit">Submit</Button>
           </ModalBody>
        </Modal>
      </Navbar>
    )
 }

export default AuthForm;
