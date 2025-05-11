import { Schema, model } from "mongoose";
import { TUser, IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, required: true, enum: ["admin", "seller"] },
    phoneNumber: { type: String },
    address: { type: String },
    profileImg: { type: String },
    status: { type: String, enum: ["active", "blocked"], default: "active" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// empty password field
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// check user exists
userSchema.statics.isUserExists = async function (id: Schema.Types.ObjectId) {
  return await UserModel.findOne({ _id: id }).select("+password");
};

// check password is matched or not
userSchema.statics.isPasswordMatched = async function (
  myPlaintextPassword,
  hashedPassword
) {
  return bcrypt.compare(myPlaintextPassword, hashedPassword);
};

const UserModel = model<TUser, IUser>("Users", userSchema);

export default UserModel;
