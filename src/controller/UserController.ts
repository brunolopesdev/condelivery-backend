import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { BaseController } from "./BaseController";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UsuarioController extends BaseController<Usuario> {
  constructor() {
    super(AppDataSource.getRepository(Usuario));
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { password, ...userData } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = this.repository.create({
        ...userData,
        password: hashedPassword,
      });

      const result = await this.repository.save(newUser);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Error creating user", error });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const user = await this.repository.findOne({
        where: { email },
        relations: ["moradores", "colaborador"],
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "your_secret",
        { expiresIn: "1h" }
      );

      const { password: _, ...userData } = user;

      const morador = user.moradores.length > 0 ? user.moradores[0].id : null;

      return res.json({
        message: "Login successful",
        token,
        user: {
          ...userData,
          morador: user.moradores,
          moradorId: morador,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Error logging in", error });
    }
  }

  async verifyToken(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.repository.findOne({
        where: { id: req.userId }, // Obtem o id do usuário a partir do token decodificado
        relations: ["moradores", "colaborador"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userData } = user;
      const morador = user.moradores.length > 0 ? user.moradores[0].id : null;

      return res.json({
        message: "Token is valid",
        user: {
          ...userData,
          morador: user.moradores,
          moradorId: morador,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Error verifying token", error });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.repository.find({
        relations: ["moradores", "colaborador"],
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching users", error });
    }
  }
}
