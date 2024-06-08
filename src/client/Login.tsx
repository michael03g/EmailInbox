import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { loginUser } from "./service";

const Login = () => {
  const { handleSubmit, control, formState: {errors}} = useForm();

  const history = useNavigate();
  localStorage.setItem("email", "");

  const onSubmit = async (data: any) => {
    try {
      const response = await loginUser(data);
      if (response === false) {
        alert("Invalid user credentials");
      }
      else {
        alert("Login success");
        localStorage.setItem('email', data.email);
        history('/emails');
      }
    } catch (error) {
      alert("Failed to create user");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <div>
        <label>Username:</label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Username is required" }}
          render={({field}) => <input {...field} />}
        />
        {
          errors?.name &&
          <p className="error">{errors?.name?.message as string}</p>
        }
      </div>

      <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ 
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@hometask\.com$/i,
              message: "Invalid email"
            }
          }}
          render={({field}) => <input {...field} />}
        />
        {
          errors?.email &&
          <p className="error">{errors?.email?.message as string}</p>
        }
      </div>

      <div>
        <label>Password:</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: "Password should be at least 8 characters long." }
          }}
          render={({ field }) => <input type="password" {...field} />}
        />
        {
          errors?.password &&
          <p className="error">{errors?.password?.message as string}</p>
        }
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default Login;