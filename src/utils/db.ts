import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/back-node', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);  // Añade esta línea para resolver el error
