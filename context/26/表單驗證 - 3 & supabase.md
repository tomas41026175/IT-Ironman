最後我們需要處理的是，當表單送出後需要進行那些處理。
```
     <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
      >
```
這邊我們會使用到```handleSubmit```這個 Method ，```handleSubmit```會在我們送出表單的時候，對整個表單中包含```register```的元件都進行一輪檢查。
```handleSubmit```接收兩個函式參數，第一個參數表示檢查通過後執行的後執行的函式，第二個參數表示檢查沒通過，用來處理錯誤訊息的函式。

首先我們先來定義這兩個函式

//通過
```
  const onSubmit = async (data) => {
    ...處理登入
    console.log(user,error)
    alert("已送出，請收取驗證信件");
  };
```

//失敗
```
  const onErrors = () => {
    console.log(errors);
  };
```

* 這邊的 errors 為我們前面從 useFrom 中取出的 Method。

這樣在我們送出表單的時候，就是根據檢查結果執行這兩個函式。

接下來就是通過 supabase 來實現整體登入的功能，一樣我們先對這個工具做個介紹。
Link : https://supabase.com/docs

這是一個類似於 firebase 一樣提供許多內建功能的工具，其中包含身分驗證、透握storage儲存資料、自動開立API ...等，其目的在於提供完整的後端服務，使開發者可以專注於建立專案。

現在我們知道這是一個提供許多後端 & database功能的工具，讓我們可以專注於專案開發，不需要花太多時間去了解背後做了甚麼，只需要透過閱讀文件就可以使用大多數的功能。