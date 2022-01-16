import { Input } from 'antd';

const ClubInputBar = ({ body, 
                    setBody,
                    username,
                    clubName,
                    sendMessage
                }) => {
  const send = (msg)=>{
    if(msg !== ''){
      sendMessage({variables:{ clubName:clubName, sender: username, body: msg } });
      setBody('');
    }
  }
  return (
    <Input.Search
      style={{width:'80%'}}
      className='App-inputBar'
      value={body}
      onChange={(e) => setBody(e.target.value)}
      enterButton="Send"
      placeholder="Type a message here..."
      onSearch={(msg) => {
        send(msg)
      }}
    ></Input.Search>
  )
};

export default ClubInputBar;