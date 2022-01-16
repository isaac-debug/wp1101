import { Button } from 'antd';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  // align-items: center;
  // justify-content: center;

  h1 {
    margin: 20px;
    font-size: 3em;
  }
`;

const Title = ({RoomName}) => { // name for clubName or eventName
  return (
    <TitleWrapper>
      <h1>{RoomName}</h1>
    </TitleWrapper>
  );
};

export default Title;