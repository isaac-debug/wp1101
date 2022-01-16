import { Spin } from "antd"
import styled from "styled-components"
const Wrapper = styled.div`
    margin: 0px 50px;
    margin-bottom: 0px;
    padding: 30px 50px;
    text-align: center;
    border-radius: 4px;
`;

const Loading = () =>{
    return(
        <Wrapper>
            <Spin tip="Loading..." size="large"/>
        </Wrapper>
    )

}
export default Loading