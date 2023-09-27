import React from 'react'

/**
 * @param {function(): JSX.Element} renderChildren
 * @param {function()} handleClick
 * */

const TodoBtn = ({ renderChildren, handleClick,className }) => {

  const defaultClass = `rounded-md w-8 h-8 flex justify-center items-center transition-transform hover:scale-[1.1] text-white `
  const newClass = defaultClass + className
  return (
    <button
      className={newClass}
      onClick={handleClick}
    >
      {renderChildren()}
    </button>
  );
};

export default TodoBtn;
