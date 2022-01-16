interface A {
  message: string
}

abstract class CustomAPIError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export default CustomAPIError;
