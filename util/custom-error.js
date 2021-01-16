class CustomError extends Error {
  constructor(code, data = null) {
    super();
    this.code = code;
    this.body = data;
  }

  getInfo() {
    return {
      code: this.code,
      body: this.body,
    };
  }
}

module.exports = CustomError;
