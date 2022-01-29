import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AuthLayout from "components/common/AuthLayout";
import If from "components/common/If";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from || null;

  return (
    <AuthLayout>
      <If condition={from} ifNot={<div>Not Allowed</div>}>
        <div>SignUp</div>
      </If>
    </AuthLayout>
  );
};

export default SignUp;
