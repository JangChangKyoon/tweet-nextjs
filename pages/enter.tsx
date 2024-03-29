import Input from "@components/input";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldError } from "react-hook-form/dist/types";

interface EnterForm {
  password: string;
  username: string;
}

interface MutationResult {
  ok: boolean;
}

const Enter: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnterForm>();

  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("api/users/enter");

  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    enter(validForm);
    // console.log(loading, data, error);
  };

  // const onValid = (data: EnterForm) => {
  //   // console.log(data);
  //   setSubmitting(true);
  //   fetch("/api/users/enter", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then(() => {
  //     setSubmitting(false);
  //   });
  //   reset();
  // };

  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);
  console.log(data);

  const onInValid = (errors: FieldError) => {
    console.log(errors);
  };

  return (
    <div>
      <Layout title="로그인">
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
          <Input
            register={register("username", {
              required: "Username is required",
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
          {errors.username?.message}
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
      </Layout>
    </div>
  );
};

export default Enter;
