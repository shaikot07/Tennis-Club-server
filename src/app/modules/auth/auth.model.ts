import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../../config";



const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6},
    method:{type:String, enum: ["credentials", "github", "google" ], default:"credentials"},
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  });

export const User = mongoose.model("User", UserSchema);
