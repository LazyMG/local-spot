import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  gap: 5px;
`;

const TextBox = styled.input`
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
  appearance: none; // 기본 브라우저에서 기본 스타일 제거
  font-size: 20px;
  color: #222222;
  border: none;
  border-bottom: solid #aaaaaa 1px;
  padding-bottom: 10px;
  text-align: center;
  position: relative;
  background: none;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fff inset;
    -webkit-text-fill-color: #000;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const ErrorBox = styled.span`
  color: red;
  font-size: 13px;
`;

const SubmitRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubmitButton = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  margin: 0;
  padding: 0.5rem 1rem;

  font-size: 15px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 4px;

  display: inline-block;
  width: auto;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  color: #000;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    outline: 0;
    background: #abb1bf;
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onValid = () => {
    //로그인 정보 확인
    navigate("/");
  };

  return (
    <Wrapper>
      <Content>
        <Form onSubmit={handleSubmit(onValid)}>
          <FormRow>
            <TextBox
              {...register("email", {
                required: "Email을 입력해주세요.",
              })}
              type="text"
              placeholder="Email"
              required
            />
            <ErrorBox>{errors?.email?.message}</ErrorBox>
          </FormRow>
          <FormRow>
            <TextBox
              {...register("password", {
                required: "Password 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "Password의 길이는 6자 이상입니다.",
                },
              })}
              type="password"
              placeholder="Password"
              required
            />
            <ErrorBox>{errors?.password?.message}</ErrorBox>
          </FormRow>
          <SubmitRow>
            <SubmitButton value="Login" type="submit" />
          </SubmitRow>
        </Form>
        <div>
          Go to <Link to="/create-account">Create Account</Link>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Login;
