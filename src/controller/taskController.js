class TaskController {
  constructor(store, setTasks) {
    this.store = store;
    this.setTasks = setTasks;
  }

  refreshView() {
    this.setTasks([...this.store.task]);
  }

  handleAddTask(text) {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    this.store.addTask(trimmedText);
    this.refreshView();
  }

  handleDeleteTask(id) {
    this.store.deleteTask(id);
    this.refreshView();
  }

  handleToggleTask(id) {
    this.store.toggleTask(id);
    this.refreshView();
  }
}

export default TaskController;
