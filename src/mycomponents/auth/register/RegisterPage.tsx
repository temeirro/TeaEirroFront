import {useEffect, useState} from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, Modal, Row, Upload } from "antd";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import {IRegisterForm, IRegister, IUserLoginInfo, IUser, IRegisterGoogle} from "../authmodels.ts";
import { jwtDecode } from "jwt-decode";
import {imageConverter} from "./imageconvert.ts";
import { useNavigate } from "react-router-dom";
import { AuthReducerActionType } from "../login/AuthReducer.ts";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script";

const RegisterPage = () => {
    const navigator = useNavigate();
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [file, setFile] = useState<UploadFile | null>();
    const [form] = Form.useForm<IRegisterForm>();
    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = () => setPreviewOpen(false);

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
        const { givenName, familyName, email, imageUrl, googleId } = response.profileObj;


        const data: IRegisterGoogle = {name: givenName, lastName: familyName, email:email,image:imageUrl,googleId:googleId,  role: "user", };
        console.log("Registration data", data);

        try {
            // Register user
            await axios.post("http://teaeirro.com/api/registerGoogle", data);

            // Login user
            const loginData = {
                email: email, // Assuming email is a field in your IRegisterForm interface
                googleId: googleId, // Assuming password is a field in your IRegisterForm interface
            };

            const login = await axios.post("http://teaeirro.com/api/loginGoogle", loginData);
            console.log("Login data", login.data);

            const { token } = login.data;
            const user: IUserLoginInfo = jwtDecode<IUserLoginInfo>(token);
            console.log("User info", user);

            localStorage.token = token;
            const imagename = await axios.get(`http://teaeirro.com/api/getImage?email=` + user.email);

            dispatch({
                type: AuthReducerActionType.LOGIN_USER,
                payload: {
                    email: user.email,
                    image: imagename.data.image_name,
                    name: user.name,
                    lastName: user.lastName,
                } as IUser,
            });

            success();
            onClear();


            navigator("/");

        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const handleGoogleFailure = (error) => {
        // Handle failed Google Sign-In
        console.error("Google Sign-In Failed", error);
        // Perform any additional logic (e.g., showing an error message)
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFile }) => {
        const newFileList = newFile.slice(-1);
        setFile(newFileList[0]);
    };



    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            // If the file doesn't have a URL or preview, set the preview using the originFileObj
            file.preview = URL.createObjectURL(file.originFileObj as File);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };


    const onReset = () => {
        onClear();
    };

    const onFinish = async (values: IRegisterForm) => {
        const data: IRegister = { ...values, role: "user", image: values.image?.thumbUrl };
        console.log("Registration data", data);
        console.log(values);
        try {
            // Register user
            await axios.post("http://teaeirro.com/api/register", data);

            // Login user
            const loginData = {
                email: values.email, // Assuming email is a field in your IRegisterForm interface
                password: values.password, // Assuming password is a field in your IRegisterForm interface
            };

            const login = await axios.post("http://teaeirro.com/api/login", loginData);
            console.log("Login data", login.data);

            const { token } = login.data;
            const user: IUserLoginInfo = jwtDecode<IUserLoginInfo>(token);
            console.log("User info", user);

            localStorage.token = token;
            const imagename = await axios.get(`http://teaeirro.com/api/getImage?email=` + user.email);

            dispatch({
                type: AuthReducerActionType.LOGIN_USER,
                payload: {
                    email: user.email,
                    image: imagename.data.image_name,
                    name: user.name,
                    lastName: user.lastName,
                } as IUser,
            });

            success();
            onClear();


                navigator("/");

        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const onClear = () => {
        form.resetFields();
        setFile(null);
    };

    const onCancel = () => {
        navigator("/");
    };

    const success = () => {
        messageApi.open({
            type: "success",
            duration: 10,
            content: "Successful registration!",
        });
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
        <Row className="mt-5" justify="center">
            <Col
                span={24}
                md={16}
                lg={12}
                xl={8}
                className="text-center p-8  shadow bg-white"
            >
                {contextHolder}
                <Divider className="text-black"><h1>SIGN UP</h1></Divider>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    style={{ minWidth: "100%", padding: 20 }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: "Enter your name!" },
                            { min: 2, message: "Name length is minimum 2 symbols!" },
                        ]}
                    >
                        <Input autoComplete="firstName" />
                    </Form.Item>

                    <Form.Item
                        label="Surname"
                        name="lastName"
                        rules={[
                            { required: true, message: "Enter your last name!" },
                            { min: 2, message: "Last name length is minimum 2 symbols!" },
                        ]}
                    >
                        <Input autoComplete="lastName" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            { required: true, message: "Enter your phone!" },
                            { min: 10, message: "Phone length is minimum 10 symbols!" },
                        ]}
                    >
                        <Input autoComplete="phone" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "Email format is wrong!",
                            },
                            { required: true, message: "Enter your email!" },
                            { min: 5, message: "Email length is minimum 5 symbols!" },
                        ]}
                    >
                        <Input autoComplete="email" />
                    </Form.Item>

                    <Form.Item
                        label="Your photo"
                        name={"image"}
                        getValueFromEvent={imageConverter}
                    >
                        <Upload
                            beforeUpload={() => false}
                            maxCount={1}
                            listType="picture-card"
                            onChange={handleChange}
                            onPreview={handlePreview}
                            accept="image/*"
                        >
                            {file ? null :
                                (
                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>Upload</div>
                                    </div>)
                            }
                        </Upload>
                    </Form.Item>


                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: "Enter your password!" },
                            { min: 6, message: "Password length is minimum 6 symbols!" },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please, confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Passwords do not match!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Modal
                        visible={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt="example" style={{ width: "100%" }} src={previewImage} />
                    </Modal>

                    <div className="flex justify-center space-x-4 mt-4">
                        <Button
                            className="bg-blue-300"
                            htmlType="submit"
                        >
                            Finish
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Clear
                        </Button>
                        <Button className="bg-blue-200" htmlType="button" onClick={onCancel}>
                            Cancel
                        </Button>


                    </div>

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
            </Col>
        </Row>
        </div>
    );
};

export default RegisterPage;
