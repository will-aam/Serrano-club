import type { Express } from "express";
import { createServer, type Server } from "http";
import "dotenv/config";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/nfce/:chave", async (req, res) => {
    const { chave } = req.params;
    const token = process.env.FOCUSNFE_TOKEN;
    const ref = process.env.FOCUSNFE_REF;

    if (!token || !ref) {
      return res
        .status(500)
        .json({ error: "Token ou Ref da API não configurados." });
    }

    // A ÚNICA MUDANÇA É AQUI: USAMOS O ENDEREÇO DE HOMOLOGAÇÃO
    const url = `https://homologacao.focusnfe.com.br/v2/nfce/${chave}?completa=1&ref=${ref}`;

    const basicAuth = Buffer.from(`${token}:`).toString("base64");

    try {
      console.log(
        `Consultando (em HOMOLOGAÇÃO) chave: ${chave} para ref: ${ref}`
      );

      const apiRes = await fetch(url, {
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
      });

      // Se a resposta não for JSON, lê como texto para depurar
      if (!apiRes.headers.get("content-type")?.includes("application/json")) {
        const textResponse = await apiRes.text();
        console.error("Resposta inesperada (não-JSON) da API:", textResponse);
        return res.status(apiRes.status).json({
          error: "Resposta inesperada da API.",
          details: textResponse,
        });
      }

      const data = await apiRes.json();

      if (!apiRes.ok) {
        console.error("Erro da API FocusNFe:", data);
        return res.status(apiRes.status).json(data);
      }

      console.log("Resposta da API:", data);
      res.json(data);
    } catch (error) {
      console.error("Erro ao consultar a API da FocusNFe:", error);
      res
        .status(500)
        .json({ error: "Erro interno ao consultar a nota fiscal." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
