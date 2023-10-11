import React from "react";
import { Layout } from "@/layout/Layout";
import Link from "next/link";
import getSupabaseClient from "@/hooks/getSupabaseClient";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { useRouter } from "next/router";

const Index = () => {
  // react form hooks method
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

  const formOnErrors = () => {
    console.log(errors);
  };

  //sign in with email and password
  const router = useRouter();
  const supabase = getSupabaseClient();

  const onUserLogin = async (userData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.account,
      password: userData.password,
    });
    console.log(data);

    if (!data.user) {
      alert("帳號或密碼錯誤");
      console.log(error);
      return;
    } else {
      // check if user is in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", data.user.id);

      if (profileError) {
        console.error("Error checking profile:", profileError);
        return;
      }

      // if user don't in profiles table
      if (!profileData || profileData.length === 0) {
        // insert user into profiles table
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: data.user.id, username: "DESIRED_USERNAME" }]);

        if (insertError) {
          console.error("Error inserting profile:", insertError);
          return;
        }
      }

      alert("登入成功");
      document.cookie = `token=${data.session.access_token}; Max-Age=900; Secure; HttpOnly; Path=/; SameSite=Strict`;
      router.push(process.env.NEXT_PUBLIC_HOME_PAGE);
    }
  };

  // const getUserData = async () => {
  //   const temp = await supabase
  //   .from('profiles').insert([{username:"test001"}  ]);
  //   console.log(temp)
  //   // if (insertError) {
  //   //   console.error('Error adding profile:', insertError);
  //   // }
  //   // }
  // }
  // getUserData()

  return (
    <Layout title="My Todos">
      <form
        className="p-4 md:py-10 md:px-16 bg-white rounded-xl shadow-md w-full max-w-[650px] mx-auto"
        onSubmit={handleSubmit(onUserLogin, formOnErrors)}
      >
        <div className="mb-12">
          <TextInput
            label="e-mail"
            {...register("account", {
              required: "e-mail為必填",
            })}
            error={errors.account}
            type="text"
            placeholder="請輸入帳號"
          />
          <TextInput
            label="密碼"
            {...register("password", {
              required: "密碼為必填",
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
                message: "密碼至少包含1個符號 & 英文大寫",
              },
            })}
            error={errors.password}
            type="password"
            placeholder="請輸入密碼"
          />
        </div>
        <div className="flex justify-center items-center flex-wrap gap-4">
          <Link href={"/SignUp"}>
            <span className="rounded mx-2 border-2 px-4 py-1 cursor-pointer transition-all hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold">
              註冊
            </span>
          </Link>
          <button
            type="submit"
            className="rounded mx-2 border-2 px-4 py-1 cursor-pointer transition-all hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold"
          >
            <span>登入</span>
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Index;
