import React, { useState} from 'react';
import 'antd/dist/antd.min.css'
import { Button } from 'antd';
import ClubLoby from './ClubLoby';
import ChooseClub from '../components/club/ChooseClub';
import styled from 'styled-components';
import { UPDATE_USER_QUERY, USER_SUBSCRIPTION } from '../graphql';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import Loading from '../components/Loading';
const ClubPlatform = ({logOut, userName}) =>{
    const [club, setClub] = useState('')
    const reChooseClub = ()=>{
        setClub(()=>'')
    }
    const {data, loading, subscribeToMore} = useQuery(UPDATE_USER_QUERY, 
        {
        variables:{
            userName:userName
        }
    })
    console.log(data)
    useEffect(() => {
        try{
            // update message using subscription
            subscribeToMore({
                document: USER_SUBSCRIPTION,
                variables:{userName:userName},
                updateQuery:(prev, {subscriptionData}) =>{
                    if(!subscriptionData.data) return prev
                    console.log(subscriptionData.data)
                    return subscriptionData.data
                }
            })
        }catch(e){console.log("subscription error")}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribeToMore]);
    if(loading) return <Loading/>


    return(
        <>
            {(club !== '')
                ? <ClubLoby reChooseClub={reChooseClub} userName={userName} club={club}
                    />
                : <ChooseClub setClub={setClub} userName={userName} data={data} logOut={logOut}/>
            }
        </>
        
    )
}

export default ClubPlatform;   