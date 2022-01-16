import Title from '../Components/Title';
import Message from '../Components/Message';
import InputBar from '../Components/InputBar';

const ChatRoom = ({ 
                    username, 
                    messages, 
                    clearMessages,
                    body,
                    setBody,
                    displayStatus,
                    sendMessage,
                 }) => {
  return (
    <>
      <Title
        username={username}
        withClearButton={true}
        clearMessages={clearMessages}
      ></Title>
      <Message
        messages={messages}
      ></Message>
      <InputBar
        body={body}
        setBody={setBody}
        username={username}
        displayStatus={displayStatus}
        sendMessage={sendMessage}
      ></InputBar>
    </>
  )
};

export default ChatRoom;