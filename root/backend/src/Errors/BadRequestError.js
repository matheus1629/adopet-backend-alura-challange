export default class BadRequestError extends Error {
  constructor(message, status = 400, name = "BadRequestError") {
    super(message);
    this.name = name;
    this.status = status;
  }
}
