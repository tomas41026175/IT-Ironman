import React, { useState } from "react";
import cx from "classnames";

const Modal = ({ isOpen, onClose, originArr }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // logic functionss
  const changeCase = (inputString, toLowerCase) => {
    if (toLowerCase) {
      return inputString.toLowerCase();
    } else {
      return inputString.toUpperCase();
    }
  };
  const filterFunc = (keyword) => {
    const newKeyword = changeCase(keyword, true);
    const filteredData = originArr.data?.filter((data) => {
      return data.title.toLowerCase().includes(newKeyword) && keyword !== "";
    });

    return filteredData;
  };
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    const result = filterFunc(e.target.value);
    setFilteredData(result);
  };

  return (
    <div
      className={cx(
        "gap-[20px] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 shadow-md border-2 flex flex-wrap justify-center items-center py-10 px-20 w-[95%] mx-auto max-w-[450px]",
        { block: isOpen, hidden: !isOpen }
      )}
    >
      <div className="flex justify-start items-center flex-wrap gap-4">
        <label className="text-xl select-none">請輸入資料：</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleOnChange(e)}
          className="border-2 flex-1"
        />
      </div>

      {filteredData?.length !== 0 && (
        <ul className="self-start w-full">
          <div className="w-full text-center">
            {filteredData &&
              filteredData.map(
                (data, index) =>
                  data && (
                    <li
                      className="my-2 py-2 border-b-2 flex justify-between gap-4 md:gap-0"
                      data-todo={`todo${index}`}
                      key={index}
                    >
                      <span className="flex-1">{data.title}</span>
                      <div className="flex gap-[20px]"></div>
                    </li>
                  )
              )}
          </div>
        </ul>
      )}
      <button
        type="button"
        onClick={onClose}
        className="bg-red-600 text-white px-4 py-2 rounded-md absolute right-2 top-2"
      >
        X
      </button>
    </div>
  );
};

/**
 * @description a component include toggleBtn & Modal
 * @param {array} data
 */
const SearchBar = (data) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="self-center min-w-[80px] text-center rounded mx-2 border-2 px-4 py-1 cursor-pointer shadow-md transition-all bg-white hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold my-2 md:my-0"
      >
        搜尋todo
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} originArr={data} />
    </div>
  );
};

export default SearchBar;
