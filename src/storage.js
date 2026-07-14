/**
 * TabVault Storage Module
 * Handles all chrome.storage.local 
 * operations for task management
 */

const STORAGE_KEY = 'tasks';

/**
 * Retrieves all tasks from local storage
 * @returns {Promise<Array>} Array of task objects
 */
async function getAllTasks() {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      resolve(result[STORAGE_KEY] || []);
    });
  });
}

/**
 * Saves a new task to local storage
 * @param {Object} task - Task object to save
 * @returns {Promise<void>}
 */
async function saveTask(task) {
  const tasks = await getAllTasks();
  tasks.push(task);
  return new Promise((resolve) => {
    chrome.storage.local.set(
      { [STORAGE_KEY]: tasks }, 
      resolve
    );
  });
}

/**
 * Updates an existing task by ID
 * @param {string} id - Task ID to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
async function updateTask(id, updates) {
  const tasks = await getAllTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    return new Promise((resolve) => {
      chrome.storage.local.set(
        { [STORAGE_KEY]: tasks }, 
        resolve
      );
    });
  }
}

/**
 * Deletes a task by ID
 * @param {string} id - Task ID to delete
 * @returns {Promise<void>}
 */
async function deleteTask(id) {
  const tasks = await getAllTasks();
  const filtered = tasks.filter(t => t.id !== id);
  return new Promise((resolve) => {
    chrome.storage.local.set(
      { [STORAGE_KEY]: filtered }, 
      resolve
    );
  });
}

/**
 * Generates a unique task ID
 * @returns {string} Unique ID string
 */
function generateTaskId() {
  return 'task_' + Date.now() + '_' + 
    Math.random().toString(36).substr(2, 9);
}

module.exports = { 
  getAllTasks, 
  saveTask, 
  updateTask, 
  deleteTask,
  generateTaskId
};
