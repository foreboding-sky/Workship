import { BrowserRouter as Route, Routes, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


const AppLayout = ({ children }) => {

    const items = [
        { label: <Link to='/'>Repairs</Link>, key: '1' },
        { label: <Link to='/orders'>Orders</Link>, key: '2' },
        { label: <Link to='/storage'>Storage</Link>, key: '3' },
        { label: <Link to='/clients'>Clients</Link>, key: '4' },
        { label: <Link to='/specialists'>Specialists</Link>, key: '5' },
        { label: <Link to='/services'>Services</Link>, key: '6' },
        { label: <Link to='/archive'>Archive</Link>, key: '7' },
    ]

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider>
                <Menu
                    defaultSelectedKeys={['1']}
                    theme="dark"
                    mode="vertical" items={items} />
            </Sider>
            <Layout>
                <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', color: "white", fontSize: "20pt" }}>
                    Workshop
                </Header>

                <Content className="site-layout" style={{ display: "flex", justifyContent: "center" }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Workshop app</Footer>
            </Layout>
        </Layout >
    );
}

export default AppLayout;
