import React, { useState} from 'react';
import 'antd/dist/antd.min.css'
import { Tag, Button } from 'antd';
import {ReadOutlined, UsergroupAddOutlined, UserAddOutlined, LogoutOutlined} from '@ant-design/icons'
import background from "./chat.jpg"

const ClubMenu = ({estaClubOnClick, userName, joinClubOnClick,
     data, setClub, logOut})=>{
    
    const chooseThisClub = (name) =>{
        setClub(()=>name)

    }
    console.log(data)

    return(
        <div className='App'>
            <div className='App-title'>
                <h1 > {userName}'s Club Menu <ReadOutlined /></h1>
            </div>
            <div className='App-clubMenu'>
                {data.updateUser.clubs.length === 0? (
                <p style={{ color: '##0000FF' }}>
                    No Clubs
                </p>
                ):(
                    data.updateUser.clubs.map((clubs, i)=>(
                        <p key={i}>
                            <Button type='primary' onClick={e=>(chooseThisClub(e.target.innerText))}>{clubs}</Button>
                        </p>
                    ))
                )
                }
            </div>
            
            <div className='App-options'>
                <Button onClick={estaClubOnClick}>Create Club <UsergroupAddOutlined /></Button>
                <Button onClick={joinClubOnClick}>Join Club <UserAddOutlined /></Button>
                <Button onClick={logOut}>Logout <LogoutOutlined />  </Button>
            </div>
        </div>
    )
}

export default ClubMenu;   