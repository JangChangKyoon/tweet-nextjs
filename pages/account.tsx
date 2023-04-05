import Input from "@components/input";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldError } from "react-hook-form/dist/types";

interface EnterForm {
  username: string;
  password: string;
  email: string;
}

const Account: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnterForm>();
  const [enter, { data, loading, error }] = useMutation("api/users/account");

  const onValid = (validForm: EnterForm) => {
    console.log(validForm);
    if (loading) return;
    enter(validForm);
    reset();
  };

  const onInValid = (errors: FieldError) => {
    console.log(errors);
  };

  return (
    <div>
      <Layout title="회원가입" />
      <div className="">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
          <Input
            register={register("username", {
              required: "Username is required",
            })}
            name="username"
            label="username"
            type="text"
            required
          />
          <span>{errors.username?.message}</span>

          <Input
            register={register("email", {
              required: "Email is required",
              validate: {
                notGmail: (value) =>
                  !value.includes("@gmail.com") || "Gmail is not allow",
              },
            })}
            name="email"
            label="email adress"
            type="email"
            required
          />
          {errors.email?.message}

          <Input
            register={register("password", {
              required: "Password is required",
            })}
            name="password"
            label="password"
            type="password"
            required
          />
          {errors.password?.message}

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Account;
