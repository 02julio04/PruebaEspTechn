import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TaskDashboard from './pages/TaskDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tareas" />} />
        <Route path="/tareas" element={<TaskDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
