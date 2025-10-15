import type { Express } from "express";
import { createServer, type Server } from "http";
import "dotenv/config";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/criar-teste", async (_req, res) => {
    const token = process.env.FOCUSNFE_TOKEN;
    const ref = process.env.FOCUSNFE_REF;

    if (!token || !ref) {
      return res.status(500).json({ error: "Token ou Ref não configurados." });
    }

    const url = `https://homologacao.focusnfe.com.br/v2/nfce?ref=${ref}`;
    const basicAuth = Buffer.from(`${token}:`).toString("base64");

    const notaFiscalTeste = {
      natureza_operacao: "Venda de combustivel",
      data_emissao: new Date().toISOString(),
      tipo_documento: 1,
      finalidade_emissao: 1,
      cnpj_emitente: "01.984.422/0001-01", // Certifique-se que este é o CNPJ correto

      // === A CORREÇÃO FINAL ESTÁ AQUI ===
      indicador_presenca: 1, // 1 = Operação presencial

      modalidade_frete: 9,
      items: [
        {
          numero_item: 1,
          codigo_produto: "001",
          descricao: "Gasolina Comum",
          codigo_ncm: "27101259",
          cfop: "5656",
          unidade_comercial: "LT",
          quantidade_comercial: 10,
          valor_unitario_comercial: "5.50",
          icms_situacao_tributaria: "102",
          icms_origem: 0,
        },
      ],
      formas_pagamento: [
        {
          forma_pagamento: "01",
          valor_pagamento: "55.00",
        },
      ],
    };

    try {
      console.log(
        "Tentando emitir NFC-e de teste (com indicador de presença)..."
      );
      const apiRes = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notaFiscalTeste),
      });

      const data = await apiRes.json();
      console.log("Resposta da EMISSÃO:", data);

      if (!apiRes.ok) {
        return res.status(apiRes.status).json({ "ERRO AO EMITIR": data });
      }

      res.json({ "SUCESSO NA EMISSÃO": data });
    } catch (error) {
      console.error("Erro ao EMITIR nota:", error);
      res
        .status(500)
        .json({ error: "Erro interno ao emitir a nota de teste." });
    }
  });

  // ROTA DE CONSULTA
  app.get("/api/nfce/:chave", async (req, res) => {
    const { chave } = req.params;
    const token = process.env.FOCUSNFE_TOKEN;
    const ref = process.env.FOCUSNFE_REF;

    if (!token || !ref) {
      return res.status(500).json({ error: "Token ou Ref não configurados." });
    }

    const url = `https://homologacao.focusnfe.com.br/v2/nfce/${chave}?completa=1&ref=${ref}`;
    const basicAuth = Buffer.from(`${token}:`).toString("base64");

    try {
      console.log(
        `Consultando (em HOMOLOGAÇÃO) chave: ${chave} para ref: ${ref}`
      );
      const apiRes = await fetch(url, {
        headers: { Authorization: `Basic ${basicAuth}` },
      });
      const data = await apiRes.json();

      if (!apiRes.ok) {
        console.error("Erro da API FocusNFe:", data);
        return res.status(apiRes.status).json(data);
      }

      res.json(data);
    } catch (error) {
      console.error("Erro ao consultar a API da FocusNFe:", error);
      res.status(500).json({ error: "Erro interno ao consultar." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
