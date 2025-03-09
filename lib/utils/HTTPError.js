class HTTPError extends Error {
  constructor(...args) {
    super('HTTPError');
    this.others = args;
  }

  describe() {
    return `${this.name}
${JSON.stringify(this.others)}
${this.stack}`;
  }
}

export default HTTPError;
