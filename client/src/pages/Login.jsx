import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_API, data, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        toast.error(response?.data?.msg || "Invalid login credentials.");
        return;
      }

      toast.success("Login successful!");
      navigate("/home");
      reset();
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back!</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="userEmail" className="form-label">Email:</label>
          <input
            id="userEmail"
            type="email"
            {...register("userEmail", { required: "Email is required" })}
            className="form-input"
          />
          {errors.userEmail && <p className="error-text">{errors.userEmail.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            id="password"
            type="password"
            {...register("userPassword", { required: "Password is required" })}
            className="form-input"
          />
          {errors.userPassword && <p className="error-text">{errors.userPassword.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="login-button">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link-anchor">Sign Up</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
