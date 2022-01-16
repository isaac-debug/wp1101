import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Title from '../Components/Title';

const SignIn = ({ username, setUsername, displayStatus, setSignedIn }) => {
  return (
    <>
      <Title>
        username={username}
        withClearButton={false}
      </Title>
      <Input.Search
        prefix={<UserOutlined />}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
        size="large"
        style={{ width: 300, margin: 50 }}
        onSearch={(name) => {
          if (!name) {
            displayStatus({
              type: 'error',
              msg: 'Missing user name'
            });
            return;
          }
          localStorage.setItem('username', username);
          setSignedIn(true);
        }}
      ></Input.Search>
    </>
  );
};

export default SignIn;