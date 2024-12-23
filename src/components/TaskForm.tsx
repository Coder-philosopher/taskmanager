import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ListPlus, Minimize, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTodo } from '../contexts/ManagerContext';
import { toast } from 'sonner';
import { useState } from 'react';
import './form.css';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().min(1, 'Description is required'),
  priority: z.enum(['Very Important', 'Important', 'Not Important']),
});

export default function TaskForm() {
  const { addTodo } = useTodo();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      text: '',
      priority: 'Important',
    },
  });

  const [isMinimized, setIsMinimized] = useState(false);

  // Toggle minimize/restore form
  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTodo({ ...values, completed: false });
    form.reset();
    toast.success('Task added successfully');
  };

  return (
    <>
      {/* Main Form Component (Visible when expanded) */}
      {!isMinimized && (
        <Card
          id="task-form-card"
          className="w-full max-w-2xl mx-auto transition-all duration-300"
        >
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <ListPlus className="w-6 h-6" />
              Add New Task
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleMinimize}
              className="p-2"
            >
              <Minimize className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter task description..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Very Important">Very Important</SelectItem>
                          <SelectItem value="Important">Important</SelectItem>
                          <SelectItem value="Not Important">Not Important</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Add Task
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

{isMinimized && (
  <div className="minimized-icon" onClick={toggleMinimize}>
    <Maximize className="icon" /> {/* Icon component */}
  </div>
)}




    </>
  );
}
