import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query user($userName: String!, $password: String!) {
    user(userName:$userName, password:$password) {
        status
        userData{
          userName
          clubs
        }
    }
  }
`;

export const UPDATE_USER_QUERY = gql`
  query updateUser($userName: String!) {
    updateUser(userName:$userName) {
      userName
      clubs
    }
  }
`;

export const CLUBS_QUERY = gql`
  query clubs{
    clubs{
      name
      host
      members{
        user{
          userName
        }
      }
      time
      invitation
    }
  }
`;

export const CLUB_QUERY = gql`
  query club($name: String!){
    club(name:$name){
      name
      host
      introduction
      members{
        user{
          userName
        }
          identity
      }
      time
      events{
        name
        time
        chatRoom{
          sender{
            nickname
            userName
          }
          body
        }
      }
      invitation
      chatRoom{
        sender{
          nickname
          userName
        }
        body
      }
    }
  }
`;

export const EVENT_QUERY = gql`
  query event($clubName: String!, $name:String!){
    event(clubName:$clubName, name:$name){
      name
      time
      location
      introduction
      host
      members{
        user{
          userName
        }
      }
      active
      chatRoom{
        sender{
          userName
          nickname
        }
        body
      }
    }
  }
`;

