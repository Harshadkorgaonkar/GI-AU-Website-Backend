const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// ? FIXED: Properly importing the correct route files
const userRoutes = require('./routes/userRoutes'); // ? Corrected
const auUserRoutes = require('./routes/auUserRoutes');
const productRoutes = require('./routes/productRoutes');
const associationRoutes = require('./routes/associationRoutes');
const templateRoutes = require('./routes/templateRoutes');
const reportLogRoutes = require('./routes/reportLogRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
const userProductRoutes = require('./routes/userProductRoutes'); // ? New

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// ? Route assignments
app.use('/api/users', userRoutes);              // real users
app.use('/api/au-users', auUserRoutes);         // alternate users
app.use('/api/user-products', userProductRoutes);
app.use('/api/products', productRoutes);
app.use('/api/associations', associationRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/report-logs', reportLogRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', authRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`?? Server running on http://0.0.0.0:${PORT}`);
});
