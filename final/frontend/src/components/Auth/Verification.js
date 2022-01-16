import React from 'react';
import 'antd/dist/antd.min.css'
import { Button, Form, Input } from 'antd';


const Verification = ({sendOnClick, verifyOnClick, sendClose, isSend}) =>{
    
    
    return(
        <div className='App'>
            <div className='App-title'>
                <h1 >Find Your PassWord (Unfinished)</h1>
            </div>
            <Form>
                <Form.Item label="Username">
                <Input />
                </Form.Item>

                <Form.Item label="Email Adress">
                <Input />
                </Form.Item>
                {isSend &&
                    <Form.Item label="Input verification code">
                        <Input />
                    </Form.Item>
                }
                <Form.Item label="">
                <Button type="primary" htmlType="submit" onClick={sendOnClick}>
                    send verification code
                </Button>
                {isSend &&
                    <Button htmlType="submit" onClick={verifyOnClick}>
                    input verification code
                    </Button>
                }
                </Form.Item>
            </Form>
        </div>
        
    )
    

}
export default Verification;   