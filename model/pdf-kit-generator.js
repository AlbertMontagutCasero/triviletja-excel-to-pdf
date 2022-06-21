import fs from "fs";
import PDFDocument from "pdfkit";

export class PdfKitGenerator {
  #pdfDocument;
  #outputName = "output.pdf"

  createPdf() {
    this.#pdfDocument = new PDFDocument({size: 'A4'});
    this.#pdfDocument.pipe(fs.createWriteStream(this.#outputName));
  }

  createPreguntaImage({x, y}, {width, height}) {
    this.#pdfDocument.image('assets/pregunta-background.jpg', x, y, {
      fit: [width, height],
      align: 'center',
      valign: 'center'
    });
  }

  createRightImage({x, y}, {width, height}){
    this.#pdfDocument.image('assets/pregunta-background.jpg', x + width, y, {
      fit: [width, height],
      align: 'center',
      valign: 'center'
    });
  }

  createTipo({x: startX, y: startY}, {width, height}, tipo){
    const options = {
      width: width,
      align: 'center',
    }

    this.#pdfDocument.text(tipo, startX, startY + 30, options)
  }

  createRespuestaText({x: startX, y: startY}, {width, height}, respuestas){
    const horizontalMargin = 25;
    const x = startX  + width + horizontalMargin

    const numberOfRespuestas= respuestas.length
    const verticalSpace = 8
    const textOptions = {
      width: width - 40,
    }

    let totalTextHeight = 0
    for (let i = 0; i < numberOfRespuestas; i++){
      const text = respuestas[i]
      const textHeight = this.#pdfDocument.heightOfString(text, textOptions);
      totalTextHeight += textHeight + verticalSpace
    }

    const verticalCenter = startY + (height / 2)
    let nextRespuestaStartY =  verticalCenter - totalTextHeight / 2;
    // this.#pdfDocument.lineJoin('miter')
    // .rect(x, nextRespuestaStartY, width - 40, totalTextHeight)
    // .stroke();

    for (let i = 0; i < numberOfRespuestas; i++){
      const text = respuestas[i]
      const textHeight = this.#pdfDocument.heightOfString(text, textOptions)
      const currentRespuestaStartY = nextRespuestaStartY + verticalSpace * i
      this.#pdfDocument.text(text, x, currentRespuestaStartY, textOptions);
      nextRespuestaStartY += textHeight //+ verticalSpace * i
    }
  }

  createCutLines({x: leftMargin, y}, tarjetaSize) {
    const bottom = y + tarjetaSize.height
    const right = leftMargin + tarjetaSize.width * 2
    const center = leftMargin + tarjetaSize.width
    this.#pdfDocument
    .lineWidth(2)
    .moveTo(leftMargin, y)
    .lineTo(leftMargin, bottom)
    .moveTo(leftMargin, y)
    .lineTo(right, y)
    .moveTo(leftMargin, bottom)
    .lineTo(right, bottom)
    .moveTo(right, y)
    .lineTo(right, bottom)
    .moveTo(center, y)
    .lineTo(center, bottom)
    .dash(3, {space: 8})

    this.#pdfDocument.stroke("grey");
  }

  createTextPregunta({x, y}, {width, height}, text) {
    const margin = 40;
    const options = {
      width: width - margin,
      align: 'center',
      baseline: "middle"
    }
    const textHeight = this.#pdfDocument.heightOfString(text, options);
    const halfTextVerticalSize = 0.5 * textHeight;
    const verticalCenter = y + height / 2;
    const horizontalCenter = x + margin / 2;

    this.#pdfDocument.text(
      text, horizontalCenter, verticalCenter - halfTextVerticalSize, options);
  }

  createNewPage() {
    this.#pdfDocument
    .addPage()
  }

  build() {
    this.#pdfDocument.end();
  }
}