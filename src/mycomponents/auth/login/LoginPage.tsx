import { Alert, Col, Divider, Form, Input, Row } from "antd";
import {ILogin, ILoginGoogle, ILoginResult, IUser} from "../authmodels.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { AuthReducerActionType } from "./AuthReducer.ts";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import {gapi} from "gapi-script";
import GoogleLogin from "react-google-login";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage] = useState<string>("");

    useEffect(() => {
        function start(){
            gapi.client.init({
                clientId: '211709141050-djbc187ppdgqef3b4qd9q1bphmgcc5tn.apps.googleusercontent.com',
                scope: ''
            })
        };
        gapi.load('client:auth2',start);
    });

    const handleGoogleSuccess = async (response) => {
        // Handle successful Google Sign-In
        console.log("Google Sign-In Success", response);

        // Extract relevant information from the response
        const {  email, googleId } = response.profileObj;
        const data : ILoginGoogle = { email:email,googleId:googleId };


        try {
            const resp = await axios.post<ILoginResult>("http://teaeirro.com/api/loginGoogle", data);
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

    const handleGoogleFailure = (error) => {
        // Handle failed Google Sign-In
        console.error("Google Sign-In Failed", error);
        // Perform any additional logic (e.g., showing an error message)
    };

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
        <div className="container mx-auto mt-8">
            <div
                className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl  "
                aria-hidden="true"
                style={{ zIndex: -1 }} // Ensure the background is behind the header
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1a08bf] to-[#000000] opacity-50 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        <Row className="mt-5 row " justify="center" style={{ minHeight: "40vh" }}>

            <Col className={'bg-white border  '} span={24} md={16} lg={12} xl={8} style={{
                textAlign: 'center',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: "white"
            }}>
                <Divider className="text-black"><h1 className={''}>LOGIN</h1></Divider>
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
                        <Divider>or</Divider>

                        <GoogleLogin
                            render={renderProps => (
                                <button onClick={renderProps.onClick}
                                        className="mt-5  group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                    <div className="relative flex items-center space-x-4 justify-center">
                                        <img src="https://www.svgrepo.com/show/475656/google-color.svg"
                                             className="left-0 w-5" alt="google logo"/>
                                        <span
                                            className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue
                                        with Google
                                    </span>
                                    </div>
                                </button>
                            )}
                            clientId="211709141050-djbc187ppdgqef3b4qd9q1bphmgcc5tn.apps.googleusercontent.com"
                            buttonText="Sign up with Google"
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Form>
                </div>
            </Col>
        </Row>
        </div>
    );

};

export default LoginPage;
