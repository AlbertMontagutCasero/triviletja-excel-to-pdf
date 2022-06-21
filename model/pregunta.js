export class Pregunta {
  #type;
  #pregunta;
  #answers;

  constructor(type, pregunta, answers) {
    this.#type = type;
    this.#pregunta = pregunta;
    this.#answers = answers;
  }

  toString(){
    return `${this.#type} ${this.#pregunta} ${this.#answers ?? ""}`
  }
}