import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret-key";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ success: false, message: "Token ausente" });

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token ausente" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token inválido" });
  }
}
