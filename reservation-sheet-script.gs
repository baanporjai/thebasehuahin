const SHEET_ID = 'REPLACE_WITH_YOUR_SHEET_ID';

function doPost(e) {
  // เปิดสเปรดชีตด้วย ID ตรงๆ แทน getActiveSpreadsheet() เพราะทำงานได้แน่นอนไม่ว่า
  // deployment จะถูกสร้างแบบ container-bound หรือ standalone ก็ตาม
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const data = JSON.parse(e.postData.contents);

  if (data.action === 'update_status') {
    return updateStatusByRow(sheet, data);
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(h => String(h).trim().toLowerCase());

  const values = {
    timestamp: new Date(),
    type: data.type === 'daily' ? 'รายวัน' : 'รายเดือน',
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
    roomid: data.roomId || '',
    roomname: data.roomName || '',
    checkindate: data.checkInDate || '',
    checkoutdate: data.checkOutDate || '',
    moveindate: data.moveInDate || '',
    duration: data.duration || '',
    note: data.note || '',
    status: 'ใหม่',
  };

  const row = headers.map(h => (h in values) ? values[h] : '');
  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// อัปเดตสถานะด้วยเลขแถว (row) โดยตรง — ไม่ใช้ id เพราะ Worker ส่ง row มาให้แล้ว
function updateStatusByRow(sheet, data) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    .map(h => String(h).trim().toLowerCase());
  const colStatus = headers.indexOf('status') + 1;
  const row = Number(data.row);

  if (!colStatus || !row || row < 2 || row > sheet.getLastRow()) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Invalid row or status column not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.getRange(row, colStatus).setValue(data.status || 'ใหม่');
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < 2) {
    return ContentService
      .createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
    .map(h => String(h).trim().toLowerCase());
  const rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  const result = rows.map((r, i) => {
    const obj = { row: i + 2 };
    headers.forEach((h, j) => {
      obj[h] = r[j] instanceof Date ? r[j].toISOString() : r[j];
    });
    return obj;
  });

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
