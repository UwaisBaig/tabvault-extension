/**
 * TabVault Task Model
 * Defines the task data structure 
 * and helper functions
 */

/**
 * Task status constants
 */
const TASK_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

/**
 * Task priority constants
 */
const TASK_PRIORITY = {
  HIGH: 'p1',
  MEDIUM: 'p2',
  LOW: 'p3',
  NONE: null
};

/**
 * Creates a new task object with 
 * all required fields
 * @param {string} title - Page title
 * @param {string} url - Page URL
 * @param {string|null} note - Optional note
 * @param {string|null} dueDate - Optional due date
 * @returns {Object} New task object
 */
function createTask(title, url, note = null, dueDate = null) {
  return {
    id: 'task_' + Date.now(),
    title: title.slice(0, 100),
    url,
    favicon: getFaviconUrl(url),
    note: note ? note.slice(0, 120) : null,
    dueDate,
    priority: TASK_PRIORITY.NONE,
    status: TASK_STATUS.ACTIVE,
    created_at: Date.now(),
    completed_at: null
  };
}

/**
 * Gets the favicon URL for a given page URL
 * Uses Google's favicon service
 * @param {string} url - Page URL
 * @returns {string} Favicon URL
 */
function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return '';
  }
}

/**
 * Checks if a task is overdue
 * @param {Object} task - Task object
 * @returns {boolean} True if overdue
 */
function isOverdue(task) {
  if (!task.dueDate) return false;
  if (task.status === TASK_STATUS.COMPLETED) return false;
  return new Date(task.dueDate) < new Date();
}

/**
 * Gets a human-readable due date label
 * @param {string} dueDate - ISO date string
 * @returns {string} Label like "Due today", 
 *                   "1d overdue", "Due in 3d"
 */
function getDueDateLabel(dueDate) {
  if (!dueDate) return null;
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${Math.abs(diffDays)}d overdue`;
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else {
    return `Due in ${diffDays}d`;
  }
}

/**
 * Sorts tasks by priority:
 * Overdue first, then by due date, 
 * then by creation date
 * @param {Array} tasks - Array of tasks
 * @returns {Array} Sorted tasks
 */
function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const aOverdue = isOverdue(a);
    const bOverdue = isOverdue(b);
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate) return -1;
    if (b.dueDate) return 1;
    return b.created_at - a.created_at;
  });
}

module.exports = {
  TASK_STATUS,
  TASK_PRIORITY,
  createTask,
  getFaviconUrl,
  isOverdue,
  getDueDateLabel,
  sortTasks
};
