import React, { useState } from 'react';
import './App.css';

// Компонент TaskItem отображает отдельную задачу в списке
function TaskItem({ task, toggleComplete, deleteTask, editTask, index }) {
  // Локальное состояние для редактирования задачи
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.text);

  // Локальное состояние для редактирования задачи
  const handleEditClick = () => {
    setIsEditing(true);
  };

   // Функция для начала редактирования задачи
  const handleSaveClick = () => {
    editTask(index, editedTask);
    setIsEditing(false);
  };
//  редактирование, вывод кнопки сохранить
  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button onClick={handleSaveClick}>Сохранить</button>
        </div>
      ) : (
        <div>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.text}
          </span>
          <button onClick={() => toggleComplete(index)}>
            {task.completed ? 'Отменить' : 'Завершить'}
          </button>
          <button onClick={() => deleteTask(index)}>Удалить</button>
          <button onClick={handleEditClick}>Редактировать</button>
        </div>
      )}
    </div>
  );
}

// Компонент TaskList отображает список задач с возможностью фильтрации
function TaskList({ tasks, toggleComplete, deleteTask, editTask, filter }) {
  //Фильтрация задач
  const filteredTasks = filter === 'all' ? tasks :
    filter === 'completed' ? tasks.filter(task => task.completed) :
    tasks.filter(task => !task.completed);

  return (
    <div>
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

// Компонент TaskForm позволяет добавлять новые задачи
function TaskForm({ addTask }) {
  const [newTask, setNewTask] = useState('');

  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Добавить задачу"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

// Компонент App объединяет TaskList, TaskForm и фильтры
function App() {
  //Глобальное состояние для списка задач и фильтрации
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

//Функция для управоения задачами
  const addTask = (text) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Список задач</h1>
      <div>
        <label>
          Фильтр:
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">Все</option>
            <option value="completed">Завершенные</option>
            <option value="uncompleted">Незавершенные</option>
          </select>
        </label>
      </div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} editTask={editTask} filter={filter} />
    </div>
  );
}

export default App;