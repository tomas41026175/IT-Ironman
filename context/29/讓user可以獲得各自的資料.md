我們昨天透過建立一個 userSlice 來管理登入的 user 資料，現在我們可以透過剛剛取得的 userId，在獲取資料的時候進行篩選，確保我們在登入之後獲得的資料會是屬於該 user 的。

首先我們需要在 supabase 中的 database 加上 userId 這個欄位，用於篩選相應的 user 資料。

再來我們需要從 supabase 中獲得相應的資料，由於我們前面在登入之後已經將登入者的 id 存入 userSlice 中，所以我們可以直接在獲取資料的時候，從 store 中取出這筆資料。

```
const supabase = getSupabaseClient();

const getSupaTodos = async userId => {
    try {
        const { data: todos } = await supabase.from('todos').select('*').eq('userId', userId);
        return todos;
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
    }
};
```

```
const useGetSupaTodo = () => {
    const { user } = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch and dispatch user's todos.
        getSupaTodos(user.id)
            .then(todos => {
                dispatch(updateTodoArr(todos));
            })
            .catch(err => {
                console.error("Error while getting todos:", err);
            });
    }, [user.id, dispatch]);
};
```

現在我們只要執行這隻 custom hook 就可以在獲得資料之後， 將得到的資料放進 store 中。現在我們已經可以透過這個 hook 去取得我們要的資料。

接下來會出現一個問題，就是目前我們是透過 userId 進行資料篩選，如果 user 直接進到裡面的頁面怎麼辦?
最簡單的方式就是添加一個判斷函式，用來確認 user 目前是否已經登入了，那麼要以甚麼為依據呢?
前面我們有使用 userSlice 儲存 user 登入後的資料，這也就代表了，若這筆資料目前是空的等於 user 還沒登入。

// useCheckUserLogin

```
import useUser from './useUser';
import { useRouter } from 'next/router';
const { useEffect } = require('react');

const useCheck = () => {
    const router = useRouter();
    const { user } = useUser();

    const checkLogined = () => {
        if (!user.id) {
            alert('請先登入');
            router.push('/');
        }
    };
    useEffect(() => {
        checkLogined();
    }, [user]);
};

export default useCheck;
```

這樣只要 user 進到內容頁面，就會執行這個 hook 進行登入確認。