import { useAppSelector } from '@/hooks/useRedux';
import { routeService } from '@/services/route.service';
import { setAppMenu } from '@/store/appSlice';
import { IDataMenu } from '@/typeDefs/route.type';
import { Layout, Menu, MenuProps, Spin, Typography, theme } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem({ label, key, icon, children }: {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
}): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const SiderMenu = () => {
    const dispatch = useDispatch()
    const { user, appMenu: menu, countUpdateMenu } = useAppSelector(state => state.appSlice)
    const { token } = theme.useToken()
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()
    const { isFetching } = useQuery(["data", countUpdateMenu], () => routeService.getRoutePathWithRole(), {
        select(data) {
            return data.data.data
        },
        onSuccess: (resAxios) => {
            const menuData = resAxios.find((data: any) => (data.roleName).toUpperCase() === user?.role)
            if (menuData) {
                dispatch(setAppMenu(menuData.menus))
            }
        }
    });

    function renderMenu(data: IDataMenu['menus']): MenuItem[] {
        return data.map(item => getItem({ key: item.route, label: item.name, children: item.childMenus.length > 0 ? renderMenu(item.childMenus) : undefined }))
    }
    return (
        <Sider style={{ backgroundColor: token.colorBgBase }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
            <Spin spinning={isFetching} >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 32, margin: 16, background: token.colorBgBase, borderRadius: 5, cursor: 'pointer' }} onClick={() => router.push('/')}>
                    {collapsed ? <img style={{ maxWidth: 32, maxHeight: 32 }} alt="logo" src="/logo.png" /> :
                        <>
                            <Typography>Activity Management</Typography>
                            <img style={{ maxWidth: 32, maxHeight: 32 }} alt="logo" src="/logo.png" />
                        </>
                    }
                </div>
                <Menu style={{ backgroundColor: token.colorBgBase }} defaultSelectedKeys={[router.pathname]} mode="inline" items={renderMenu(menu)} onClick={(menu) => {
                    router.push(menu.key)
                }} />
            </Spin>
        </Sider>
    );
}

export default SiderMenu;