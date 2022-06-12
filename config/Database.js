const mongoose = require("mongoose");

const mongoOpts = {
  user: "",
  pass: "",
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect("",mongoOpts)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

mongoose.set("debug", true);

module.exports = mongoose;
