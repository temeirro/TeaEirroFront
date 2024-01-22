import './App.css'
import './index.css'
import DefaultHeader from './mycomponents/containers/DefaultHeader';
import { Route, Routes } from "react-router-dom";
import HomePage from "./mycomponents/home/HomePage.tsx";
import LoginPage from "./mycomponents/auth/login/LoginPage.tsx";
import RegisterPage from "./mycomponents/auth/register/RegisterPage.tsx";
import AdminPage from "./mycomponents/admin/AdminPage.tsx";
import NotFound from "./mycomponents/containers/NotFound.tsx";
import BlackTeaPage from "./mycomponents/tea_pages/TeaPage.tsx";
import TeaDetails from "./mycomponents/tea_pages/TeaDetails.tsx";


function App() {

  return (
    <>
        <DefaultHeader/>
        <Routes>
        <Route index element={<HomePage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="admin" element={<AdminPage/>}/>
            <Route path="*" element={<NotFound/>}/>

            <Route path=":type" element={<BlackTeaPage />} />
            <Route path="tea/:Id" element={<TeaDetails/>}/>

        </Routes>


    </>
  )
}

export default App
