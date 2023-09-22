import { Layout } from "@/layout/Layout";
import HomeListPage from "@/components/HomeListPage";
import { useEffect, useState } from "react";
import cx from "classnames";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import TodoInput from "@/components/TodoList";
import { getTodoData } from "@/api/todo";

function Home() {
  const [isFocus, setIsFocus] = useState({ tag1: true, tag2: false });
  const [todoList, setTodoList] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);

  useEffect(() => {
    getTodoList()
      .then((res) => {
        setTodoList(res.data.todoList);
      })
      .catch((err) => console.log(err));
  }, []);

  const getTodoList = async () => {
    try {
      const data = await getTodoData();
      return data;
      // console.log(data);
    } catch (error) {
      console.error("get data error:", error);
    }
  };

  const handleGetSubmitResult = (result) => {
    // console.log("from TodoInput:", result);
    setTodoList(() => {
      const getLastItem = todoList[todoList.length - 1];
      const newTodo = [
        ...todoList,
        { ...getLastItem, id: getLastItem.id + 1, title: result, desc: "" },
      ];

      return newTodo;
    });
  };

  /**
   * @param {string} tag
   */
  const togglePage = (tag) => {
    setIsFocus((prev) => {
      //先儲存整個state
      const updateState = { ...prev };

      //如果點選的標籤已經active，就不執行
      if (!updateState[tag]) {
        //reset所有標籤
        for (const key in updateState) {
          if (key !== tag) {
            updateState[key] = false;
          }
        }

        //更新點選頁籤的狀態
        updateState[tag] = !prev[tag];
      }
      return updateState;
    });
  };

  const handleAddClick = (ItemId) => {
    const newTodoArr = todoList.map((e) => e);
    const doneItem = newTodoArr.splice(ItemId, 1);
    setTodoList(newTodoArr);
    // console.log(ItemId, newDoneArr);
    const newDoneArr = doneTodo.map((e) => e);
    newDoneArr.push(doneItem[0]);
    setDoneTodo(newDoneArr);
  };

  return (
    <main>
      <Layout>
        <div className="w-full max-w-[992px] min-h-[300px] bg-[#E3D5C9] rounded-md flex flex-col shadow-md py-10 gap-16">
          <TodoInput handleOnSubmit={handleGetSubmitResult} />
          <div className="flex justify-start w-[90%] mx-auto relative">
            <div className="absolute rounded-md top-[-40px] h-[40px] left-4">
              <span
                className={cx(
                  "inline-block py-2 px-4 mr-4 rounded-t-md select-none cursor-pointer text-[1.2rem] font-bold hover:bg-white hover:text-gray-600",
                  { "bg-gray-400 text-white": !isFocus.tag1 },
                  { "text-gray-600  bg-white": isFocus.tag1 }
                )}
                onClick={() => togglePage("tag1")}
              >
                未完成事項
              </span>
              <span
                className={cx(
                  "inline-block py-2 px-4 mr-4 rounded-t-md select-none cursor-pointer text-[1.2rem] font-bold hover:bg-white hover:text-gray-600",
                  { "bg-gray-400 text-white": !isFocus.tag2 },
                  { "text-gray-600  bg-white": isFocus.tag2 }
                )}
                onClick={() => togglePage("tag2")}
              >
                已完成事項
              </span>
            </div>
            <div className="overflow-x-hidden w-full flex relative z-5">
              <HomeListPage
                title="未完成事項"
                todoList={todoList}
                isMove={isFocus.tag2}
                renderAdd={() => <CheckIcon className="w-6 h-6" />}
                renderDelete={() => <Cross2Icon className="w-6 h-6" />}
                handleAdd={handleAddClick}
              />
              <HomeListPage
                title="已完成事項"
                todoList={doneTodo}
                isMove={isFocus.tag2}
                // renderAdd={renderCheck}
                renderDelete={() => <Cross2Icon className="w-6 h-6" />}
              />
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}

export default Home;
