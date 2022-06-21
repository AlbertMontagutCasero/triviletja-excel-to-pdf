import {PdfKitGenerator} from "./pdf-kit-generator.js";
import {Conversor} from "./conversor.js";

export class PdfGenerator {
  #tarjetas;
  /**
   * @type {PdfKitGenerator}
   */
  #pdfGeneratorInfrastructure
  #cornerMargin = 45;


  constructor(tarjetas) {
    this.#tarjetas = tarjetas;
    this.#pdfGeneratorInfrastructure = new PdfKitGenerator()
  }

  generate() {
    this.#pdfGeneratorInfrastructure.createPdf();

    const totalPreguntasByPage = this.#getTotalTarjetesByPage();

    for (let i = 0; i < this.#tarjetas.length; i++){
      const currentTarjeta = this.#tarjetas[i];
      const isFirstTarjeta = i === 0
      const tarjetaIndexInCurrentPage = i % totalPreguntasByPage;
      const isFirstTarjetaInThePage = tarjetaIndexInCurrentPage === 0
      if (!isFirstTarjeta && isFirstTarjetaInThePage){
        this.#pdfGeneratorInfrastructure.createNewPage();
      }

      this.#createTarjeta(tarjetaIndexInCurrentPage, currentTarjeta)
    }

    this.#pdfGeneratorInfrastructure.build();
  }

  #getPagesNum() {
    const totalTarjetesByPage = this.#getTotalTarjetesByPage();
    return this.#tarjetas.length / totalTarjetesByPage;
  }

  #getTotalTarjetesByPage() {
    const tarjetaSize = this.#getTarjetaSize();
    const documentHeight = this.#getDocumentHeight();
    return Math.trunc(documentHeight / tarjetaSize.height);
  }

  #getDocumentHeight() {
    return this.#getA4Size().height
  }

  #getTarjetaSize(){
    const width = Conversor.cmToPt(9);
    const height = Conversor.cmToPt(6.4);

    return {
      width: width,
      height: height,
    }
  }

  /**
   *
   * @param position
   * @param {Tarjeta} tarjeta
   */
  #createTarjeta(position, tarjeta) {
    const tarjetaPosition = this.#getTarjetaPositionByIndex(position);

    this.#createPregunta(tarjetaPosition, tarjeta.getPregunta(), tarjeta.getTipo());
    this.#createRespuesta(tarjetaPosition, tarjeta.getRespuestas())
    this.#createCutLines(tarjetaPosition);
  }

  #createPregunta(position, pregunta, tipo) {
    const tarjetaSize = this.#getTarjetaSize();

    this.#pdfGeneratorInfrastructure.createPreguntaImage(position, tarjetaSize);
    this.#pdfGeneratorInfrastructure.createTipo(position, tarjetaSize, tipo);
    this.#pdfGeneratorInfrastructure.createTextPregunta(position, tarjetaSize, pregunta);
  }

  #createRespuesta(position, respuestas) {
    const tarjetaSize = this.#getTarjetaSize();

    this.#pdfGeneratorInfrastructure.createRightImage(position, tarjetaSize);
    this.#pdfGeneratorInfrastructure.createRespuestaText(position, tarjetaSize, respuestas);
  }

  #getA4Size(){
    return {
      width: 595,
      height: 842
    }
  }

  #getTarjetaPositionByIndex(currentNumberOfTarjetes) {
    const tarjetaSize = this.#getTarjetaSize();
    const cornerMargin = this.#cornerMargin

    return {
      x: cornerMargin,
      y: cornerMargin + currentNumberOfTarjetes * tarjetaSize.height
    }
  }

  #createCutLines(tarjetaPosition) {
    const tarjetaSize = this.#getTarjetaSize();

    this.#pdfGeneratorInfrastructure.createCutLines(tarjetaPosition, tarjetaSize)
  }
}

