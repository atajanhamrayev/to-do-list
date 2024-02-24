import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    const localCompletedTasks = localStorage.getItem("completedTasks");
    if (localTasks || localCompletedTasks) {
      if (localTasks) {
        const parsedTasks = JSON.parse(localTasks);
        setTasks(parsedTasks);
      }
      if (localCompletedTasks) {
        const parsedCompletedTasks = JSON.parse(localCompletedTasks);
        setCompletedTasks(parsedCompletedTasks);
      }
    } else {
      const stringedTasks = JSON.stringify(tasks);
      localStorage.setItem("tasks", stringedTasks);

      const stringedCompletedTasks = JSON.stringify(completedTasks);
      localStorage.setItem("completedTasks", stringedCompletedTasks);
    }
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };
  const handleAddTask = () => {
    if (inputValue !== "") {
      const stringedTasks = JSON.stringify([...tasks, inputValue]);
      localStorage.setItem("tasks", stringedTasks);
      setTasks([...tasks, inputValue]);
      setInputValue("");
    } else {
      alert("Write some text!"); //sghvckshcdbsdbcsdjcncsjnjndskjcbslhjbdc
    }
  };
  const handleDelete = (taskIndex) => {
    const filteredArr = tasks.filter((task, index) => {
      return index !== taskIndex;
    });
    const filteredCompletedArr = completedTasks.filter((task, index) => {
      return index + 1 + tasks.length !== taskIndex;
    });

    const stringedTasks = JSON.stringify(filteredArr);
    localStorage.setItem("tasks", stringedTasks);

    const stringedCompletedTasks = JSON.stringify(filteredCompletedArr);
    localStorage.setItem("completedTasks", stringedCompletedTasks);

    setTasks(filteredArr);
    setCompletedTasks(filteredCompletedArr);
  };

  const handleChangeLi = (taskIndex) => {
    tasks.map((task, index) => {
      if (index === taskIndex) {
        const stringedCompletedTasks = JSON.stringify([
          ...completedTasks,
          task,
        ]);
        localStorage.setItem("completedTasks", stringedCompletedTasks);
        setCompletedTasks([...completedTasks, task]);

        const filteredArr = tasks.filter((task, index) => {
          return index !== taskIndex;
        });
        const stringedTasks = JSON.stringify(filteredArr);
        localStorage.setItem("tasks", stringedTasks);

        setTasks(filteredArr);
      }
    });

    completedTasks.map((task, index) => {
      if (index + 1 + tasks.length === taskIndex) {
        const stringedTasks = JSON.stringify([...tasks, task]);
        localStorage.setItem("tasks", stringedTasks);
        setTasks([...tasks, task]);

        const filteredArr = completedTasks.filter((task, index) => {
          return index + 1 + tasks.length !== taskIndex;
        });
        const stringedCompletedTasks = JSON.stringify(filteredArr);
        localStorage.setItem("completedTasks", stringedCompletedTasks);

        setCompletedTasks(filteredArr);
      }
    });
  };

  return (
    <div
      className="w-[360px] mx-auto my-[100px]  bg-[#f7f7f7] 
		shadow-[0_0_3px_rgba(0,0,0,0.1)]"
    >
      <div>
        <h1 className="w-full bg-[#2980b9] text-white m-0 py-[10px] px-[20px] uppercase text-[24px] font-normal ">
          To-Do List
        </h1>
        <div className="flex flex-row h-[48px]">
          <input
            type="text"
            value={inputValue}
            onChange={handleChangeInput}
            className="text-[18px] bg-[#f7f7f7] w-[80%] py-[13px] pr-[13px] pl-[20px] box-border text-[#2980b9] 
					focus:bg-[#fff] border-[2px] border-solid border-[#2980b9] focus:outline-none"
            placeholder="Add New Task..."
          />
          <button
            className="bg-[#2980b9] w-[20%] box-border h-full text-white"
            onClick={handleAddTask}
          >
            Add task
          </button>
        </div>
      </div>

      <ol className="m-0 p-0 ">
        {tasks.map((todo, index) => (
          <li
            className="bg-[#fff] h-[40px] leading-[40px] flex  justify-between"
            key={index}
          >
            <p onClick={() => handleChangeLi(index)} className="flex">
              <span className="w-[40px] border-[#29809b] border-[2px] border-solid text-center hover:bg-[#29809b] hover:text-white">
                {index + 1}
              </span>
              <span className="ml-[10px]">{todo}</span>
            </p>
            <button
              className="px-2 font-medium border-2 border-[#29809b] inline-block hover:bg-[#29809b] hover:text-white transition-all "
              onClick={() => handleDelete(index)}
            >
              🗑
            </button>
          </li>
        ))}
        {completedTasks.map((todo, index) => (
          <li
            className="bg-[#fff] h-[40px] leading-[40px] flex  justify-between"
            key={index}
          >
            <p
              onClick={() => handleChangeLi(index + tasks.length + 1)}
              className="line-through text-gray-500 flex"
            >
              <span className="w-[40px] border-[#29809b] border-[2px] border-solid text-center hover:bg-[#29809b] hover:text-white">
                {index + tasks.length + 1}
              </span>
              <span className="ml-[10px]">{todo}</span>
            </p>
            <button
              className="px-2 font-medium border-2 border-[#29809b] hover:bg-[#29809b]  hover:text-white transition-all "
              onClick={() => handleDelete(index + tasks.length + 1)}
            >
              🗑
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
