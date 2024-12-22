import React, { createContext, useContext, useReducer } from 'react';

type Priority = 'Very Important' | 'Important' | 'Not Important';

interface Todo {
  id: string;
  title: string;
  text: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const todoReducer = (state: Todo[], action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        ...action.todo,
        id: crypto.randomUUID(),
        createdAt: new Date()
      }];
    case 'UPDATE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, ...action.updates } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_TODO', todo });
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', id, updates });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', id });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}