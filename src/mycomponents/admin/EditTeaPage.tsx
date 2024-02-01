import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;





const EditTeaPage = () => {
    const { Id } = useParams();
    // @ts-ignore
    const [tea, setTea] = useState({});
    const [teaTypes, setTeaTypes] = useState([]);
    const [teaOrigins, setTeaOrigins] = useState([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const teaResponse = await axios.get(`https://tealaravel.azurewebsites.net/api/getTea/${Id}`);
                setTea(teaResponse.data);
                console.log(teaResponse.data);
                const typesResponse = await axios.get("https://tealaravel.azurewebsites.net/api/getAllTeaTypes");
                setTeaTypes(typesResponse.data);

                const originsResponse = await axios.get("https://tealaravel.azurewebsites.net/api/getAllTeaOrigins");
                setTeaOrigins(originsResponse.data);

                form.setFieldsValue({
                    name: teaResponse.data.name,
                    description: teaResponse.data.description,
                    ingredients: teaResponse.data.ingredients,
                    price: parseFloat(teaResponse.data.price),
                    origin: teaResponse.data.origin_id,
                    type: teaResponse.data.type_id,
                    images: teaResponse.data.tea_images.map(image => ({ url: 'https://tealaravel.azurewebsites.net/upload/' + image.name, name: image.name }))

                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [Id, form]);

    const handleAddImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append("image", file);
            console.log(formData);
            // Make the POST request to add the image
            const response = await axios.post(`https://tealaravel.azurewebsites.net/api/addTeaImage/${Id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            window.location.reload();

            console.log("Image added successfully:", response.data);
        } catch (error) {
            console.error("Error adding image:", error);
        }
    };
    const handleDeleteImage = async (name : any) => {
        try {
            // Make the DELETE request to delete the image
            const response = await axios.delete(`https://tealaravel.azurewebsites.net/api/deleteTeaImage/${Id}/${name}`);

            console.log("Image deleted successfully:", response.data);
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };
    const onFinish = async (values : any) => {
        try {
            console.log(values);
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("price", values.price);
            formData.append("ingredients", values.ingredients);
            formData.append("type_id", values.type);
            formData.append("origin_id", values.origin);

            // Make the POST request without handling images
            const response = await axios.post(`https://tealaravel.azurewebsites.net/api/editTeaWithoutImages/${Id}`, formData, {
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
            <h1 className=" text-white font-bold text-center mb-6">Edit Tea</h1>
            <div
                className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl  "
                aria-hidden="true"
                style={{ zIndex: -1 }} // Ensure the background is behind the header
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1a08bf] to-[#ff80a0] opacity-50 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
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
                        {teaOrigins.map(({id, name}) => (
                            <Option key={id} value={id}>
                                {name}
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
                        {teaTypes.map(({id, name}) => (
                            <Option key={id} value={id}>
                                {name}
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
                    <Upload
                        name="images"
                        accept="image/*"
                        listType="picture"
                        beforeUpload={() => false} // Return false to prevent file upload in edit mode
                        onRemove={(file) => {
                            handleDeleteImage(file.name);

                        }}
                        onChange={({ file }) => {

                                handleAddImage(file);


                        }}

                    >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button className={'bg-blue-200'} htmlType="submit">
                        Update Tea
                    </Button>
                    <Button onClick={handleClear} className={'ml-3'} htmlType="button">
                        Clear
                    </Button>
                    <Button onClick={handleCancel} className={'ml-3'} htmlType="button">
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditTeaPage;
