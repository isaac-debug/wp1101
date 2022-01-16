import React, { useState} from 'react';
import 'antd/dist/antd.min.css'
import { Button, Form, Input, DatePicker, Switch} from 'antd';

import { useMutation } from '@apollo/client';
import { CREATE_EVENT_MUTATION } from '../../graphql';
import Loading from '../Loading';
import { notification} from 'antd';
const Notification = ({type,message}) => {
  notification[type]({
    message: message,
    description:
      "",
    duration:3
  });
};
const CreateEvent = ({userName, club, backToLoby})=>{

    const [createEvent]=useMutation(CREATE_EVENT_MUTATION)

    const [eventName, setEventName] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [eventLoc, setEventLoc] = useState('')
    const [eventInro, setEventIntro] = useState('')
    const [eventActive, setEventActive] = useState(false)
    
    const createEventSubmit = async (e)=>{
        e.preventDefault();
        const {data, loading, error} = await createEvent({
            variables: {
                clubName:club,
                name:eventName,
                time:eventTime,
                location:eventLoc,
                introduction:eventInro,
                host:userName,
                active:true
            }
          });
          if (loading) return <Loading/>
          
          // go back
          if(data.createEvent.status==="success") Notification({type:'success',message:'Event Created ><'})
          else Notification({type:'error', message:data.createEvent.status})
          backToLoby()
    }


    return(
        <div>
            <h1 >Create Event</h1>
            <Form>
                <Form.Item label="Event's Name:">
                <Input  onChange={(e)=>setEventName(()=>e.target.value)}/>
                </Form.Item>

                <Form.Item label="Event's Time:">
                <DatePicker onChange={(e)=>setEventTime(()=>String(e._d).split('2022')[0])}/>
                </Form.Item>

                <Form.Item label="Location:">
                <Input onChange={(e)=>setEventLoc(()=>e.target.value)}/>
                </Form.Item>

                <Form.Item label="Introduction:">
                <Input onChange={(e)=>setEventIntro(()=>e.target.value)}/>
                </Form.Item>

                <Form.Item label="active:">
                <Switch defaultChecked onChange={(e)=>setEventActive(()=>e.checked)}/>
                </Form.Item>

                <Form.Item label="">
                <Button type="primary" htmlType="submit" onClick={createEventSubmit}>
                    create event
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateEvent;