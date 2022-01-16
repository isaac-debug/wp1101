import React, { useState, useRef} from 'react';
import LoginPage from '../components/Auth/LoginPage';
import RegistPage from '../components/Auth/RegisterPage';
import Forget from '../components/Auth/ForgetPage';

const AuthPage = ({loginCheck, setUserName, setPassword}) =>{
    const [register, setRegister] = useState(false);
    const [forget, setForget] = useState(false);

    const registAccount = () =>{
        setRegister(()=>true)
    }
    const closeRegistPage = () =>{
        setRegister(()=> false)
    }
    const forgetPassWord = () =>{
        setForget(()=> true)
    }
    const closeForgetPage = () =>{
        setForget(()=> false)
    }
    
    return(
        <div>
            {(!register && !forget) &&
                <LoginPage loginCheck={loginCheck} 
                setUserName = {setUserName} setPassword={setPassword}
                registerOnClick = {registAccount} forgetOnClick = {forgetPassWord}/>}
            {register && 
                <RegistPage closeRegistPage={closeRegistPage}/>}
            {forget && 
                <Forget closeForgetPage = {closeForgetPage}/>}
        </div>
    )
}

export default AuthPage;   