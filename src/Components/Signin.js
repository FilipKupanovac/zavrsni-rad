import React, {Component} from 'react';
//Components
//CSS


class Signin extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    
    render(){
        return(
            <div>
                <fieldset className="w50 marg-top">
                    <div className="just-center">
                    <p className="no-pad">Prijava</p>
                    </div>
                    <div className="just-center">
                        <div className="w70 pa05 flex just-stretch">
                            <label>Email</label>
                            <input onChange={this.onEmailChange}
                                type="email" name="email-address"
                                ></input>
                        </div>
                    </div>
                    <div className="just-center">
                        <div className="w70 pa05 flex just-stretch">
                            <label>Lozinka</label>
                            <input onChange={this.onPasswordChange}
                                type="password" name="password"
                            ></input>
                        </div>
                    </div>
                </fieldset>
                <div className="just-center">
                    <button className="centered-marg" onClick={this.Submit}>
                        Prijava
                    </button>
                </div>
            </div>
        )
    }
    //#region input tracking
    onEmailChange = (event) =>{
        this.setState({email: event.target.value});
    }
    onPasswordChange = (event) =>{
        this.setState({password: event.target.value});
    }
    //#endregion

    Submit = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => {
            let odg = res.json();
            return odg;
        }).then(user => {
            if(user !== 'wrong credentials'){
                this.props.loadUser(user);
                this.props.trySignIn()
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

export default Signin;