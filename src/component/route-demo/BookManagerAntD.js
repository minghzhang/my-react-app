import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Table, Typography, Modal, Button} from 'antd';
import axios from "axios";
import BookAddingSection from "./antddemo/BookAddingSection"

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const App = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const fetchData = async () => {
        try {
            let response = await axios.get("http://127.0.0.1:8080/api/books");
            setData(response.data);
        } catch (e) {
            console.error("fetchData error: ", e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            author: '',
            ...record,
        });
        setEditingKey(record.id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (record) => {
        try {
            const row = await form.validateFields();
            let fieldsValue = form.getFieldsValue();
            console.log("save record:" + form.getFieldsValue());

            await axios.put(`http://127.0.0.1:8080/api/books/` + record.id, fieldsValue);
            setEditingKey('');
            fetchData();
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const deleteRecord = async (record) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/api/books/` + record.id);
            setEditingKey('');
            fetchData();
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: '25%',
            editable: false,
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            width: '15%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        &nbsp;&nbsp;&nbsp;


                        <Popconfirm title="Sure to delete" onConfirm={() => deleteRecord(record)}>
                            <Typography.Link disabled={editingKey !== ''}>
                                Delete
                            </Typography.Link>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'id' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>

            <BookAddingSection fetchData={fetchData}/>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </>
    );
};
export default App;