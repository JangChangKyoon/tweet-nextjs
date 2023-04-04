import Input from "@/components/input";
import Layout from "@/components/layout";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldError } from "react-hook-form/dist/types";

interface LoginForm {
  password: string;
  email: string;
}

const Enter: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();
  const [submitting, setSubmitting] = useState(false);

  const onValid = (data: LoginForm) => {
    // console.log(data);
    setSubmitting(true);
    fetch("/api/users/enter", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setSubmitting(false);
    });
    reset();
  };

  const onInValid = (errors: FieldError) => {
    console.log(errors);
  };

  return (
    <div>
      <Layout title="로그인"></Layout>
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
        <Input
          register={register("email", {
            required: "Email is required",
            validate: {
              notGmail: (value) =>
                !value.includes("@gmail.com") || "Gmail is not allow",
            },
          })}
          name="username"
          label="username"
          type="text"
          required
        />
        {errors.email?.message}
        {/* className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`} */}

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

        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default Enter;
