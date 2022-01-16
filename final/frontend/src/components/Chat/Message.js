import { Tag } from 'antd';
import styled from 'styled-components';
import { Comment } from 'antd';
const MessageWrapper = styled.div`
  width: 75%;
  height: 350px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
  vertical-align: middle;
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
`;
const generateAvatar = (userName)=>{
  return 'https://joeschmoe.io/api/v1/random'+userName
}
const Message = ({ messages, userName }) => {
  return (
    <div className='App-ChatBox'>
      <MessageWrapper >
      {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            No messages...
          </p>
        ) : (
          // todo
          messages.map(({sender, body}, i) => (
            (sender.userName === userName)?
              <p >
                <Comment
                    style={{display: 'flex', flexDirection:'row-reverse'}}
                    author={sender.nickname}
                    avatar={generateAvatar(sender.nickname)}
                    content={body}
                  />
              </p>
                
              :
              <Comment
                author={sender.nickname}
                avatar={generateAvatar(sender.nickname)}
                content={body}
              />
          ))
        )
      }
    </MessageWrapper>
    </div>
    
  )
};

export default Message;