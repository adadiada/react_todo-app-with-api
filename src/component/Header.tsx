import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';
// import { useFocus } from '../utils/ref';

type Props = {
  title: string;
  todos: Todo[];
  setTitle: (s: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  allCompleted: boolean;
  loading: boolean;
  toggleTodoAll: () => void;
};

export const Header: React.FC<Props> = ({
  title,
  setTitle,
  handleSubmit,
  allCompleted,
  loading,
  toggleTodoAll,
  todos,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={
            allCompleted ? 'todoapp__toggle-all active' : 'todoapp__toggle-all'
          }
          data-cy="ToggleAllButton"
          onClick={toggleTodoAll}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={loading}
        />
      </form>
    </header>
  );
};
