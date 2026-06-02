require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.argv[2];
  if (!email) {
    console.log('Usage: npm run seed:admin -- user@example.com');
    process.exit(1);
  }
  const user = await User.findOneAndUpdate({ email }, { $set: { role: 'admin' } }, { new: true });
  console.log(user ? `Promoted ${user.email} to admin` : 'User not found');
  process.exit(0);
})();
