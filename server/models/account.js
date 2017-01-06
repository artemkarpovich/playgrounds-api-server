import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const accountSchema = new Schema({
  email: String,
  password: String,
});

accountSchema.statics.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accountSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const Account = mongoose.model('Account', accountSchema);

export default Account;
