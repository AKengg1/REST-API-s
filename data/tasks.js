let tasks = [
  { id: 1, title: "Buy groceries", done: false, userId: 1 },
  { id: 2, title: "Learn Express", done: false, userId: 1 },
  { id: 3, title: "Build an API", done: true, userId: 2 },
];
let nextId = 4;

export { tasks }
export const getNextId = () => nextId++