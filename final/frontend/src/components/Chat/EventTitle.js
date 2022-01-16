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
  button{
    margin-top:43px
  }
`;

const EventTitle = ({RoomName, join}) => { // name for clubName or eventName
  return (
    <TitleWrapper>
      <h1>{RoomName}</h1>
      <Button type="primary" onClick={join}>Join!</Button>
    </TitleWrapper>
  );
};

export default EventTitle;