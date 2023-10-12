既然有登入畫面那就也會有註冊的畫面，基本上就是把登入的 UI 搬過來改掉參數就可以了。

```
       <form
        className="p-4 md:py-10 md:px-16 bg-white rounded-xl shadow-md w-full max-w-[650px] mx-auto"
      >
        <div className="mb-12">
          <TextInput
            label="e-mail"
            type="text"
            placeholder="guest001@test.com"
          />
          <TextInput
            label="密碼"
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
```

稍微做個修正，我們就得到了一個註冊的畫面，接下來就是開始為我們的畫面添加功能。

照慣例，我們先理清思路，接下來我們需要做的事情有

-   確認欄位都有被填寫
-   確認資料都符合驗證格式
-   點擊註冊的時候將資料帶出來

簡單來說就是 表單驗證 & 獲得表單資料，接下來我們會使用 react-form-hook 進行表單處理。

和一開始說的一樣，我們先來介紹一下甚麼是 React-form-hook，這是一個常用的 react-form-library，它提供內建的 hook，為我們提供快速驗證表單 & 管理表單狀態的服務。
主要特點在於

-   API 使用成本較低
-   內建各種驗證模式
-   整合 TypeScript
-   控制組件的 re-render 時機
-   效能優秀

現在我們對於 react-form-hook 已經有了基本的認識，接下來就是了解如何透過它來驗證我們的表單。

在安裝完畢之後我們會需要引入 useFrom

```
{useForm} from "react-hook-form"
```

接下來透過解構的方式，從 useForm 中取出我們需要使用的 method。

```
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
```

首先看到```register```，這是一個用於傳遞一個元件連接至form，透過這個Method，我們可以追蹤form中的value、狀態、錯誤，只有當被追蹤的元件狀態改變 / 錯誤的時候才會重新render。

在使用之前我們需要知道```register```是透過ref的方式來註冊元件，所以會需要使用到ref欄位。
但是我們現在的欄位已經是一個component了怎麼辦? 接下來我們需要對這個component做一點修正，

```
const TextInput = forwardRef(
  (
    { label, error, type, placeholder, InputOnChange = () => {}, ...props },
    ref
  ) => {
    return (
      <div className="my-8 w-full flex flex-col md:flex-row">
        <label className="w-[30%] min-w-[100px] text-2xl italic font-bold text-gray-500">
          {label}：
        </label>
        <div className="flex-1">
          <input
            ref={ref}
            type={type}
            className="w-full py-2 border-2 rounded-md focus-visible:outline-none pl-4 text-gray-500"
            placeholder={placeholder}
            {...props}
          />
          {error && <p className="text-sm text-red-400">{error.message}</p>}
        </div>
      </div>
    );
  }
);
```

首先我們需要使用```forwardRef```，來包裝整個component，因為我們需要透過```forwardRef```來接收一個ref，這邊會有兩個參數，一個就是原本component中使用的參數，第二個參數則是從外部接收的ref，並且在內部元件中在建立一個ref來使用這個ref。

然後我們再加上一些react-form-hook會使用到的參數，最後透過"...props"剩餘參數的方式來接受一些還不確定會不會使用到的參數。



