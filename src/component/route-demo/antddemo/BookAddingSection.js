import {Button, Form, Input, Modal} from "antd";
import React, {useState} from "react";
import axios from "axios";

const BookAddingSection = ({fetchData}) => {
    let [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    }

    const submitNewBooks = async () => {
        try {
            await form.validateFields();
            await axios.post("http://127.0.0.1:8080/api/books", form.getFieldsValue());
            setOpen(false);
            fetchData();
        } catch (e) {
            console.error("submitNewBooks error: ", e);
        }
    }

    const hideModal = async () => {
        setOpen(false);
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                addNewBooks
            </Button>

            <Modal title="Add new book" open={open} onOk={submitNewBooks} onCancel={hideModal}
                   okText="add new book" cancelText="cancel">
                <Form form={form}>
                    <Form.Item label="Name" name="name" rules={[{required: true, message: "name is required!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Author" name="author"
                               rules={[{required: true, message: "author is required!"}]}>
                        <Input/>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
}

export default BookAddingSection;