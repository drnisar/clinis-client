import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const Login = () => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).label("Username").messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 3 characters",
    }),
    password: Joi.string().required().min(3).label("Password").messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 3 characters",
    }),
  });
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const { setUsername } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // setLogin("Login successful");

    if (login) {
      setLogin("");
      setUsername("");
    }

    if (!login) {
      setLogin("Login successful");
      setUsername(data.username);
      navigate("/registration");
      console.log(errors);
    }
  };

  return (
    <div
      className="container maxWidth-30 bg-light text-auto p-3 mt-5 rounded-3 border border-2 "
      style={{ maxWidth: "300px", height: "auto" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="form-control"
            {...register("username")}
          />
          {errors.username && <>{errors?.username.message}</>}
        </div>
        <div className="mb-3">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password")}
          />
          {errors.password && <>{errors?.password.message}</>}
        </div>
        <div className="mb-3">
          <button className="btn btn-outline-primary" type="submit">
            {login ? "Logout" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
