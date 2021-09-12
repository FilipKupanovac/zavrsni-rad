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
                <fieldset className="w50 marg-top">
                    <div className="just-center">
                        <p className="no-pad">Registracija</p>
                    </div>
                    <div className="just-center">
                        <div className="w70 pa05 flex just-stretch">
                            <label>Korisničko ime</label>
                            <input onChange={this.onNameChange}
                                type="text" name="name"
                            ></input>
                        </div>
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
                    <div className="just-center">
                        <div className="w80 pa05 just-center">
                            <input onChange={this.onCheckboxCheck}
                                    type="checkbox" name="mechanic-check"value="mechanic"
                            ></input>
                            <label style={{width: "150px"}} name="mechanic-check">Ja sam mehaničar</label>
                        </div>
                    </div>
                    <>{this.ShowMechanicInputField()}</>
                </fieldset>
                <div className="just-center">
                <button className="centered-marg" onClick={this.Register}>
                    Registriraj se
                </button>
                </div>
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
                <div className="just-center">
                <div className="w70 pa05 flex just-stretch">
                        <label className="validation-label">Kod za provjeru</label>
                        <input
                            onChange={this.onValidationCodeChange}
                            type="password" name="VCode"
                        ></input>
                </div>
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
                    vcode: vcode,
                    //TEST
                    checkboxState: this.state.checkboxState
                })
            })
            .then(resp => resp.json())
            .then(res =>{
                if(res.name === name && res.email === email){
                    this.props.loadUser(res);
                    this.props.trySignIn()
                }
            })
            .catch(console.log("BAD REQUEST - Check your input please."))
        }
        else 
            console.log("Empty input fields")
    }
       
}

export default Register;