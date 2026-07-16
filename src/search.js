/**
 * TabVault Search Module
 * Handles real-time task filtering
 * by title, note, and domain
 */

/**
 * Extracts the domain from a URL
 * @param {string} url - Full URL
 * @returns {string} Domain name
 */
function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
}

/**
 * Filters tasks by search query
 * Matches against title, note, and domain
 * Case-insensitive
 * @param {Array} tasks - All tasks
 * @param {string} query - Search string
 * @returns {Array} Matching tasks
 */
function searchTasks(tasks, query) {
  if (!query || query.trim() === '') {
    return tasks;
  }
  
  const q = query.toLowerCase().trim();
  
  return tasks.filter(task => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(q);
    const noteMatch = task.note
      ? task.note.toLowerCase().includes(q)
      : false;
    const domainMatch = getDomain(task.url)
      .toLowerCase()
      .includes(q);
      
    return titleMatch || noteMatch || domainMatch;
  });
}

/**
 * Filters tasks by status tab
 * @param {Array} tasks - All tasks
 * @param {string} filter - 'all'|'active'|'completed'
 * @returns {Array} Filtered tasks
 */
function filterByStatus(tasks, filter) {
  switch (filter) {
    case 'active':
      return tasks.filter(t => t.status === 'active');
    case 'completed':
      return tasks.filter(t => t.status === 'completed');
    default:
      return tasks;
  }
}

/**
 * Gets task counts for filter tab badges
 * @param {Array} tasks - All tasks
 * @returns {Object} Counts per status
 */
function getTaskCounts(tasks) {
  return {
    all: tasks.length,
    active: tasks.filter(t => t.status === 'active').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };
}

module.exports = { 
  searchTasks, 
  filterByStatus,
  getTaskCounts,
  getDomain
};
