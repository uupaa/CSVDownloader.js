const iconv = require("iconv-lite"); // npm i -S iconv-lite

const CSV_ENC = {
  UTF8:  "UTF8",  // UTF-8
  UTF16: "UTF16", // UTF-16LE
  CP932: "CP932", // Windows932, Shift-JIS, S-JIS, SJIS
};

class CSVDownloader {
  constructor() {
    this._head = []; // csv head row
    this._body = []; // csv body rows
  }
  clear() {
    this._head = [];
    this._body = [];
  }
  addHead(array) {
    this._head = array;
  }
  addBody(array) {
    this._body.push(array);
  }
  download(file_name, options = { BOM: false, TSV: false, ENC: CSV_ENC.UTF16 }) {
    const BOM = options.BOM || false;
    const TSV = options.TSV || false;
    const ENC = options.ENC || CSV_ENC.UTF16;
    switch (ENC) {
      case CSV_ENC.UTF8: this._download_utf8(file_name, BOM, TSV); break;
      case CSV_ENC.UTF16: this._download_utf16(file_name, BOM, TSV); break;
      case CSV_ENC.CP932: this._download_cp932(file_name, BOM, TSV); break;
    }
  }
  _download_utf8(file_name, BOM_, TSV_) {
    const CRLF = "\r\n";
    const BOM = BOM_ ? "\uFEFF" : ""; // new Uint8Array([0xEF, 0xBB, 0xBF]);
    const SEP = TSV_ ? "\t" : ",";
    const CSV_HEAD = this._head.length ? this._head.join(SEP) : "";
    const CSV_BODY = this._body.length ? this._body.map(row => row.join(SEP)).join(CRLF) : "";
    const enc = new TextEncoder();
    const CSV_HEAD_UTF8 = enc.encode(CSV_HEAD);
    const CSV_ROWS_UTF8 = enc.encode(CSV_BODY);

    const blob = new Blob([BOM, CSV_HEAD_UTF8, "\r\n", CSV_ROWS_UTF8], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name;
    link.click();
    URL.revokeObjectURL(url);
  }
  _download_utf16(file_name, BOM_, TSV_) {
    const CRLF = "\r\n";
    const BOM = BOM_ ? "\uFEFF" : ""; // new Uint8Array([0xEF, 0xBB, 0xBF]);
    const SEP = TSV_ ? "\t" : ",";
    const CSV_HEAD = this._head.length ? this._head.join(SEP) : "";
    const CSV_BODY = this._body.length ? this._body.map(row => row.join(SEP)).join(CRLF) : "";

    const blob = new Blob([BOM, CSV_HEAD, "\r\n", CSV_BODY], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name;
    link.click();
    URL.revokeObjectURL(url);
  }
  _download_cp932(file_name, BOM_, TSV_) {
    const CRLF = "\r\n";
    const BOM = BOM_ ? "\uFEFF" : ""; // new Uint8Array([0xEF, 0xBB, 0xBF]);
    const SEP = TSV_ ? "\t" : ",";
    const CSV_HEAD = this._head.length ? this._head.join(SEP) : "";
    const CSV_BODY = this._body.length ? this._body.map(row => row.join(SEP)).join(CRLF) : "";
    const CSV_HEAD_CP932 = iconv.encode(CSV_HEAD, "CP932");
    const CSV_ROWS_CP932 = iconv.encode(CSV_BODY, "CP932");
    const blob = new Blob([BOM, CSV_HEAD_CP932, "\r\n", CSV_ROWS_CP932], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file_name;
    link.click();
    URL.revokeObjectURL(url);
  }
}

module.exports = {
  CSV_ENC,
  CSVDownloader,
};
