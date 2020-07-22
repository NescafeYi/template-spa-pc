
import { Layout, Menu } from 'antd';
import '../index.less';
import { useLocation, useHistory } from 'react-router-dom';
const { Header } = Layout;

const Head = () => {

    let location = useLocation();
    let history = useHistory();
    let activeMenu = location.pathname;

    const onSelect = (selectItem) => {
        history.push(selectItem.key);
    };
    return (
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={activeMenu}
                style={{ lineHeight: '64px' }}
                onSelect={onSelect}
            >
                <Menu.Item key="/home">首页</Menu.Item>
                <Menu.Item key="/main">控制台</Menu.Item>
                <Menu.Item key="/setting">设置</Menu.Item>
            </Menu>
        </Header>
    );
};

export default Head;