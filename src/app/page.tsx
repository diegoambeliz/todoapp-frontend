import TodoBoard from "./components/todo-board/TodoBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Todo App by Deamm</h1>
      <TodoBoard apiUrl={process.env.URL_API!}></TodoBoard>
    </main>
  );
}
