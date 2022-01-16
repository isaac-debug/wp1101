import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation createUser($userName: String!, $password: String!,
     $nickname:String!, $email:String!){
        createUser(userName: $userName, password: $password, 
            nickname:$nickname, email:$email){
            status
            userData{
                userName
                password
            }
        }
            
    }
`;

export const CREATE_CLUB_MUTATION = gql`
    mutation createClub($name:String!, $host:String!, $invitation:String!,
    $introduction:String!, $time:String!){
        createClub(name:$name, host:$host, invitation:$invitation,
        introduction:$introduction, time:$time){
            status
            clubData{
                name
                host
                members{
                    user{
                        userName
                      }
                }
            }
        }
    }
`;
export const CREATE_EVENT_MUTATION = gql`
    mutation createEvent($clubName:String!, $name:String!, 
    $time:String!, $location:String!, $introduction:String!,
    $host:String!, $active: Boolean!){
        createEvent(clubName:$clubName, name:$name, 
    time:$time, location:$location, introduction:$introduction,
    host:$host, active: $active){
        status
        eventData{
          name
          location
          host
          active
        }
    }
    }
`;

export const JOIN_EVENT_MUTATION = gql`
    mutation joinEvent($name:String!, $clubName: String!,
    $userName:String!){
        joinEvent(name:$name, clubName:$clubName, userName:$userName){
            status
        }
    }
`;

export const JOIN_CLUB_MUTATION = gql`
    mutation joinClub($name:String!, $userName:String!, $invitation:String!){
        joinClub(name:$name, userName:$userName, invitation:$invitation){
            status
        }
    }
`;

export const CREATE_CLUB_MESSAGE_MUTATION = gql`
    mutation createClubMessage($clubName:String!, $sender:String!  
    $body:String!){
        createClubMessage(clubName:$clubName, sender:$sender  
    body:$body){
        status
    }
    }
`;

export const CREATE_EVENT_MESSAGE_MUTATION = gql`
    mutation createEventMessage($clubName:String!, $name:String!, $sender:String!  
    $body:String!){
        createEventMessage(clubName:$clubName, name:$name sender:$sender  
    body:$body){
        status
    }
    }
`;