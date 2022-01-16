import React, { useState, useRef} from 'react';
import AuthPage from './AuthPage';
import ClubPlatform from './ClubPlatform';
import { useLazyQuery } from '@apollo/client';
import { USER_QUERY } from '../graphql';
import { notification} from 'antd';
import Loading from '../components/Loading';
import  bcrypt  from 'bcryptjs';
const Notification = ({type,message}) => {
  notification[type]({
    message: message,
    description:
      "",
    duration:3
  });
};
const SocialPlatform = ()=>{

    const [runQuery] = useLazyQuery(USER_QUERY)    
    
    const [isLogin, setLogin] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState()

    // async await problem
    const loginCheck =  async (e)=>{
        e.preventDefault();
        const {data, loading} = await runQuery( {
            variables:{
                userName:userName,
                password:password
            }
        })

        setUserData(()=>data)
        if (loading) return <Loading/>
        if(data.user.status === 'SUCCESS'){
        Notification({type:"success",message:"Log In Succeeds ><"})
        setLogin(()=> true)
        }
        else{
            Notification({type:"error",message:data.user.status})
        }
    }
    // need async await
     const  logOut =  ()=>{
        setUserName(()=>'')
        setPassword(()=>'')
        setLogin(()=> false)
    }

    return(
        <div>
            {isLogin
                ?<ClubPlatform logOut = {logOut} userName={userName}/>
                :<AuthPage loginCheck = {loginCheck} setUserName={setUserName}
                 setPassword={setPassword}/>
            }
        </div>
    )
}

export default SocialPlatform;   