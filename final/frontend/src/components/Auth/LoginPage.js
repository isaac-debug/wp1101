import React from 'react';
import 'antd/dist/antd.min.css'
import '../../App.css'
import { ArrowDownOutlined } from '@ant-design/icons'
import { Button, Form, Input, Checkbox} from 'antd';
import styled from 'styled-components';
const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginPage = ({loginCheck, setUserName, setPassword,
    registerOnClick, forgetOnClick}) =>{

    return(
        <>
        <img className='loginPic' alt="not found" src="https://doqvf81n9htmm.cloudfront.net/data/alicelee_126/201801/0123/204.jpg" ></img>
        <div className='App'>
            <div className='App-title'>
                <h1>Wanna Hang Out</h1>
            </div>
            <div className='App-title'>
                <h2>Login To Start! <ArrowDownOutlined />
                </h2>
                
            </div>
            <div className='App-loginInput'>
                <Form name="basic">
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input onChange={e=>(setUserName(()=>e.target.value))}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password onChange={e=>(setPassword(()=>e.target.value))}/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                    offset: 6,
                    span: 16,
                    }}
                >   
                <Wrapper className='App-options'>
                    <Button type="primary" htmlType="submit" onClick={loginCheck}>
                    Login
                    </Button>
                    <Button onClick={registerOnClick}>Register</Button>
                    <Button onClick={forgetOnClick}>Forget</Button>
                </Wrapper>
                    
                </Form.Item>
                </Form>
            </div>
        </div>
        <p>pic from: 達志 </p>
        </>
        
        
    )
}

export default LoginPage;   