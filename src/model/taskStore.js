class TaskStore {
  constructor() {
    this.task = [];
  }
  addTask(name) {
    const newTask = {
      id: Date.now(),
      name: name,
      isCompleted: false,
    };
    this.task.push(newTask);
  }
  deleteTask(id) {
    this.task = this.task.filter((key) => key.id !== id);
  }
  toggleTask(id) {
    this.task = this.task.map((key) => {
      if (key.id === id) {
        if (key.isCompleted) {
          key.isCompleted = false;
        } else if (key.isCompleted === false) {
          key.isCompleted = true;
        }
      }
      return key;
    });
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new TaskStore();
    }
    return this._instance;
  }
}
export default TaskStore;
