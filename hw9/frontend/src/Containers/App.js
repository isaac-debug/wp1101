import styled from 'styled-components';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import useChat from '../Hooks/useChat';
import SignIn from './SignIn';
import ChatRoom from './ChatRoom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
  const { status, messages, sendMessage, clearMessages } = useChat();
  const [signedin, setSignedin] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') === null ? '' : localStorage.getItem('username'));
  const [body, setBody] = useState('');

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 0.5
      };
      switch (type) {
        case 'success':
          message.success(content);
          break;
        case 'error':
          message.error(content);
          break;
        case 'info':
          message.info(content);
          break;
        default:
          break;
      }
    }
  }
  useEffect(() => {
    displayStatus(status);
  }, [status]);

  return (
    <Wrapper>
      {!signedin ? 
        <SignIn
          username={username}
          setUsername={setUsername}
          displayStatus={displayStatus}
          setSignedIn={setSignedin}
        ></SignIn> :
        <ChatRoom
          username={username}
          messages={messages}
          clearMessages={clearMessages}
          body={body}
          setBody={setBody}
          displayStatus={displayStatus}
          sendMessage={sendMessage}
        ></ChatRoom>
      }
    </Wrapper>
  );
}

export default App;
