const initialTasks = [
  {
    id: 1,
    name: "Review pull requests",
    priority: "high",
    completed: false
  },
  {
    id: 2,
    name: "Update documentation",
    priority: "medium",
    completed: true
  },
  {
    id: 3,
    name: "Fix dashboard bugs",
    priority: "high",
    completed: false
  },
  {
    id: 4,
    name: "Attend team meeting",
    priority: "low",
    completed: false
  }
];

let tasks = initialTasks.map(task => ({ ...task }));
let sortAscending = true;

const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Add a new task
function addTask(name, priority = "low") {
  const trimmedName = name.trim();

  if (!trimmedName) {
    alert("Please enter a task name");
    return;
  }

  const newTask = {
    id: Date.now() + Math.random(),
    name: trimmedName,
    priority,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
}

// Toggle completion
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Filter tasks
function getFilteredTasks() {
  const search = searchInput.value.toLowerCase();
  const status = statusFilter.value;
  const priority = priorityFilter.value;

  return tasks.filter(task => {
    const matchesSearch =
      task.name.toLowerCase().includes(search);

    const matchesStatus =
      status === "all" ||
      (status === "completed" && task.completed) ||
      (status === "active" && !task.completed);

    const matchesPriority =
      priority === "all" ||
      task.priority === priority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  filteredTasks.sort((a, b) =>
    sortAscending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  taskCount.textContent =
    `Showing ${filteredTasks.length} of ${tasks.length} tasks`;

  if (filteredTasks.length === 0) {
    taskList.textContent = "No tasks found.";
    return;
  }

  filteredTasks.forEach(task => {
    const item = document.createElement("div");
    item.className =
      `task ${task.completed ? "completed" : ""}`;

    const name = document.createElement("span");
    name.className = "task-name";
    name.textContent = task.name;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = task.priority.toUpperCase();

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent =
      task.completed ? "Undo" : "Complete";

    toggleBtn.addEventListener("click", () => {
      toggleTask(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "danger";

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    actions.append(toggleBtn, deleteBtn);
    item.append(name, badge, actions);
    taskList.appendChild(item);
  });
}

// Button handlers
document.getElementById("addTaskBtn")
  .addEventListener("click", () => {
    addTask(taskInput.value, priorityInput.value);
  });

taskInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTask(taskInput.value, priorityInput.value);
  }
});

// Filter handlers
searchInput.addEvent
