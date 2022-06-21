import {Tarjeta} from "./tarjeta.js";

export class TarjetaBuilder {
  #pregunta
  #respuestas = []
  #tipo

  withRespuestas(respuestas) {
    this.#respuestas = this.#removeVoidStrigs(respuestas)
    return this
  }

  #removeVoidStrigs(array){
    return array.filter(element => {
      return element !== '';
    });
  }

  withTipo(tipo) {
    this.#tipo = tipo
    return this
  }

  withPregunta(pregunta) {
    this.#pregunta = pregunta
    return this
  }

  build() {
    return new Tarjeta(this.#tipo, this.#pregunta, this.#respuestas)
  }
}