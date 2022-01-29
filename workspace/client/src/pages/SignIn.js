import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";

import { useMycoilState } from "pkg/store/Mycoil_Hooks";
import { USER } from "global/user";

import AuthLayout from "components/common/AuthLayout";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [me, setMe] = useMycoilState(USER);

  const onFinish = ({ username, password }) => {
    setMe({ username, password });
  };

  console.log(me);

  return (
    <AuthLayout>
      <Form
        name="basic"
        style={{ width: "70%", height: "70%" }}
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            로그인
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            primary
            style={{ width: "100%" }}
            onClick={() => navigate("/signup", { state: { from: location.pathname } })}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default SignIn;
