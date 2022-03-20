const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  _limit;
  _body = [];

  constructor(options) {
    super(options);
    this._limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this._body.push(chunk);
    if (Buffer.concat(this._body).length > this._limit) {
      callback(new LimitExceededError(), chunk);
      return;
    }
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
