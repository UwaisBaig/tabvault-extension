/**
 * TabVault Export Module
 * Exports task data as JSON or CSV
 * Everything runs locally — no server needed
 */

/**
 * Exports tasks as a JSON file download
 * @param {Array} tasks - Tasks to export
 */
function exportJSON(tasks) {
  const data = {
    exported_at: new Date().toISOString(),
    version: '1.0.0',
    total: tasks.length,
    tasks: tasks.map(task => ({
      title: task.title,
      url: task.url,
      note: task.note,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      created_at: new Date(task.created_at)
        .toISOString(),
      completed_at: task.completed_at 
        ? new Date(task.completed_at).toISOString() 
        : null
    }))
  };

  downloadFile(
    JSON.stringify(data, null, 2),
    'tabvault-tasks.json',
    'application/json'
  );
}

/**
 * Exports tasks as a CSV file download
 * @param {Array} tasks - Tasks to export
 */
function exportCSV(tasks) {
  const headers = [
    'Title', 'URL', 'Note', 'Due Date',
    'Priority', 'Status', 'Created', 'Completed'
  ];

  const rows = tasks.map(task => [
    escapeCSV(task.title),
    escapeCSV(task.url),
    escapeCSV(task.note || ''),
    task.dueDate || '',
    task.priority || '',
    task.status,
    new Date(task.created_at).toISOString(),
    task.completed_at 
      ? new Date(task.completed_at).toISOString() 
      : ''
  ]);

  const csv = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  downloadFile(
    csv,
    'tabvault-tasks.csv',
    'text/csv'
  );
}

/**
 * Triggers a file download in the browser
 * @param {string} content - File content
 * @param {string} filename - Download filename
 * @param {string} type - MIME type
 */
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Escapes a value for CSV format
 * @param {string} value - Value to escape
 * @returns {string} CSV-safe string
 */
function escapeCSV(value) {
  if (!value) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') 
      || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

module.exports = { exportJSON, exportCSV };
