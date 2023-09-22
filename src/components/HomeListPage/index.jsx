import { Cross2Icon } from "@radix-ui/react-icons";
import cx from "classnames";
import { useEffect, useState } from "react";

import TodoBtn from "@/components/TodoBtn";

/**
 * @param {string} title
 * @param {Array.<object>} todoList
 * @param {boolean} isMove
 * */
const HomeListPage = ({
  title,
  todoList,
  isMove,
  renderAdd,
  renderDelete,
  handleAdd,
}) => {
  const [newTodoList, setNewTodoList] = useState([]);

  useEffect(() => {
    setNewTodoList((prev) => (prev = todoList?.map((e) => e)));
    //由於todoList 是一個會變動的state
    //為了確保新的List能夠更新，所以加入到array中進行監聽
  }, [todoList]);

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

  const sendItemID = (e, item) => {
      e.preventDefault();
      e.stopPropagation();
      handleAdd(item);
  };

  return (
    <div
      className={cx(
        "min-w-full bg-white flex flex-col items-center py-4 px-8 transition-all duration-700 min-h-[480px]",
        { "translate-x-[-100%]": isMove }
      )}
    >
      <h3 className="text-3xl text-gray-600 font-bold">{title}</h3>
      <ul className="self-start w-full">
        {/* 這邊以todo的長度 > 0，判斷是否有todo */}
        {newTodoList.length > 0 &&
          newTodoList.map((todo, index) => (
            <li
              className="my-2 py-2 border-b-2 flex justify-between"
              data-todo={"todo" + index}
              key={"todo" + index}
            >
              <span className="text-gray-600">{todo.title}</span>
              <div className="flex gap-[20px]">
                {renderAdd && (
                  <TodoBtn
                    renderChildren={renderAdd}
                    handleClick={(e) => {
                      sendItemID(e, index);
                    }}
                    className={"bg-green-700"}
                  />
                )}
                <TodoBtn
                  renderChildren={renderDelete}
                  handleClick={(e) => handleDeleteBtnClick(e, index)}
                  className={"bg-red-700"}
                />
              </div>
            </li>
          ))}
        {newTodoList.length <= 0 && <div>這邊沒有資料~~~</div>}
      </ul>
    </div>
  );
};

export default HomeListPage;
