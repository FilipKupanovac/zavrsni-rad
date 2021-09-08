import React, {Component} from 'react';
//Components
import Navigation from './Components/Navigation';
import Signin from './Components/Signin';
import Register from './Components/Register';
import Driver from './Components/Driver/Driver';
import Mechanic from './Components/Mechanic/Mechanic';
//CSS
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'signin',
      isSignedIn : false,
      user: {
        email: '',
        name: '',
        type: '',
        id: ''
  }}}
  render(){
    return(
      <>
        <Navigation isSignedIn={this.state.isSignedIn} signOut={this.SignOut} setRoute={this.SetRoute}/>
        <div className='content'>
          <>{this.GetContent()}</>
        </div>
      </>
    )
  }
  GetContent(){
    switch(this.state.route){
      case 'signin': return <Signin loadUser={this.LoadUser} trySignIn={this.TrySignin}/>
      case 'register': return <Register loadUser={this.LoadUser} trySignIn={this.TrySignin}/>
      case 'driv': return <Driver user={this.state.user}/>
      case 'mech': return <Mechanic user={this.state.user}/>
      default: return <></>
    }
  }

  SetRoute = (route) =>{
    this.setState({route: route});
  }

  TrySignin = () =>{
    this.setState({isSignedIn : true});
    //Setting a type to only driver or mechanic and then applying same to state for routing
    this.setState({route : this.state.user.type})
  }

  SignOut = () =>{
    this.setState({isSignedIn: false})
  }

  /* SetRoute=(rout)=>{
    this.setState({route:rout})
  }
 */
  LoadUser = (user) =>{
    this.setState({user:{
      email:user.email,
      name:user.name,
      type: user.type,
      id:user.id
    }
    })
  }
}

export default App;
