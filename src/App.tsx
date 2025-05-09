import "./App.css";
import Dashboard from "./components/Dashboard.tsx/Dashboard";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { TasksProvider } from "./context/taskContext";

function App() {
  return (
    <TasksProvider>
      <div className="flex flex-row h-screen w-full">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <Dashboard />
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;
