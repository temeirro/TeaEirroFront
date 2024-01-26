import { Alert, Button, Col, Divider, Form, Input, Row } from "antd";
import { ILogin, ILoginResult, IUser } from "../authmodels.ts";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { AuthReducerActionType } from "./AuthReducer.ts";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage] = useState<string>("");

    const onFinish = async (values: ILogin) => {
        try {
            const resp = await axios.post<ILoginResult>("http://teaeirro.com/api/login", values);
            const { token } = resp.data;
            localStorage.token = token;

            const user = jwtDecode(token) as IUser;
            const imagename = await axios.get(`http://teaeirro.com/api/getImage?email=` + user.email);

            dispatch({
                type: AuthReducerActionType.LOGIN_USER,
                payload: {
                    email: user.email,
                    image: imagename.data.image_name,
                    name: user.name,
                    lastName: user.lastName,
                    role: user.role,
                } as IUser,
            });

            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (ex) {
            console.error('Error during login:', ex);
        }
    };

    return (
        <Row className="mt-5 row " justify="center" style={{ minHeight: "70vh" }}>
            <Col className={'bg-white border  rounded-tr-8'} span={24} md={16} lg={12} xl={8} style={{
                textAlign: 'center',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: "white"
            }}>
                <Divider className="text-black">Login</Divider>
                {errorMessage && <Alert message={errorMessage} style={{ marginBottom: "20px" }} type="error" />}
                <div className="customer">
                    <Form
                        name="createCustomer"
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            htmlFor="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Invalid email format!',
                                },
                                { required: true, message: 'This field is required!' },
                                { min: 2, message: 'Email must be at least 2 characters!' },
                            ]}
                            className="mb-4"
                        >
                            <Input autoComplete="email" id={"email"} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            htmlFor={"password"}
                            rules={[
                                { required: true, message: 'Please enter your password!' },
                                { min: 6, message: 'Password must be at least 6 characters!' },
                            ]}
                            hasFeedback
                            className="mb-4"
                        >
                            <Input.Password id={"password"} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }} className="mb-4">
                            <button
                                type="submit"
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Enter
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );

};

export default LoginPage;
