import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AuthLayout from "components/common/AuthLayout";
import If from "components/common/If";
import { Button, Form, Input } from "antd";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const from = location?.state?.from || null;

  const onFinish = ({ username, password }) => {
    console.log(username, password);
  };

  const validator = (_, b) => {
    if (form.getFieldValue("password") !== b) {
      return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
    }
  };

  return (
    <AuthLayout>
      <If condition={from} ifNot={<div>Not Allowed</div>}>
        <Form
          name="basic"
          style={{ width: "70%", height: "70%" }}
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
        >
          <Form.Item
            label="아이디"
            name="username"
            rules={[
              {
                required: true,
                message: "아이디를 입력해주세요.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="비밀번호 확인" name="passwordCheck" rules={[{ validator }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </If>
    </AuthLayout>
  );
};

export default SignUp;
