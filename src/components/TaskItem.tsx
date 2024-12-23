import { useState } from 'react';
import { format } from 'date-fns';
import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {Textarea} from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTodo } from '../contexts/ManagerContext';
import { toast } from 'sonner';

const priorityColors = {
  'Very Important': 'bg-red-500',
  'Important': 'bg-yellow-500',
  'Not Important': 'bg-blue-500',
};

export default function TaskItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleDelete = () => {
    deleteTodo(todo.id);
    toast.success('Task deleted successfully');
  };

  const handleSave = () => {
    updateTodo(todo.id, { text: editedText });
    setIsEditing(false);
    toast.success('Task updated successfully');
  };

  const toggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
    toast.success(todo.completed ? 'Task marked as incomplete' : 'Task completed');
  };

  return (
    <Card className={`w-full max-w-screen-lg mx-auto my-4 transition-all duration-200 ${todo.completed ? 'opacity-75' : ''}`}>
      <CardContent className="p-4 flex items-start gap-4">
        <Checkbox
        checked={todo.completed}
        onCheckedChange={toggleComplete}
        className="mt-1 bg-white"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
              {todo.title}
            </h3>
            <Badge variant="secondary" className={priorityColors[todo.priority as keyof typeof priorityColors]}>
              {todo.priority}
            </Badge>
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-2">
           <Textarea
            value={editedText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditedText(e.target.value)}
            className="flex-1 resize"
            rows={3}
            />
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={handleSave}>
                  <CheckIcon className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <p className={`text-muted-foreground ${todo.completed ? 'line-through' : ''}`}>
              {todo.text}
            </p>
          )}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Created {format(new Date(todo.createdAt), 'MMM d, yyyy')}</span>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                disabled={todo.completed}
              >
                <PencilSquareIcon className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive"
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
