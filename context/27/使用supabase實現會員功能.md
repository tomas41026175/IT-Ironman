首先我們需要安裝 supabase
```
npm install @supabase/supabase-js
```

接下來建立一個```.env-local```檔案，env 檔案通常用來保存重要的資料，像是 API 、 key ...等，不能公開在外部的資料

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```
然後在這個檔案中加上這兩行，其中的 value 可以從 supabase 中的設定找到資料。

現在我們已經做好了基本的設定，接下來就是開始使用這個工具了。
首先為了避免在每個使用到 supabase 都要 import，所以我們可以建立一個 utils 資料夾，用於存放這個功能。
```
|
|- src
|-- data
|--- utils
|---- getSupabaseClient.js
```

//getSupabaseClient.js
```
import { createClient } from "@supabase/supabase-js";
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const PASS = process.env.NEXT_PUBLIC_SUPABASE_PASS
const supabase = createClient(URL, PASS);

export default function getSupabaseClient() {
  return supabase;
}
```

這邊我們使用```process.env```的 Method 來取用.env.local 中所保存的資料。

```
import getSupabaseClient from "@/data/mock/utils/getSupabaseClient";
```

接下來在登入頁面中導入這個 function 後我們可以直接得到一個已經做好設定的 client ，並且我們使用一個常數來保存這個 client 。

```
const supabase = getSupabaseClient();
```

然後我們修正onSubmit函式，用來處理表單提交後的會員註冊。

```
    const onSubmit = async data => {
        const { user, error } = await supabase.auth.signUp({
            email: data.account,
            password: data.password,
        });
        console.log(user, error);
        alert('已送出，請收取驗證信件');
    };
```
這邊需要注意，因為有使用到 await ， 所以 onSubmit 會是一個 async 函式。

到這邊我們的註冊功能已經完成了。

接下來就是一樣的方式去處理登入功能，但是比較不一樣的地方在於，登入頁面在成功確認 user 身分後，會需要進行頁面跳轉，所以需要做一些修正。

建立一個 onUserLogin 函式
```
  const onUserLogin = async (userData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.account,
      password: userData.password,
    });

    if (!data.user) {
      alert("帳號或密碼錯誤");
      console.log(error);
      return;
    } else {
      alert("登入成功");
      document.cookie = `token=${data.session.access_token}; Max-Age=900; Secure; HttpOnly; Path=/; SameSite=Strict`;
      router.push(process.env.NEXT_PUBLIC_HOME_PAGE);
    }
  };
```

這邊可以看到，我們透過```signInWithPassword```的方式，使用密碼進行登入，並且使用的資料會是 user 在欄位中輸入並且經過 react-form-hook驗證後的資料。

若是沒收到 data.user 這筆資料就表示登入失敗，並且在登入成功後將 token 保存在 cookie 中，並且設定期限為900秒。