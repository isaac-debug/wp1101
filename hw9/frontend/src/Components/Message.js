import { Tag } from 'antd';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const Message = ({ messages }) => {
  return (
    <MessageWrapper>
      {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            No messages...
          </p>
        ) : (
          messages.map(({name, body}, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag>{body}
            </p>
          ))
        )
      }
    </MessageWrapper>
  )
};

export default Message;