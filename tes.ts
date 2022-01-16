class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

const err = new CustomAPIError('error cus')

console.log(err)