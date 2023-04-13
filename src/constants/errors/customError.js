class CustomError extends Error {
  constructor(data) {
    super(data.description);
    this.code = data.code;
  }
}

module.exports = CustomError;
