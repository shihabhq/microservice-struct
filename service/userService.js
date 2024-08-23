import User from "../models/userSchema.js";

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(key);
  }
  return User.findOne({ [key]: value });
};

const CreatenewUser = ({name,email,password})=>{
    const newUser = new User({ name, email, password });
    return newUser.save()
}

export {findUserByProperty,CreatenewUser};