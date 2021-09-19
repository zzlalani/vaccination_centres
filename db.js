const mongoose = require('mongoose');

mongoose.connection.on('error', console.error.bind(console, "connection error: "));
mongoose.connection.once('open', () => {
  console.log("Connected successfully");
});

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/vaccination_centres');
  } catch (err) {
    console.error('db connection attempt failed with error:', err)
  }
}

module.exports = {
  connect,
}
