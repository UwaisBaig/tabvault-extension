/**
 * TabVault Nudge System
 * Manages weekly notification reminders
 * for unfinished tasks using chrome.alarms
 */

const ALARM_NAME = 'weeklyNudge';

/**
 * Day name to number mapping
 * chrome.alarms uses day of week 0-6
 */
const DAYS = {
  'Sunday': 0, 'Monday': 1, 'Tuesday': 2,
  'Wednesday': 3, 'Thursday': 4, 
  'Friday': 5, 'Saturday': 6
};

/**
 * Schedules the weekly nudge alarm
 * based on user settings
 * @param {Object} settings - Nudge settings
 * @param {string} settings.day - Day name
 * @param {string} settings.time - Time "HH:MM"
 * @param {boolean} settings.enabled - On/off
 */
async function scheduleNudge(settings) {
  await chrome.alarms.clear(ALARM_NAME);
  
  if (!settings.enabled) return;

  const [hours, minutes] = settings.time
    .split(':')
    .map(Number);
    
  const now = new Date();
  const targetDay = DAYS[settings.day] ?? 1;
  
  let daysUntilTarget = targetDay - now.getDay();
  if (daysUntilTarget <= 0) daysUntilTarget += 7;
  
  const firstRun = new Date(now);
  firstRun.setDate(now.getDate() + daysUntilTarget);
  firstRun.setHours(hours, minutes, 0, 0);

  chrome.alarms.create(ALARM_NAME, {
    when: firstRun.getTime(),
    periodInMinutes: 7 * 24 * 60 // repeat weekly
  });
}

/**
 * Fires the nudge notification
 * Only fires if task count meets threshold
 * @param {Array} tasks - All tasks
 * @param {number} threshold - Min tasks to fire
 */
function fireNudge(tasks, threshold = 5) {
  const activeTasks = tasks.filter(
    t => t.status === 'active'
  );
  
  if (activeTasks.length < threshold) return;

  chrome.notifications.create({
    type: 'basic',
    iconUrl: '../icons/icon48.png',
    title: 'TabVault — Unfinished Tasks',
    message: `You have ${activeTasks.length} unfinished tasks. Ready to clear some?`,
    priority: 1
  });
}

module.exports = { scheduleNudge, fireNudge };
