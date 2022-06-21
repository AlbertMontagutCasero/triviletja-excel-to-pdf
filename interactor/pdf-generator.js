import {PdfKitGenerator} from "./pdf-kit-generator.js";

export class PdfGenerator {
  #preguntas;
  #pdfGeneratorInfrastructure

  constructor(preguntas) {
    this.#preguntas = preguntas;
    this.#pdfGeneratorInfrastructure = new PdfKitGenerator()
  }

  generate() {
    this.#pdfGeneratorInfrastructure.createPdf();
    const pagesNum = 2
    for (let i = 0; i < pagesNum; i++){
      if (i !== 0){
        this.#pdfGeneratorInfrastructure.createNewPage();
      }

      const position = {x: 10, y: 10};
      this.createTarjeta(position);
    }
    this.#pdfGeneratorInfrastructure.build();
  }

  createTarjeta(position) {
    this.createPregunta(position);
    this.createRespuesta(position)
  }

  createPregunta(position) {
    this.#pdfGeneratorInfrastructure.createCutLines();
    this.#pdfGeneratorInfrastructure.createLeftImage(position);
    this.#pdfGeneratorInfrastructure.createText(position);
  }

  createRespuesta(position) {
    this.#pdfGeneratorInfrastructure.createRightImage(position);
    this.#pdfGeneratorInfrastructure.createRightText(position);
  }
}

