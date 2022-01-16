import React from 'react';
import 'antd/dist/antd.min.css'
import { Button, Form, Input } from 'antd';


const ResetPassWord = ({verifyDone}) =>{



    return(
        <div className='App'>
            <div className='App-title'>
                    <h1 >Reset Your PassWord</h1>
            </div>
            <Form>
                    <Form.Item label="input new password">
                    <Input />
                    </Form.Item>

                    <Form.Item label="">
                    <Button type="primary" htmlType="submit" onClick={verifyDone} >
                        save new password
                    </Button>
                    {/* 
                        return some message here
                    */}
                    </Form.Item>
            </Form>
        </div>
        
    )
}

export default ResetPassWord;   