import todoListMock from "@/data/mock/todoList";
// const todoData = todoListMock.map((e) => e);

const handleTodoRequest = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" || req.method === "GET") {
    res.status(200).json({ todoList: todoListMock });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handleTodoRequest;
