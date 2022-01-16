import React from 'react';
import 'antd/dist/antd.min.css'
import '../../App.css'
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../graphql';
import Loading from '../Loading';
import { Button, Form, Input, Checkbox} from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useState } from 'react';
const Profile = ({userName,password})=>{
    
    const [openProfile, setOpenProfile] = useState(false)
    const {loading, data} = useQuery(USER_QUERY, 
        {
            variables:{
                userName:userName,
                password:password
            }
        })
    if(loading) return <Loading/>
    

    return(
    <>
        {/* should hover show that can click */}
        <UserOutlined onClick={()=>(setOpenProfile(()=>true))}/>
        {/* {openProfile &&

        } */}
    </>
    )


}
export default Profile;   