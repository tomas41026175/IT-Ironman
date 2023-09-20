import { Layout } from "@/layout/Layout";
import HomeListPage from "@/components/HomeListPage";
import { useState } from "react";
import cx from "classnames";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import TodoBtn from "@/components/TodoBtn";
import TodoInput from "@/components/TodoList";

const todoList = [
  "做點什麼1",
  "做點什麼2",
  "做點什麼3",
  "做點什麼4",
  "做點什麼7",
  "做點什麼8",
  "做點什麼9",
];

function Home() {
  const [isFocus, setIsFocus] = useState({ tag1: true, tag2: false });

  const handleGetSubmitResult = (result) => {
    console.log("from TodoInput:", result);
  }

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

  /**
   * @param {Event} e
   * @param {Number} targetTodoId
   */
  const handleDeleteBtnClick = (e, targetTodoId) => {
    e.preventDefault();
    e.stopPropagation();
    newTodoList.splice(targetTodoId, 1);
    setNewTodoList([...newTodoList]);
  };

  return (
    <main>
      <Layout>
        <div className="w-[90%] md:w-1/2 min-h-[300px] bg-[#E3D5C9] rounded-md flex flex-col shadow-md py-10 gap-16">
          <TodoInput handleOnSubmit={handleGetSubmitResult}/>
          <div className="flex justify-start w-[90%] mx-auto relative">
            <div className="absolute rounded-md top-[-40px] h-[40px] left-4">
              <span
                className={cx(
                  "inline-block py-2 px-4 mr-4 rounded-t-md select-none cursor-pointer text-[1.2rem] font-bold hover:bg-gray-400 hover:text-white",
                  { "bg-gray-400 text-white": isFocus.tag1 },
                  { "text-gray-600  bg-white": !isFocus.tag1 }
                )}
                onClick={() => togglePage("tag1")}
              >
                未完成事項
              </span>
              <span
                className={cx(
                  "inline-block py-2 px-4 mr-4 rounded-t-md select-none cursor-pointer text-[1.2rem] font-bold hover:bg-gray-400 hover:text-white",
                  { "bg-gray-400 text-white": isFocus.tag2 },
                  { "text-gray-600  bg-white": !isFocus.tag2 }
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
                renderChildren={() => <Cross2Icon className="w-6 h-6" />}
              >
                <TodoBtn
                  renderChildren={() => <CheckIcon className="w-6 h-6" />}
                  handleClick={(e) => handleDeleteBtnClick(e, index)}
                  className={"bg-green-700"}
                />
                <TodoBtn
                  renderChildren={() => <Cross2Icon className="w-6 h-6" />}
                  handleClick={(e) => handleDeleteBtnClick(e, index)}
                  className={"bg-red-700"}
                />
              </HomeListPage>
              <HomeListPage
                title="已完成事項"
                todoList={todoList}
                isMove={isFocus.tag2}
              >
                <TodoBtn
                  renderChildren={() => <CheckIcon className="w-6 h-6" />}
                  handleClick={(e) => handleDeleteBtnClick(e, index)}
                  className={"bg-green-700"}
                />
                <TodoBtn
                  renderChildren={() => <Cross2Icon className="w-6 h-6" />}
                  handleClick={(e) => handleDeleteBtnClick(e, index)}
                  className={"bg-red-700"}
                />
              </HomeListPage>
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}

export default Home;
