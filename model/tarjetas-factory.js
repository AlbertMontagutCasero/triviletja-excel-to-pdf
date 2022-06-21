import {TarjetaBuilder} from "./tarjeta-builder.js";

export class TarjetasFactory {
  #csvRows

  constructor(csvRows) {
    this.#csvRows = csvRows;
  }

  createWithCsvRows() {
    const tarjetas = [];
    for (let i = 0; i < this.#csvRows.length; i++) {
      const [type, pregunta, ...respuestas] = this.#csvRows[i]

      const tarjeta = new TarjetaBuilder()
      .withRespuestas(respuestas)
      .withPregunta(pregunta)
      .withTipo(type)
      .build();

      tarjetas.push(tarjeta)
    }

    return tarjetas
  }
}