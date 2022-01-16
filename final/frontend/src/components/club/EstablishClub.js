import React, { useState} from 'react';
import 'antd/dist/antd.min.css'
import { Button, Form, Input } from 'antd';
import {CREATE_CLUB_MUTATION} from '../../graphql';
import { useMutation } from '@apollo/client';
import { notification} from 'antd';
import Loading from '../Loading';
import {UsergroupAddOutlined, HomeOutlined} from '@ant-design/icons'

const Notification = ({type,message}) => {
  notification[type]({
    message: message,
    description:
      "",
    duration:3
  });
};
const EstablishClub = ({backToChooseClub, setClub, userName})=>{

    const [createClub] = useMutation(CREATE_CLUB_MUTATION)
    const [clubName, setClubName] = useState('')
    const [time, setTime] = useState('')
    const [intro, setInro] = useState('')
    const [invit, setInvit] = useState('')

    const createClubSubmit = async (e)  =>{
        e.preventDefault();
        // error handel
        const {data, loading, error}= await createClub({
            variables: {
                name:clubName,
                host:userName,
                invitation:invit,
                introduction:intro,
                time:time
            }
          });
        if (loading) return <Loading/>
        if (data.createClub.status === "SUCCESS"){
            Notification({type:"success",message:"Directing to Club Lobby..."})
            setClub(()=>clubName)
        }
        else Notification({type:"error",message:data.createClub.status})
        
    }


    return(
        <div className='App'>
            <div className='App-title'>
                    <h1 >Create Club <UsergroupAddOutlined /></h1>
            </div>
            <Form>
                <Form.Item label="Club's Name:">
                <Input  onChange={(e)=>setClubName(()=>e.target.value)}/>
                </Form.Item>

                <Form.Item label="Meet Time:">
                <Input onChange={(e)=>setTime(()=>e.target.value)}/>
                </Form.Item>

                <Form.Item label="Introduction:">
                <Input onChange={(e)=>setInro(()=>e.target.value)}/>
                </Form.Item>

                <Form.Item label="Invitation Code:">
                <Input onChange={(e)=>setInvit(()=>e.target.value)}/>
                </Form.Item>

                <Form.Item label="">
                <Button type="primary" htmlType="submit" onClick={createClubSubmit}>
                    Create Club <UsergroupAddOutlined />
                </Button>
                <Button  htmlType="submit" onClick={backToChooseClub}>
                    Back <HomeOutlined/>
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EstablishClub;