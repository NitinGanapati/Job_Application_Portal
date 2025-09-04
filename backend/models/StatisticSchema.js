const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalApplications: { type: Number, default: 0 },
  shortlisted: { type: Number, default: 0 },
  offered: { type: Number, default: 0 },
});

module.exports = mongoose.model('Statistics', StatisticsSchema);
