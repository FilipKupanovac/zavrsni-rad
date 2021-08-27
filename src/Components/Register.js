import React, {Component} from 'react';
//Components
//CSS


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:'',
            name:'',
            checkboxState: false,
            vcode:''
        }
    }
    
    render(){
        return(
            <div>
                <fieldset>
                    <p>Register</p>
                    <div>
                        <label>Full Name</label>
                        <input
                            onChange={this.onNameChange}
                            type="text" name="name"
                        ></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            onChange={this.onEmailChange}
                            type="email" name="email-address"
                        ></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            onChange={this.onPasswordChange}
                            type="password" name="password"
                        ></input>
                    </div>
                    <div>
                        <input
                            onChange={this.onCheckboxCheck}
                            type="checkbox" name="mechanic-check" value="mechanic"
                        ></input>
                        <label name="mechanic-check">I'm a mechanic</label>
                    </div>
                    <>{this.ShowMechanicInputField()}</>
                </fieldset>
                <button
                    onClick={this.Register}
                    >
                    Register
                </button>
            </div>
        )
    }

    //#region input tracking
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) =>{
        this.setState({email: event.target.value});
    }
    onPasswordChange = (event) =>{
        this.setState({password: event.target.value});
    }
    onCheckboxCheck = (event) =>{
        if(this.state.checkboxState === false){
            this.setState({checkboxState: true})
        }
        else{
            this.setState({vcode: ''})
            this.setState({checkboxState: false})
        }
    }
    onValidationCodeChange = (event) =>{
        this.setState({vcode: event.target.value});
    }
    //#endregion

    ShowMechanicInputField = () =>{
        if(this.state.checkboxState === true){
            return(
                    <div>
                        <label>Validation Code</label>
                        <input
                            onChange={this.onValidationCodeChange}
                            type="password" name="VCode"
                        ></input>
                    </div>
            )
        }
        else{
            return <></>
        }
    }

    Register = () =>{
        const {name, email, password, vcode} = this.state;
        if(name !== '' && email !== '' && password !== ''){
            fetch('http://localhost:3000/register', {
                method: 'post',
                headers : { 'Content-Type':'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                    vcode: vcode
                })
            })
            /* .then(response => {
                var odg= response.json();
                console.log("RES", odg)
                return odg
            })
            .then(user => {
                console.log(user);
                if(user){
                    this.props.loadUser(user)
                    this.props.trySignIn();
                    this.props.getContent()
                }
            }) */
            .then(
                fetch('http://localhost:3000/signin', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                    email: email,
                    password: password
                })
                }).then(res => {
                    let odg = res.json();
                    return odg;
                }).then(user => {
                    if(user !== 'wrong credentials'){
                        this.props.loadUser(user);
                        this.props.trySignIn()
                    }
                })
            )
        }
        else 
            console.log("Empty input fields")
    }
}

export default Register;