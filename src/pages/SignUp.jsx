import React from "react";
import { Layout } from "@/layout/Layout";
import Link from "next/link";
import getSupabaseClient from "@/hooks/getSupabaseClient";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";

const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      account: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { user, error } = await supabase.auth.signUp({
      email: data.account,
      password: data.password,
    });
    console.log(user,error)
    alert("已送出，請收取驗證信件");
  };

  const supabase = getSupabaseClient();

  const onErrors = () => {
    console.log(errors);
  };

  return (
    <Layout title="Sign Up">
      <form
        className="p-4 md:py-10 md:px-16 bg-white rounded-xl shadow-md w-full max-w-[650px] mx-auto"
        onSubmit={handleSubmit(onSubmit, onErrors)}
      >
        <div className="mb-12">
          <TextInput
            label="e-mail"
            {...register("account", {
              required: "e-mail為必填",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "請輸入有效的e-mail地址",
              },
            })}
            error={errors.account}
            type="text"
            placeholder="guest001@test.com"
          />
          <TextInput
            label="密碼"
            {...register("password", {
              required: "密碼為必填",
              maxLength: 20,
              minLength: {
                value: 10,
                message: "密碼需要至少10個字元",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
                message: "密碼需要至少包含1個符號 & 英文大寫",
              },
            })}
            error={errors.password}
            type="password"
            placeholder="@A123456789"
          />
        </div>
        <div className="flex justify-center items-center flex-wrap gap-4">
          <Link href={"/"}>
            <span className="rounded mx-2 border-2 px-4 py-1 cursor-pointer transition-all hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold">
              返回登入
            </span>
          </Link>
          <button
            className="rounded mx-2 border-2 px-4 py-1 cursor-pointer transition-all hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold"
            type="submit"
          >
            送出
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default SignUp;
