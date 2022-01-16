import React, { useState} from 'react';
import 'antd/dist/antd.min.css'
import { Button, Descriptions, Tag} from 'antd';
import {CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons';
import { EVENT_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import Loading from '../Loading';
const EventInfo = ({userName, club, actName})=>{

    const {loading, error, data} = useQuery(EVENT_QUERY, 
        {
        variables:{
            clubName:club,
            name:actName
        }
    })
    if (loading) return <Loading/>
    if(error) return <pre>{error.message}</pre>
    return(
        <div className='App-eventInfo'>
            <Descriptions bordered layout="vertical">
                <Descriptions.Item label="Intro">{data.event.introduction}</Descriptions.Item>
                <Descriptions.Item label="Time">{data.event.time}</Descriptions.Item>
                <Descriptions.Item label="Location">{data.event.location}</Descriptions.Item>
                <Descriptions.Item label="Host">{data.event.host}</Descriptions.Item>
                <Descriptions.Item label="Members">
                    {data.event.members.map( member => 
                        {return <Tag>{member.user.userName + " "}</Tag>}
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Active">
                    {data.event.active?
                    (<CheckCircleTwoTone twoToneColor="#52c41a"/>):
                    (<CloseCircleTwoTone two twoToneColor='red-5'/>)}
                </Descriptions.Item>
                  
            </Descriptions>
        </div>
    )
}

export default EventInfo;