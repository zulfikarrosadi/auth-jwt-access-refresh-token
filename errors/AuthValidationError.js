class AuthValidationError extends Error {
  constructor(path, value, message) {
    super(message);
    this.path = path;
    this.value = value;
  }

  errorMap() {
    const errors = [
      {
        path: this.path,
        value: this.value,
        message: this.message,
      },
    ];
    return errors;
  }
}

module.exports = { AuthValidationError };
