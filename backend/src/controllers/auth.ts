import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export async function register(req: any, res: Response) {
  const { email, name, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "Email already in use" });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ email, name, password: hashed });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
}

export async function login(req: any, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
}
