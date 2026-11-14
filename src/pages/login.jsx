import Btn from "../ui/btn";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../lib/authSchema";

function Login({ setAuthenticated }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data) => {
    console.log(data);

    setAuthenticated(true);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <Btn label="Login" btnSize="sm" btnStyle="primary" />
      </form>
      <div>
        <p>
          New user?👇
          <Link to="/signup">
            {" "}
            <Btn label="Register" btnSize="sm" btnStyle="secondary" />
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
