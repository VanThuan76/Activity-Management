import { authService } from '@/services/auth.service'
import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import { getCookie, setCookie } from 'cookies-next'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import jwt_decode from 'jwt-decode'
import BlankLayout from '@/layouts/BlankLayout'
import { useDispatch } from 'react-redux'
import { login } from '@/store/appSlice'
import { APP_SAVE_KEYS } from '@/constant/AppConstant'
import useTrans from '@/hooks/useTrans'
import Head from 'next/head'
type Props = {}

const Login = ({ }: Props) => {
    const { trans } = useTrans()
    const dispatch = useDispatch()
    const loginMutation = useMutation({
        mutationKey: 'login',
        mutationFn: (body: { username: string, password: string }) => authService.authenticated(body),
        onSuccess(data, _variables, _context) {
            const res = data.data.data
            const decodeData: any = jwt_decode(res.access_token)
            if (decodeData) {
                setCookie(APP_SAVE_KEYS.KEYS, res.access_token, { maxAge: decodeData.exp });
                setCookie(APP_SAVE_KEYS.SESSION_KEY, res.refresh_token)
                setCookie(APP_SAVE_KEYS.ROLE, decodeData.role);
                setCookie(APP_SAVE_KEYS.TIME_EXPIRED, decodeData.exp);
                dispatch(login({
                    role: decodeData.role,
                    userName: decodeData.preferred_username
                }))
                message.success(
                    'Đăng nhập thành công',
                );
            }
        },
        onError(error, variables, context) {
            message.error(
                'Đăng nhập không thành công',
            );
        },
    })
    useEffect(() => {
        const key = getCookie(APP_SAVE_KEYS.KEYS)
        const role = getCookie(APP_SAVE_KEYS.ROLE)
        if (typeof key === 'string' && role) {
            const decodeData: any = jwt_decode(key)
            dispatch(login({ userName: decodeData.preferred_username, role: decodeData.role }))
        }
    }, [])
    //Handle submit form Login
    function handleLogin(value: { username: string, password: string }) {
        loginMutation.mutate(value)
    }
    return (
        <>
            <Head>
                <title>{trans.page.login.pageTitle}</title>
            </Head>
            <Card
                title={trans.page.login.formHeader}
                style={{ minWidth: 400 }}
                extra={<img style={{ maxWidth: 50, maxHeight: 50 }} alt="logo" src="/logo.png" />}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={handleLogin}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label={trans.page.login.username}
                        name="username"
                        rules={[{ required: true, message: trans.page.login.requiredUsername, }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={trans.page.login.password}
                        name="password"
                        rules={[{ required: true, message: trans.page.login.requiredPassword }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

                    <Form.Item style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit" loading={loginMutation.isLoading}>
                            {trans.page.login.login}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>

    )
}
Login.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>
export default Login

