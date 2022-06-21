export class Tarjeta {
  #tipo;
  #pregunta;
  #respuestas;

  constructor(tipo, pregunta, respuestas) {
    this.#tipo = tipo;
    this.#pregunta = pregunta;
    this.#respuestas = respuestas;
  }

  getTipo(){
    return this.#tipo
  }

  getRespuestas(){
    return this.#respuestas
  }

  getPregunta(){
    return this.#pregunta;
  }

  toString(){
    return `${this.#tipo} ${this.#pregunta} ${this.#respuestas ?? ""}`
  }
}