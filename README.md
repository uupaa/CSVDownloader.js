# uupaa.csv.downloader.js

Create and download a CSV file on a browser.

# Usage

`$ npm i -S uupaa.csv.downloader.js`

```js
const { CSVDownloader, CSV_ENC } = require("uupaa.csv.downloader.js");
const csv = new CSVDownloader();
csv.addHead([ "created_at", "updated_at", "data" ]);
csv.addBody([ 123, 123, "123" ]);
csv.addBody([ 123, 123, "123" ]);
csv.download("3.csv", { BOM: true, TSV: false, ENC: CSV_ENC.UTF8,  DQT: true });
csv.download("5.csv", { BOM: true, TSV: false, ENC: CSV_ENC.UTF16, DQT: true })
csv.clear();
```

# CSV file type and availabilities

| Applications                    | Version     |
|---------------------------------|-------------|
| `MAC-EXCEL` as Excel for Mac      | 16          |
| `WIN-EXCEL` as Windows Excel      | 2010        |
| `MAC-NUMS`  as Mac Numbers        | 6.0         |
| `GOG-SHEET` as Google Spreadsheet | N/A         |       

| BOM | TYPE | ENCODE | `MAC-EXCEL` | `WIN-EXCEL` | `MAC-NUMS` | `GOG-SHEET` |
|-----|------|--------|-----------|-----------|----------|-----------|
| NO  | CSV  | CP932  | `NG1`     | OK        | OK       | OK        |
| NO  | TSV  | CP932  | `NG3`     | OK        | OK       | OK        |
| YES | CSV  | UTF-8  | OK        | OK        | OK       | OK        |
| YES | TSV  | UTF-8  | `NG2`     | OK        | OK       | OK        |
| YES | CSV  | UTF-16 | OK        | OK        | OK       | OK        |
| YES | TSV  | UTF-16 | `NG2`     | OK        | OK       | OK        |

- OK: It's OK.
- `NG1`: It was garbled.
- `NG2`: Tab separator(tsv) not supported.
- `NG3`: NG1 and NG2.

If you need to support excel on Mac, use `BOM` and `CSV`.

# CSVDownloader API

## new CSVDownloader()

`const csv = new CSVDownloader()` is constructor.

## CSVDownloader#clear()

`CSVDownloader#clear():void` is clear csv header and csv body data.

## CSVDownloader#addHead()

`CSVDownloader#addHead(array:Array):void` is add csv header.

## CSVDownloader#addBody()

`CSVDownloader#addBody(array:Array):void` is add csv row to body.

## CSVDownloader#download()

`CSVDownloader#download(filename:String, options = { BOM: false, TSV: false, ENC: CSV_ENC.UTF16, DQT: false }):void` is create csv file and download.

| options | type    | default |          |
|---------|---------|---------|----------|
| `BOM`   | Boolean | false   | true is Add UNICODE BOM |
| `TSV`   | Boolean | false   | true is Tab separated CSV |
| `ENC`   | CSV_ENC | CSV_ENC.UTF16 | Specify encoding, CSV_ENC.UTF16, CSV_ENC.UTF8 and CSV_ENC.CP932 |
| `DQT`   | Boolean | false   | true is Enclose all values in double quotes |
