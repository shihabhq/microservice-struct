import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `invalid email ${props.value}`,
    },
  },
  password: {
    type: String,
    minlength: [6, "password is too short"],
    required:true,
  },
  roles: {
    type: [String],
    required: true,
    default: ["Student"],
  },
  accountStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
  },
});

const User = mongoose.model('User',userSchema)

export default User;

// just write pseudocode + diagram first. then with those, coding is just a 1/2 thing