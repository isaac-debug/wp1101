import React, { useState} from 'react';
import Verification from './Verification';
import ResetPassWord from './ResetPassWord';

const Forget = ({closeForgetPage}) =>{
    const [isSend, setIsSend] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    
    const sendOnClick = () => {
        setIsSend(()=> true)
    }
    const sendClose = ()=>{
        setIsSend(()=> false)
    }
    const verifyOnClick = ()=>{
        setIsVerified(()=> true)
    }
    const verifyDone = ()=>{
        setIsSend(()=> false)
        setIsVerified(()=> false)
        closeForgetPage()
    }

    return (
        <>
            {isVerified
                ? <ResetPassWord verifyDone = {verifyDone} closeForgetPage = {closeForgetPage}/>
                : <Verification sendOnClick={sendOnClick} sendClose = {sendClose} verifyOnClick = {verifyOnClick} isSend = {isSend}/>
            }
            <button onClick={closeForgetPage}>back</button>

        </>
    )

}

export default Forget;   