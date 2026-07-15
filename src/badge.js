/**
 * TabVault Badge Manager
 * Controls the toolbar icon badge —
 * shows active task count,
 * turns red when tasks are overdue
 */

/**
 * Updates the extension toolbar badge
 * based on current task state
 * @param {Array} tasks - All tasks
 */
function updateBadge(tasks) {
  const activeTasks = tasks.filter(
    t => t.status === 'active'
  );
  
  const hasOverdue = activeTasks.some(task => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  });

  const count = activeTasks.length;

  if (count === 0) {
    chrome.action.setBadgeText({ text: '' });
    return;
  }

  chrome.action.setBadgeText({ 
    text: String(count) 
  });

  chrome.action.setBadgeBackgroundColor({
    color: hasOverdue ? '#DC2626' : '#0D9488'
  });
}

/**
 * Clears the badge completely
 */
function clearBadge() {
  chrome.action.setBadgeText({ text: '' });
}

/**
 * Listens for storage changes and 
 * updates badge automatically
 */
function initBadgeListener() {
  chrome.storage.onChanged.addListener(
    (changes, area) => {
      if (area === 'local' && changes.tasks) {
        updateBadge(changes.tasks.newValue || []);
      }
    }
  );
}

module.exports = { 
  updateBadge, 
  clearBadge,
  initBadgeListener
};
