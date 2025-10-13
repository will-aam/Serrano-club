import { z } from "zod";

// User schema
export const userSchema = z.object({
  id: z.number(),
  nome: z.string(),
  telefone: z.string(),
  pontos: z.number(),
  litros_acumulados: z.number(),
  email: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

// Vehicle schema
export const vehicleSchema = z.object({
  placa: z.string(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

// Gas station schema
export const postoSchema = z.object({
  cnpj: z.string(),
  nome: z.string(),
  endereco: z.string(),
});

export type Posto = z.infer<typeof postoSchema>;

// Fuel purchase schema
export const abastecimentoSchema = z.object({
  id: z.string(),
  chave: z.string(),
  posto_cnpj: z.string(),
  litros: z.number(),
  valor: z.number(),
  data: z.string(),
  status: z.enum(["registrado", "pendente", "rejeitado"]),
});

export type Abastecimento = z.infer<typeof abastecimentoSchema>;

// Voucher schema
export const voucherSchema = z.object({
  id: z.string(),
  codigo: z.string(),
  tipo: z.string(),
  valor: z.number(),
  status: z.enum(["ativo", "usado", "expirado"]),
  validade: z.string(),
  data_validacao: z.string().optional(),
  funcionario: z.string().optional(),
});

export type Voucher = z.infer<typeof voucherSchema>;

// Reward catalog schema
export const rewardSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descricao: z.string(),
  tipo: z.string(),
  valor: z.number(),
  litros_necessarios: z.number(),
  pontos_necessarios: z.number(),
});

export type Reward = z.infer<typeof rewardSchema>;

// Notification schema
export const notificationSchema = z.object({
  id: z.string(),
  tipo: z.enum(["voucher_gerado", "voucher_usado", "abastecimento_registrado"]),
  titulo: z.string(),
  mensagem: z.string(),
  data: z.string(),
  lida: z.boolean(),
});

export type Notification = z.infer<typeof notificationSchema>;
