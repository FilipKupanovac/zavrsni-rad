import React from 'react';
//Components
//CSS


const Navigation = ({isSignedIn,signOut,setRoute}) =>{
    if(isSignedIn){
        return(
            <nav>
                <p className="clickable" onClick = {() => {
                    signOut()
                    setRoute('signin')
                    }}>Odjava</p>
            </nav>
        )
    }
    else{
        return(
            <nav>
                <p className="clickable" onClick = {() => setRoute('signin')}>Prijava</p>
                <p className="clickable" onClick = {() => setRoute('register')}>Registracija</p>
            </nav>
        )
    }
}

export default Navigation;