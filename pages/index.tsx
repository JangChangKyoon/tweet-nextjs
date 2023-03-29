import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldError } from "react-hook-form/dist/types";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (data: LoginForm) => {
    console.log(data);
    reset();
  };

  const onInValid = (errors: FieldError) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <div className="flex gap-x-2 ">
        <div className=" text-red-600 text-xl">Name : </div>
        <input
          {...register("username", {
            required: "Username is required",
          })}
          type="text"
          placeholder="Username"
        />
        {errors.username?.message}
      </div>
      <div className="flex gap-x-2 ">
        <div className=" text-red-600 text-xl">Email : </div>
        <input
          {...register("email", {
            required: "Email is required",
            validate: {
              notGmail: (value) =>
                !value.includes("@gmail.com") || "Gmail is not allow",
            },
          })}
          type="email"
          placeholder="Email"
          className={`${
            Boolean(errors.email?.message) ? "border-red-500" : ""
          }`}
        />
        {errors.email?.message}
      </div>
      <div className="flex gap-x-2 ">
        <div className=" text-red-600 text-xl">Password : </div>
        <input
          {...register("password", {
            required: "Password is required",
          })}
          type="text"
          placeholder="Password"
        />
        {errors.password?.message}
      </div>
      <input type="submit" value="Log in" />
    </form>
  );
};

export default Home;
