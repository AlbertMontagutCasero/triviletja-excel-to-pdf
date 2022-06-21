export class GeneratePdfRequest {
  #rawCsv

  constructor(rawCsv) {
    this.#rawCsv = rawCsv;
  }

  getRawCsv() {
    return this.#rawCsv
  }
}