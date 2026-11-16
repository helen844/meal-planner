// Meal Planner — Google Drive sync
// Paste this into a new Apps Script project (script.google.com), change TOKEN,
// then Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.
// Copy the web app link and the token into the app's Settings.

const TOKEN = 'change-this-to-your-own-phrase';
const FILE_NAME = 'meal-planner-data.json';

function getFile_() {
  const files = DriveApp.getFilesByName(FILE_NAME);
  if (files.hasNext()) return files.next();
  return DriveApp.createFile(FILE_NAME, '{}', 'application/json');
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// The app reads your saved data (and the Test button checks the connection).
function doGet(e) {
  if ((e.parameter.token || '') !== TOKEN) return out_({ ok: false, message: 'Wrong token' });
  let data = {};
  try { data = JSON.parse(getFile_().getBlob().getDataAsString() || '{}'); } catch (err) { data = {}; }
  return out_({ ok: true, message: 'Connected to ' + FILE_NAME + ' in your Drive', data: data });
}

// The app saves everything (recipes, plans, settings) as one file.
function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'Bad request' }); }
  if (body.token !== TOKEN) return out_({ ok: false, error: 'Wrong token' });
  if (!body.data || typeof body.data !== 'object') return out_({ ok: false, error: 'No data' });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getFile_().setContent(JSON.stringify(body.data));
  } finally {
    lock.releaseLock();
  }
  return out_({ ok: true });
}
