import React, { useState} from 'react';
import 'antd/dist/antd.min.css'
import ClubMenu from './ClubMenu';
import EstablishClub from './EstablishClub';
import JoinClub from './JoinClub';


const ChooseClub = ( {userName, data, setClub, logOut})=>{

    const [establishClub, setEstaClub] = useState(false);
    const [joinClub, setJoinClub] = useState(false);
        
    const estaClubOnClick = ()=>{
        setEstaClub(()=>true)
    }
    const joinClubOnClick = ()=>{
        setJoinClub(()=>true)
    }

    const backToChooseClub = ()=>{
        setEstaClub(()=>false)
        setJoinClub(()=>false)
    }

    return(
        <>
            {(!establishClub && !joinClub)&&
                <ClubMenu userName={userName} estaClubOnClick={estaClubOnClick} 
                joinClubOnClick={joinClubOnClick} 
                data={data} setClub={setClub} logOut={logOut}/>
            }
            {establishClub &&
                <EstablishClub backToChooseClub={backToChooseClub} 
                 userName={userName} setClub={setClub}/>
            }
            {joinClub &&
                <JoinClub userName ={userName} userData={data} backToChooseClub={backToChooseClub}
                setClub={setClub} 
                />
            }
        </>
    )
}

export default ChooseClub;   