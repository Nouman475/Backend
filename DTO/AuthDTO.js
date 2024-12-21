class User {
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.balance = user.balance;
    this.fullName = user.fullName;
    this.addresses = user.addresses;
    this.ProfileImageUrl = user.ProfileImageUrl;
  }
}

module.exports = User