import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret-key";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { userName } = req.body;

      if (!userName || userName.trim() === "") {
        return res.status(400).json({ success: false, message: "Nome é obrigatório" });
      }

      const token = jwt.sign({ userName }, SECRET, { expiresIn: "1h" });

      return res.status(200).json({
        success: true,
        message: "Usuário autenticado com sucesso",
        token,
        userName
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Erro no login", error });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ success: false, message: "Token ausente" });

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ success: false, message: "Token ausente" });
      }
      const decoded = jwt.verify(token, SECRET);

      return res.status(200).json({ success: true, user: decoded });
    } catch (error) {
      return res.status(401).json({ success: false, message: "Token inválido" });
    }
  }
}

export default new AuthController();
