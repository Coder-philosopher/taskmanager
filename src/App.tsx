import { Toaster } from '@/components/ui/sonner';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { TodoProvider, useTodo } from './contexts/ManagerContext';

function TaskList() {
  const { todos } = useTodo();

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <div className="text-center text-muted-foreground">
          No tasks yet. Add one above!
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <TodoProvider>

      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <TaskForm />
          <TaskList />
        </div>
      </div>
      <Toaster />
    </TodoProvider>
  );
}

export default App;