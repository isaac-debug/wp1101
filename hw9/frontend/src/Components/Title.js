import { Button } from 'antd';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
  }
`;

const Title = ({ username, withClearButton, clearMessages }) => {
  return (
    <TitleWrapper>
      <h1>{!username ? 'My' : username + "'s"} Chat Room</h1>
      {withClearButton ? (
          <Button type="primary" danger onClick={clearMessages}>
            Clear
          </Button>
        ) : null
      }
    </TitleWrapper>
  );
};

export default Title;