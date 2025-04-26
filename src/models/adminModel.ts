import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default Admin;
