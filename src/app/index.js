import React from 'react';
import './index.less';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Head from './head';
import {
  Switch,
  Redirect
} from "react-router-dom";
import { RouteWithSubRoutes } from '@/router';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;


const subMenuList = [
  {
    title: "subnav 1",
    iconType: "user",
    menuItems: [{
      key: 'content1',
      title: 'option1'
    }, {
      key: 'content2',
      title: 'option2'
    }, {
      key: 'content3',
      title: 'option3'
    }]
  },
  {
    title: "subnav 2",
    iconType: "laptop",
    menuItems: [{
      key: 'content4',
      title: 'option4'
    }, {
      key: 'content5',
      title: 'option5'
    }, {
      key: 'content6',
      title: 'option6'
    }]
  },
  {
    title: "subnav 3",
    iconType: "notification",
    menuItems: [{
      key: 'content7',
      title: 'option7'
    }, {
      key: 'content8',
      title: 'option8'
    }, {
      key: 'content9',
      title: 'option9'
    }]
  },
]

const App = (props) => {

  let pathname = props.location.pathname;
  let SelectedKey = pathname.substring(pathname.lastIndexOf("/") + 1); //取最底的路由
  let OpenKey = subMenuList.findIndex((item) => item.menuItems.some(op => op.key === SelectedKey)); //当前路由所在的菜单

  const onMenuItemCilck = (item) => {
    props.history.push(`/main/${item.key}`);
  }

  return (
    <div className='app-wrap'>
      <Layout>
        <Head />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>控制台</Breadcrumb.Item>
            <Breadcrumb.Item>{subMenuList[OpenKey] && subMenuList[OpenKey].title}</Breadcrumb.Item>
            <Breadcrumb.Item>{SelectedKey}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultOpenKeys={[String(OpenKey < 0 ? 0 : OpenKey)]}
                selectedKeys={SelectedKey}
                forceSubMenuRender
                style={{ height: '100%' }}
              >
                {subMenuList.map((item, index) => (
                  <SubMenu
                    key={index}
                    title={<span><Icon type={item.iconType} />{item.title}</span>}
                  >
                    {item.menuItems.map((menuItm, i) => (
                      <Menu.Item key={menuItm.key} onClick={onMenuItemCilck} >{menuItm.title}</Menu.Item>
                    ))}
                  </SubMenu>
                ))}
              </Menu>
            </Sider>
            <Switch>
              {props.routes.map((item, i) => (
                <RouteWithSubRoutes key={i} {...item} />
              ))}
              <Redirect to="/main/content1" />
            </Switch>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </div>
  );
}

export default App;
