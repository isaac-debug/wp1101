import { Input } from 'antd';

const InputBar = ({ body, 
                    setBody,
                    username,
                    displayStatus,
                    sendMessage
                }) => {
  return (
    <Input.Search
      value={body}
      onChange={(e) => setBody(e.target.value)}
      enterButton="Send"
      placeholder="Type a message here..."
      onSearch={(msg) => {
        if (!msg || !username) {
          displayStatus({
            type: 'error',
            msg: 'Please enter a username and a message body.'
          });
          return;
        }
        sendMessage({ name: username, body: msg });
        setBody('');
      }}
    ></Input.Search>
  )
};

export default InputBar;