import {PreguntaBuilder} from "./pregunta-builder.js";

export class PreguntasFactory {
  #csvRows

  constructor(csvRows) {
    this.#csvRows = csvRows;
  }

  createWithCsvRows() {
    const preguntas = [];
    for (let i = 0; i < this.#csvRows.length; i++) {
      const [type, textoPregunta, ...respuestas] = this.#csvRows[i]

      const pregunta = new PreguntaBuilder()
      .withRespuestas(respuestas)
      .withPregunta(textoPregunta)
      .withType(type)
      .build();

      preguntas.push(pregunta)
    }

    return preguntas
  }
}