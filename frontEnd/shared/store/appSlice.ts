import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IDataMenu, IRoute } from '../typeDefs/route.type';
import { IUser } from '../typeDefs/user.type';

type APPSTATE = {
    countUpdateMenu: number,
    user: IUser | undefined,
    isAuth: boolean,
    appRoute: IRoute[],
    appMenu: IDataMenu['menus'] | [],
    privateRoute: string[],
}

const initialState: APPSTATE = {
    countUpdateMenu: 0,
    user: undefined,
    isAuth: false,
    appRoute: [],
    appMenu: [],
    privateRoute: ['/', '/settings']
}
export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser | undefined>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.user = undefined
            state.isAuth = false
        },
        setAppRoute: (state, action: PayloadAction<IRoute[]>) => {
            state.appRoute = action.payload
        },
        setAppMenu: (state, action: PayloadAction<IDataMenu['menus']>) => {
            state.appMenu = action.payload
        },
        fetchUpdateMenu: (state) => {
            state.countUpdateMenu += 1
        }
    }
}
)
// Action creators are generated for each case reducer function
export const { login, logout, setAppMenu, setAppRoute, fetchUpdateMenu } = appSlice.actions
export default appSlice.reducer
