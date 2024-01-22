import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux";
import {store} from "./store";
import {jwtDecode} from "jwt-decode";
import {IUser} from "./mycomponents/auth/authmodels.ts";
import {AuthReducerActionType} from "./mycomponents/auth/login/AuthReducer.ts";
import axios from "axios";
import './satoshi.css';

if(localStorage.token) {
    const user = jwtDecode(localStorage.token) as IUser;
    const imagename = await axios.get(`http://teaeirro.com/api/getImage?email=` + user.email);
    if (user?.email == 'art.rozhyk@gmail.com') {
        store.dispatch({
            type: AuthReducerActionType.LOGIN_ADMIN,
            payload: {
                email: user.email,
                image: imagename.data.image_name,
                name: user.name,
                lastName: user.lastName
            } as IUser
        });
    }
    else
    {
        store.dispatch({
            type: AuthReducerActionType.LOGIN_USER,
            payload: {
                email: user.email,
                image: imagename.data.image_name,
                name: user.name,
                lastName: user.lastName
            } as IUser
        });
    }

}




ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
)
