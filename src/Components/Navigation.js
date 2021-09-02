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
                    }}>Sign Out</p>
            </nav>
        )
    }
    else{
        return(
            <nav>
                <p className="clickable" onClick = {() => setRoute('signin')}>Signin</p>
                <p className="clickable" onClick = {() => setRoute('register')}>Register</p>
            </nav>
        )
    }
}

export default Navigation;