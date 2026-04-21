const AuthService = require('../services/authService');

const AuthController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
      const user = await AuthService.login(username, password);

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      // For security, don't send the password back
      delete user.password;

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  }
};

module.exports = AuthController;
