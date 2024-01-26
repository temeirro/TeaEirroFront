import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const EditTeaPage = () => {
    const { Id } = useParams();
    const [tea, setTea] = useState({});
    const [teaTypes, setTeaTypes] = useState([]);
    const [teaOrigins, setTeaOrigins] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teaResponse = await axios.get(`http://teaeirro.com/api/getTea/${Id}`);
                setTea(teaResponse.data); // Assuming the API response contains tea details

                const typesResponse = await axios.get("http://teaeirro.com/api/getAllTeaTypes");
                setTeaTypes(typesResponse.data); // Assuming the API response contains an array of tea types

                const originsResponse = await axios.get("http://teaeirro.com/api/getAllTeaOrigins");
                setTeaOrigins(originsResponse.data); // Assuming the API response contains an array of tea origins
                console.log("Image URLs:", teaResponse.data.tea_images?.map(image => image.name));

                // Set initial values for the form fields
                form.setFieldsValue({
                    name: teaResponse.data.name,
                    description: teaResponse.data.description,
                    ingredients: teaResponse.data.ingredients,
                    price: teaResponse.data.price,
                    origin: teaResponse.data.origin_id,
                    type: teaResponse.data.type_id,
                    images: teaResponse.data.tea_images?.map((image, index) => ({
                        uid: index,
                        name: image.name,
                        status: 'done',
                        thumbUrl: 'http://teaeirro.com/upload/' + image.name, // Use thumbUrl for preview
                        response: {
                            thumbUrl: 'http://teaeirro.com/upload/' + image.name, // Also set thumbUrl in response
                        },
                    })),

                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [Id, form]);

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("ingredients", values.ingredients);
            formData.append("type_id", values.type);
            formData.append("origin_id", values.origin);

            // Append each file to the FormData
            values.images.forEach((image, index) => {
                formData.append(`images[${index}]`, image.originFileObj);
            });

            const response = await axios.post(`http://teaeirro.com/api/editTea/${Id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Tea updated successfully:", response.data);

            navigate(-1);

        } catch (error) {
            console.error("Error updating tea:", error);
        }
    };

    function handleCancel() {
        navigate(-1);
    }

    function handleClear() {
        form.resetFields();
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl text-white font-bold mb-6">Edit Tea</h1>

            <Form
                form={form}
                name="editTeaForm"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                className="bg-white p-6 rounded-md shadow-md"
            >
                <Form.Item
                    label="Tea Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter the tea name!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the tea description!",
                        },
                    ]}
                >
                    <Input.TextArea style={{ height: '120px' }} />
                </Form.Item>

                <Form.Item
                    label="Ingredients"
                    name="ingredients"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the tea ingredients!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            type: "number",
                            min: 99,
                            message: "Please enter a valid price!",
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Origin"
                    name="origin"
                    rules={[
                        {
                            required: true,
                            message: "Please select the tea origin!",
                        },
                    ]}
                >
                    <Select placeholder="Select tea origin" className="w-full">
                        {teaOrigins.map((origin) => (
                            <Option key={origin.id} value={origin.id}>
                                {origin.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Type"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: "Please select the tea type!",
                        },
                    ]}
                >
                    <Select placeholder="Select tea type" className="w-full">
                        {teaTypes.map((type) => (
                            <Option key={type.id} value={type.id}>
                                {type.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Images"
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    rules={[
                        {
                            required: true,
                            message: "Please select at least one image!",
                        },
                    ]}
                >
                    <Upload name="logo" accept="image/*" action="/upload.do" listType="picture" beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button className={'bg-blue-200'} htmlType="submit">
                        Update Tea
                    </Button>
                    <Button onClick={handleClear} className={'ml-3'} htmlType="submit">
                        Clear
                    </Button>
                    <Button onClick={handleCancel} className={'ml-3'} htmlType="submit">
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditTeaPage;
