export class CsvParser {
  #rawCsv;
  #splitter = ";"

  constructor(rawCsv) {
    this.#rawCsv = rawCsv;
  }

  getRowsSplitInColumns() {
    const rawRows = this.#getRawRowsWithoutTitleRow();

    const rows = [];
    for (const row of rawRows) {
      const columns = row.split(this.#splitter);
      rows.push(columns);
    }

    return rows
  }

  #getRawRowsWithoutTitleRow() {
    const rawRows = this.#rawCsv.split("\r\n");
    rawRows.shift()
    return rawRows;
  }
}