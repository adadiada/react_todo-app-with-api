import { Todo } from '../types/Todo';
import * as React from 'react';
import cn from 'classnames';
import { useState, useEffect, useRef } from 'react';

type Props = {
  todos: Todo[];
  filteredTodos: Todo[];
  deleteTodo: (id: number) => void;
  tempTodo: Todo | null;
  loadingTodoId: number | null;
  handleUpdateTodo: (t: Todo) => Promise<Todo>;
  loading: boolean;
};

export const MainTodo: React.FC<Props> = ({
  todos: todos,
  filteredTodos,
  deleteTodo,
  tempTodo,
  loadingTodoId,
  handleUpdateTodo,
  loading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [setEditTitle, setEditTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <section
      className={`todoapp__main ${(todos.length === 0 && !tempTodo) || loading ? 'hidden' : ''}`}
      data-cy="TodoList"
    >
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() =>
                handleUpdateTodo({ ...todo, completed: !todo.completed })
              }
            />
          </label>
          {isEditing ? (
            <input
              data-cy="TodoTitleField"
              value={todo.title}
              ref={inputRef}
              className="todo__title-field"
              autoFocus
            />
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
          )}

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(todo.id)}
          >
            ×
          </button>
          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', {
              'is-active': loadingTodoId === todo.id,
            })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
      {tempTodo && (
        <div
          key="tempTodo"
          data-cy="Todo"
          className={cn('todo', {
            completed: tempTodo.completed,
          })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={tempTodo.completed}
              readOnly
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {}}
          >
            ×
          </button>
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
