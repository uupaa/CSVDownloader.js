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
csv.download("3.csv", { BOM: true, TSV: false, ENC: CSV_ENC.UTF8 });
csv.download("5.csv", { BOM: true, TSV: false, ENC: CSV_ENC.UTF16 })
csv.clear();
```

# CSV file type and availabilities

| # | BOM | TYPE | ENCODE | file name |
|---|-----|------|--------|-----------|
| 1 | NO  | CSV  | CP932  | 1.csv     |
| 2 | NO  | TSV  | CP932  | 2.csv     |
| 3 | YES | CSV  | UTF-8  | 3.csv     |
| 4 | YES | TSV  | UTF-8  | 4.csv     |
| 5 | YES | CSV  | UTF-16 | 5.csv     |
| 6 | YES | TSV  | UTF-16 | 6.csv     |

| Apps                | #1  | #2  | #3  | #4  | #5  | #6  |
|---------------------|-----|-----|-----|-----|-----|-----|
| Mac Numbers         | OK  | OK  | OK  | OK  | OK  | OK  |
| Excel for Mac ver16 | NG1 | NG3 | OK  | NG2 | OK  | NG2 |
| Google spreadsheet  | OK  | OK  | OK  | OK  | OK  | OK  |
| Windows Excel 2010  | OK  | OK  | OK  | OK  | OK  | OK  |

- OK: It's OK.
- NG1: It was garbled.
- NG2: Tab separator(tsv) not supported.
- NG3: NG1 and NG2.

We recommended are `#3` and `#5`.

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

`CSVDownloader#download(filename:String, options = { BOM: false, TSV: false, ENC: CSV_ENC.UTF16 }):void` is create csv file and download.

| options | type    | default |          |
|---------|---------|---------|----------|
| `BOM`   | Boolean | false   | true is Add UNICODE BOM |
| `TSV`   | Boolean | false   | true is Tab separated CSV |
| `ENC`   | CSV_ENC | CSV_ENC.UTF16 | Specify encoding, CSV_ENC.UTF16, CSV_ENC.UTF8 and CSV_ENC.CP932 |
