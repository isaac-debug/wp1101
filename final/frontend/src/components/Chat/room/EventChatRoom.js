import EventInputBar from '../EventInputBar'
import Message from '../Message';
import EventTitle from '../EventTitle';
import EventInfo from '../../events/EventInfo';
import { useState } from 'react';
import { CREATE_EVENT_MESSAGE_MUTATION, JOIN_EVENT_MUTATION } from '../../../graphql';
import { useMutation } from '@apollo/client';
import { Button } from 'antd';
import { notification} from 'antd';

const Notification = ({type,message}) => {
  notification[type]({
    message: message,
    description:
      "",
    duration:3
  });
};

const EventChatRoom = ({ 
                    userName, 
                    messages,
                    clubName,
                    eventName
                    //body, // useState + useMut
                    //setBody, 
                    //displayStatus, // useMut
                    //sendMessage, // useMut
                 }) => {
    const [sendEventMessage]=useMutation(CREATE_EVENT_MESSAGE_MUTATION)
    const [body, setBody] = useState('')
    const [joinEvent] = useMutation(JOIN_EVENT_MUTATION)

    const join = async ()=>{
      const {data} = await joinEvent({
        variables: {
          name:eventName,
          clubName:clubName,
          userName:userName
      }
      })
      if (data.joinEvent.status ==="SUCCESS") Notification({type:"success",message:data.joinEvent.status})
      else Notification({type:"error",message:data.joinEvent.status})
    }
  return (
    <>
      <EventTitle RoomName={eventName} join={join}/>
      <EventInfo  userName={userName} club={clubName} actName={eventName} ></EventInfo>
      <Message messages={messages} userName={userName} ></Message>
      <EventInputBar
        body={body}
        setBody={setBody}
        username={userName}
        clubName={clubName}
        eventName = {eventName}
        //displayStatus={displayStatus}
        sendMessage={sendEventMessage}
      ></EventInputBar>
    </>
  )
};

export default EventChatRoom;