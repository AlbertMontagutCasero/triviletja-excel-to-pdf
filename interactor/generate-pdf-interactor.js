import {CsvParser} from "../model/csvParser.js";
import {PreguntasFactory} from "../model/preguntas-factory.js";
import {PdfGenerator} from "./pdf-generator.js";

export class GeneratePdfInteractor {
  execute(request) {
    const csvParser = new CsvParser(request.getRawCsv());
    const rows = csvParser.getRowsSplitInColumns();

    const preguntas = new PreguntasFactory(rows).createWithCsvRows();

    new PdfGenerator(preguntas).generate();

  }
}

