const SHEET_NAME = 'Diagnosticos';

const COLUMNS = [
  { header: 'Data/hora', key: 'submittedAt' },
  { header: 'Nome', key: 'name' },
  { header: 'E-mail', key: 'email' },
  { header: 'Nome do negócio', key: 'businessName' },
  { header: 'Objetivo', key: 'objective' },
  { header: 'Segmento', key: 'segment' },
  { header: 'Site', key: 'websiteUrl' },
  { header: 'Redes sociais', key: 'socialLinks' },
  { header: 'Oferta', key: 'offer' },
  { header: 'Ticket médio', key: 'ticket' },
  { header: 'Como vende', key: 'salesModel' },
  { header: 'Comprador ideal', key: 'idealBuyer' },
  { header: 'Problema central', key: 'problem' },
  { header: 'Transformação - de', key: 'transformationFrom' },
  { header: 'Transformação - para', key: 'transformationTo' },
  { header: 'Diferencial', key: 'differentiator' },
  { header: 'Objeções', key: 'objections' },
  { header: 'Tom de voz', key: 'tone' },
  { header: 'Promt gerado', key: 'prompt' }
];

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const sheet = getSheet_();
    ensureHeaderRow_(sheet);

    const row = COLUMNS.map(function(column) {
      if (column.key === 'submittedAt') {
        return payload.submittedAt ? new Date(payload.submittedAt) : new Date();
      }
      return payload[column.key] || '';
    });

    sheet.appendRow(row);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return json_({ ok: true, message: 'Webhook ativo.' });
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  return JSON.parse(e.postData.contents);
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaderRow_(sheet) {
  const headers = COLUMNS.map(function(column) { return column.header; });
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const currentHeaders = headerRange.getValues()[0];
  const shouldWriteHeaders = headers.some(function(header, index) {
    return currentHeaders[index] !== header;
  });

  if (shouldWriteHeaders) {
    headerRange.setValues([headers]);
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
