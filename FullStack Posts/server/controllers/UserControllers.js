import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });
    if (isUsed) {
      return res.json({
        message: 'Данный Username уже занят',
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    res.json({
      token,
      newUser,
      message: 'Регистрация прошла успешно!!!',
    });
    await newUser.save();
  } catch (error) {
    res.json({ message: 'Ошибка при регистрация!!' });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: 'Такого Username не существует!!!',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        message: 'Неверный Имя или Пароль!!!',
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    res.json({
      token,
      user,
      message: 'Вы вошли в систему',
    });
  } catch (error) {
    res.json({ message: 'Ошибка при регистрация!!' });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        message: 'Такого Username не существует!!!',
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    res.json({
      token,
      user,
    });
  } catch (error) {
    res.json({ message: 'Нет доступа!!!' });
  }
};
