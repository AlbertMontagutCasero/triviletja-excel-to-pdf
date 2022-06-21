import {Pregunta} from "./pregunta.js";

export class PreguntaBuilder {
  #pregunta
  #respuestas = []
  #type

  withRespuestas(respuestas) {
    this.#respuestas = this.#removeVoidStrigs(respuestas)
    return this
  }

  #removeVoidStrigs(array){
    return array.filter(element => {
      return element !== '';
    });
  }

  withType(type) {
    this.#type = type
    return this
  }

  withPregunta(pregunta) {
    this.#pregunta = pregunta
    return this
  }

  build() {
    return new Pregunta(this.#type, this.#pregunta, this.#respuestas)
  }
}