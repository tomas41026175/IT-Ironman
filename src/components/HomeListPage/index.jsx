import React from "react";
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
  handleAdd,
  renderEdit,
  handleEdit,
  renderDelete,
  handleDelete,
  renderRecover,
  handleRecover,
}) => {
  const [newTodoList, setNewTodoList] = useState([]);

  useEffect(() => {
    setNewTodoList((prev) => (prev = todoList?.map((e) => e)));
    //由於todoList 是一個會變動的state
    //為了確保新的List能夠更新，所以加入到array中進行監聽
  }, [todoList]);

  const handleAction = (e, todo, actionHandler) => {
    e.preventDefault();
    e.stopPropagation();
    actionHandler(todo);
  };

  //因為component會重複使用 可使用useCallback避免每次render都要重新生成一次function
  // const handleAction = useCallback((e, todo, actionHandler) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     actionHandler(todo);
  // }, []);

  return (
    <div
      className={cx(
        "min-w-full bg-white flex flex-col items-center py-4 px-8 transition-all duration-700 min-h-[480px]",
        { "translate-x-[-100%]": isMove }
      )}
    >
      <h3 className="text-3xl text-gray-600 font-bold select-none">{title}</h3>
      <ul className="self-start w-full">
        {/* 這邊以todo的長度 > 0，判斷是否有todo */}
        {newTodoList.length > 0 &&
          newTodoList.map((todo, index) => (
            <li
              className="my-2 py-2 border-b-2 flex justify-between flex-wrap gap-4 md:gap-0"
              data-todo={"todo" + index}
              key={"todo" + index}
            >
              <span>{todo.title}</span>
              <div className="flex gap-[20px]">
                {renderEdit && (
                  <TodoBtn
                    renderChildren={renderEdit}
                    handleClick={(e) => {
                      handleAction(e, todo, handleEdit);
                    }}
                    className={"bg-yellow-700"}
                  />
                )}
                {renderAdd && (
                  <TodoBtn
                    renderChildren={renderAdd}
                    handleClick={(e) => {
                      handleAction(e, todo, handleAdd);
                    }}
                    className={"bg-green-700"}
                  />
                )}

                {renderRecover && (
                  <TodoBtn
                    renderChildren={renderRecover}
                    handleClick={(e) => {
                      handleAction(e, todo, handleRecover);
                    }}
                    className={"bg-yellow-700"}
                  />
                )}
                <TodoBtn
                  renderChildren={renderDelete}
                  handleClick={(e) => handleAction(e, todo, handleDelete)}
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
