import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldError } from "react-hook-form/dist/types";

interface LoginForm {
  department: string;
  company: string;
  select: string;
  introduction: string;
  dream: string;
  email: string;
}

const Survey: NextPage = () => {
  const [data, setData] = useState<LoginForm>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (data: LoginForm) => {
    console.log(data);
    setData(data);
    reset();
  };

  const onInValid = (errors: FieldError) => {
    console.log(errors);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-orange-500 bg-opacity-90">
      <div className="flex flex-col w-6/12 h-5/6 bg-slate-300 items-center justify-center rounded-xl">
        <h1 className="my-10 text-2xl font-bold">Job Application Form</h1>
        <form
          className="flex flex-col gap-y-5"
          onSubmit={handleSubmit(onValid)}
        >
          <fieldset id="1" {...register("department", {})}>
            <legend>What department do you want to work for? </legend>

            <table>
              <tr>
                <td>
                  <input
                    value="sales"
                    type="radio"
                    id="sales"
                    name="department"
                    required
                  />
                  <label htmlFor="sales">Sales</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    value="marketing"
                    type="radio"
                    id="Marketing"
                    name="department"
                    required
                  />

                  <label htmlFor="Marketing">Marketing</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    value="accounting"
                    id="Accounting"
                    type="radio"
                    name="department"
                    required
                  />
                  <label htmlFor="Accounting">Accounting</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    value="customerService"
                    type="radio"
                    name="department"
                    id="Customer"
                    required
                  />
                  <label htmlFor="Customer">Customer Service</label>
                </td>
              </tr>
            </table>
            {errors?.department?.message}
          </fieldset>

          <fieldset id="2" {...register("company", {})}>
            <legend>Why do you want to join this company?</legend>
            <table>
              <tr>
                <td>
                  <input value="money" id="2" type="radio" name="company" /> I
                  Want money!
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    value="loveCompany"
                    id="2"
                    type="radio"
                    name="company"
                  />{" "}
                  I love this company
                </td>
              </tr>
              <tr>
                <td>
                  <input value="learning" id="2" type="radio" name="company" />{" "}
                  I want to learn
                </td>
              </tr>
              <tr>
                <td>
                  <input value="nothing" id="2" type="radio" name="company" /> I
                  don't know why
                </td>
              </tr>
            </table>
            {/* {errors?.company?.message} */}
          </fieldset>

          <div className="flex flex-col">
            <legend>Salary</legend>
            <select
              {...register("select", {
                required: "Required",
              })}
            >
              <option value="10">$10</option>
              <option value="20">$20</option>
              <option value="30">$30</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="introduction">Introduction: </label>
            <input
              {...register("introduction", {
                required: "Please write down your introduction.",
              })}
              type="text"
              id="introduction"
            />
            {errors?.introduction?.message}
          </div>

          <div className="flex flex-col">
            <label htmlFor="dream">Dream: </label>
            <input
              {...register("dream", {
                required: "Please write down your Dream.",
              })}
              type="textarea"
              id="dream"
            />
            {errors?.dream?.message}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email </label>
            <input
              {...register("email", {
                required: "Please write down your Email.",
              })}
              type="text"
              id="email"
            />
            {errors?.email?.message}
          </div>

          <input type="submit" value="Give me This Job" />
          <h4>
            {data?.company} {data?.department} {data?.dream} {data?.email}{" "}
            {data?.introduction} {data?.select}
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Survey;
