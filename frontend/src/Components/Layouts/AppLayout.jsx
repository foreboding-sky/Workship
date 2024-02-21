import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


const AppLayout = ({ children }) => {

    const items = [
        { label: <Link to='/'>Repairs</Link>, key: '1' }, // remember to pass the key prop
        { label: <Link to='/orders'>Orders</Link>, key: '2' }, // which is required
        { label: <Link to='/storage'>Storage</Link>, key: '3' }, // which is required
    ]

    return (
        <Layout>
            <Sider>
                <Menu
                    defaultSelectedKeys={['1']}
                    theme="dark"
                    mode="vertical" items={items} />

            </Sider>

            <Layout>
                <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                    Workshop
                </Header>

                <Content className="site-layout" style={{ padding: '0 50px' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Workshop app</Footer>
            </Layout>
        </Layout>
    );
}

export default AppLayout;