import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetch } from "use-http";
import { toast } from "react-toastify";

import AuthLayout from "components/common/AuthLayout";
import If from "components/common/If";
import { Button, Form, Input } from "antd";
import { SIGN_UP } from "constant/url";
import { TOAST_CONFIG } from "constant/toast";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { post, loading } = useFetch(SIGN_UP);
  const [form] = Form.useForm();

  const from = location?.state?.from || null;

  const onFinish = async ({ username, password }) => {
    const result = await post({ username, password });

    switch (result.statusCode) {
      case 201:
        toast.success("회원가입이 완료되었습니다.", TOAST_CONFIG);
        navigate(-1);
        break;
      case 400:
        toast.error("빈 칸이 있는지 확인해주세요.", TOAST_CONFIG);
        break;
      case 409:
        toast.error("이미 존재하는 유저입니다.", TOAST_CONFIG);
        break;
      default:
        toast.error("잠시 후 다시 시도해주세요.", TOAST_CONFIG);
        break;
    }
  };

  const validator = (_, b) => {
    if (form.getFieldValue("password") !== b) {
      return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
    }

    return Promise.resolve();
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
            <Button type="primary" loading={loading} style={{ width: "100%" }} htmlType="submit">
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </If>
    </AuthLayout>
  );
};

export default SignUp;
