import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, Modal, Row, Upload } from "antd";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import { IRegisterForm, IRegister, IUserLoginInfo, IUser } from "../authmodels.ts";
import { jwtDecode } from "jwt-decode";
import { imageConverter } from "./imageconvert.ts";
import { useNavigate } from "react-router-dom";
import { AuthReducerActionType } from "../login/AuthReducer.ts";
import { useDispatch } from "react-redux";

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
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = URL.createObjectURL(file.originFileObj as File);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFile }) => {
        const newFileList = newFile.slice(-1);
        setFile(newFileList[0]);
    };

    const onReset = () => {
        onClear();
    };

    const onFinish = async (values: IRegisterForm) => {
        const data: IRegister = { ...values, role: "user", image: values.image?.thumbUrl };
        console.log("Registration data", data);

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

            if (user.email === "art.rozhyk@gmail.com") {
                dispatch({
                    type: AuthReducerActionType.LOGIN_ADMIN,
                    payload: {
                        email: user.email,
                        image: imagename.data.image_name,
                        name: user.name,
                        lastName: user.lastName,
                    } as IUser,
                });

                navigator("/admin");
            } else {
                navigator("/");
            }
        } catch (error) {
            console.error("Registration failed", error);
            error();
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

    const error = () => {
        messageApi.open({
            type: "error",
            duration: 10,
            content: "Registration error!",
        });
    };

    return (
        <Row className="mt-5" justify="center">
            <Col
                span={24}
                md={16}
                lg={12}
                xl={8}
                className="text-center p-8 rounded shadow bg-white"
            >
                {contextHolder}
                <Divider>Registration</Divider>
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
                        label="Your Photo"
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
                            {file ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>choose</div>
                                </div>
                            )}
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
                </Form>
            </Col>
        </Row>
    );
};

export default RegisterPage;
