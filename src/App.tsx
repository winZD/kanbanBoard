import "./App.css";
import { OfflineBanner } from "./components/Banner/OfflineBanner";

import Dashboard from "./components/Dashboard.tsx/Dashboard";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { TasksProvider } from "./context/taskContext";

function App() {
  return (
    <TasksProvider>
      <div className="flex border-1 flex-col md:flex-row min-h-screen max-w-[1360px]">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <Dashboard />
        </div>
        <OfflineBanner />
      </div>
    </TasksProvider>
  );
}

export default App;
