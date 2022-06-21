import fs from "fs";
import PDFDocument from "pdfkit";

export class PdfKitGenerator {
  #pdfDocument;
  #outputName = "output.pdf"

  createPdf() {
    this.#pdfDocument = new PDFDocument({size: 'A4'});
    this.#pdfDocument.pipe(fs.createWriteStream(this.#outputName));
  }

  createLeftImage({x, y}) {
    const width = this.#cmToPt(9);
    const height = this.#cmToPt(6.4);
    this.#pdfDocument.image('assets/pregunta-background.jpg', x, y, {
      fit: [width, height],
      align: 'center',
      valign: 'center'
    });
  }

  createRightImage({x, y}){
    const width = this.#cmToPt(9);
    const height = this.#cmToPt(6.4);
    this.#pdfDocument.image('assets/pregunta-background.jpg', x + width, y, {
      fit: [width, height],
      align: 'center',
      valign: 'center'
    });
  }

  createRightText({x, y}){
    const width = this.#cmToPt(9);
    const height = this.#cmToPt(6.4);
    const margin = 40;
    const options = {
      width: width - margin,

    }
    const text = "Respuesta 1 Respuesta 2 Respuesta 3"
    const textHeight = this.#pdfDocument.heightOfString(text, options);
    const halfTextVerticalSize = 0.5 * textHeight;
    const verticalCenter = y + height / 2;
    const horizontalCenter = x + width + margin / 2;

    this.#pdfDocument.text(
      text, horizontalCenter, verticalCenter - halfTextVerticalSize, options);
  }

  createCutLines() {
    const length = 30;
    const startPoint = {x: 10, y: 10}
    this.#pdfDocument
      .moveTo(startPoint.x, startPoint.y)
      .lineTo(startPoint.x, startPoint.y + length)
      .moveTo(startPoint.x, startPoint.y)
      .lineTo(startPoint.x + length, startPoint.y)
      .dash(3, {space: 10})
    this.#pdfDocument.stroke("grey");
  }

  createText({x, y}) {
    const width = this.#cmToPt(9);
    const height = this.#cmToPt(6.4);
    const margin = 40;
    const options = {
      width: width - margin,
      align: 'center',
      baseline: "middle"
    }
    const text= "Esto es una super Esto es una superEsto es una superEsto es una super pregunta Esto es una super pregunta Esto es una super pregunta Esto es una super pregunta"
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

  #cmToPt(cm) {
    return cm * 28.3464566929;
  }

  #ptToCm(pt) {
    return pt * 0.035277723881255;
  }
}