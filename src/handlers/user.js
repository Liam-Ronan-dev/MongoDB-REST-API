import { User } from '../models/userModel.js';
import { hashPassword, createJWT, comparePassword } from '../modules/auth.js';

// Create User function
export const createUser = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = createJWT(user);
    await user.save();

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};

// Sign-in function
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = createJWT(user);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
