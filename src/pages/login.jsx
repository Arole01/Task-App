import Btn from "./ui/btn";
import { useNavigate } from "react-router-dom";

function Login({ setAuthenticated }) {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    setAuthenticated(true);
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Enter your email" />

      <input type="password" placeholder="Enter your password" />

      <Btn label="Register" btnSize="sm" btnStyle="secondary" />
    </form>
  );
}

export default Login;
