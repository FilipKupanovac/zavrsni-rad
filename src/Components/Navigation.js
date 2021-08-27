import React from 'react';
//Components
//CSS


const Navigation = ({isSignedIn,signOut,setRoute}) =>{
    if(isSignedIn){
        return(
            <nav>
                <p onClick = {() => {
                    signOut()
                    setRoute('signin')
                    }}>Sign Out</p>
            </nav>
        )
    }
    else{
        return(
            <nav>
                <p onClick = {() => setRoute('signin')}>Signin</p>
                <p onClick = {() => setRoute('register')}>Register</p>
            </nav>
        )
    }
}

export default Navigation;