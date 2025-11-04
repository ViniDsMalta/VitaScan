const mongoose = require('mongoose');

const triagemSchema = new mongoose.Schema({
  respostas: Object,
  corPulseira: {
    type: String,
    enum: ['verde', 'amarela', 'vermelha', 'preta'],
    default: null
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Triagem', triagemSchema);
