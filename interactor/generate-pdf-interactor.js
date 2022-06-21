import {CsvParser} from "../model/csvParser.js";
import {TarjetasFactory} from "../model/tarjetas-factory.js";
import {PdfGenerator} from "../model/pdf-generator.js";

export class GeneratePdfInteractor {
  execute(request) {
    const csvParser = new CsvParser(request.getRawCsv());
    const rows = csvParser.getRowsSplitInColumns();

    const tarjetas = new TarjetasFactory(rows).createWithCsvRows();

    new PdfGenerator(tarjetas).generate();
  }
}

