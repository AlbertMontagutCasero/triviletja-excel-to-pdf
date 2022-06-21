import * as fs from 'fs';
import {GeneratePdfRequest} from "./interactor/generate-pdf-request.js";
import {GeneratePdfInteractor} from "./interactor/generate-pdf-interactor.js";

function getCsv(){
  const fileName = "preguntas.csv"
  return fs.readFileSync(fileName, {encoding: 'utf-8'})
}

const generatePdfInteractor = new GeneratePdfInteractor();
generatePdfInteractor.execute(new GeneratePdfRequest(getCsv()))