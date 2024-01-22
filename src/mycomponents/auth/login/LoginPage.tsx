import {Alert, Button, Col, Divider, Form, Input, Row} from "antd";
import {ILogin, ILoginResult, IUser} from "../authmodels.ts";
//import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";
import {AuthReducerActionType} from "./AuthReducer.ts";
import {useNavigate} from "react-router-dom";
import "./styles.css";


const LoginPage = () => {
    // хук який викликає action в глобальному redux
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //const navigate = useNavigate();
    const [errorMessage] = useState<string>("");
    //Відправка форми на сервер

    const onFinish = async (values: ILogin) => {

        console.log("Register model", values);
        try {
            const resp = await axios.post<ILoginResult>("http://teaeirro.com/api/login", values);
            const {token} = resp.data;
            console.log(resp.data);
            localStorage.token = token;
            console.log("User login data", token);
            const user = jwtDecode(token) as IUser;
            console.log("User login data", user);

            const imagename = await axios.get(`http://teaeirro.com/api/getImage?email=` + user.email);

            dispatch({
                type: AuthReducerActionType.LOGIN_USER,
                payload: {
                    email: user.email,
                    image: imagename.data.image_name,
                    name: user.name,
                    lastName: user.lastName
                } as IUser
            });

            console.log("User auth", user);
            if(user.email == 'art.rozhyk@gmail.com')
            {
                dispatch({
                    type: AuthReducerActionType.LOGIN_ADMIN,
                    payload: {
                        email: user.email,
                        image: imagename.data.image_name,
                        name: user.name,
                        lastName: user.lastName
                    } as IUser
                });

                navigate("/admin");
            }
            else
            {
                navigate("/");
            }
        }
        catch (ex) {
            console.error('Помилка при реєстрації!');
        }
    }

    return (
        <Row className="mt-5 row" justify="center" style={{height: '70vh'}}>
            <Col span={8} style={{
                textAlign: 'center',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor:'white', height:'50vh'
            }}>
                <Divider className="text-black">Login</Divider>
                {errorMessage && <Alert message={errorMessage} style={{marginBottom: "20px"}} type="error" />}
                <div className="customer">
                    <Form
                        name="createCustomer"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="Пошта"
                            name="email"
                            htmlFor="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Формати пошти не правильний!',
                                },
                                {required: true, message: 'Це поле є обов\'язковим!'},
                                {min: 2, message: 'Пошта повинна містити мінімум 2 символи!'}
                            ]}
                        >
                            <Input autoComplete="email" id={"email"}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Пароль"
                            htmlFor={"password"}
                            rules={[
                                {required: true, message: 'Вкажіть Ваш пароль!',},
                                {min: 6, message: 'Пароль має мати мінімум 6 символів!',},
                            ]}
                            hasFeedback
                        >
                            <Input.Password id={"password"}/>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>

                            <button type="submit"   className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Увійти</button>

                        </Form.Item>

                    </Form>
                </div>
            </Col>

        </Row>
    );
}
export default LoginPage;