class User {
  constructor(user) {
    this.email = user.email;
    this._id = user._id;
    this.fullName = user.fullName;
    this.addresses = user.addresses;
  }
}

module.exports = User