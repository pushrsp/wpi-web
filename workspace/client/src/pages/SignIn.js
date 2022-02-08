import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useFetch } from "use-http";
import { toast, ToastContainer } from "react-toastify";
import localStorage from "localStorage";

import { useMycoilState } from "pkg/store/Mycoil_Hooks";
import { USER } from "global/user";
import { SIGN_IN, ME } from "constant/url";
import { TOAST_CONFIG } from "constant/toast";

import AuthLayout from "components/common/AuthLayout";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { post: login, loading } = useFetch(SIGN_IN);
  const { data } = useFetch(ME, {}, []);
  const [me, setMe] = useMycoilState(USER);

  useEffect(() => {
    (() => {
      if (data?.statusCode !== 200) return;
      console.log(data);
      // const { username, role, isAccepted } = data.data;
      // if (!isAccepted) return;
      // console.log(username);
    })();
  }, [data]);

  const onFinish = async ({ username, password }) => {
    const result = await login({ username, password });

    if (result.message === "success") {
      const { token, username, role, isAccepted } = result.data;

      if (isAccepted) {
        toast.success(`안녕하세요 ${username}님`, TOAST_CONFIG);
        localStorage.setItem("@wpi-token", token);
        setMe({ username, role, isAccepted });
        navigate("/home", { replace: true });
      } else {
        toast.info("관리자의 요청이 필요합니다.", TOAST_CONFIG);
      }
    } else {
      toast.error(result.message, TOAST_CONFIG);
    }
  };

  return (
    <AuthLayout>
      <ToastContainer />
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
          <Button type="primary" loading={loading} style={{ width: "100%" }} htmlType="submit">
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
