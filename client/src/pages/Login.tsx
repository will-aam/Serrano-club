import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loginForm, setLoginForm] = useState({ telefone: "" });
  const [registerForm, setRegisterForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    placa: ""
  });

  const handleLogin = () => {
    if (!loginForm.telefone.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu telefone ou CPF",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Login realizado!",
      description: "Bem-vindo ao Serrano Club",
    });
    
    setTimeout(() => setLocation("/"), 500);
  };

  const handleRegister = () => {
    if (!registerForm.nome.trim() || !registerForm.telefone.trim()) {
      toast({
        title: "Erro",
        description: "Nome e telefone são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Cadastro realizado!",
      description: "Bem-vindo ao Serrano Club",
    });
    
    setTimeout(() => setLocation("/"), 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary" data-testid="text-login-title">
            Serrano Club
          </h1>
          <p className="text-muted-foreground">
            Programa de fidelidade em abastecimentos
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" data-testid="tab-login">Entrar</TabsTrigger>
            <TabsTrigger value="register" data-testid="tab-register">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="telefone-login">Telefone ou CPF</Label>
                <Input
                  id="telefone-login"
                  placeholder="Digite seu telefone ou CPF"
                  value={loginForm.telefone}
                  onChange={(e) => setLoginForm({ ...loginForm, telefone: e.target.value })}
                  data-testid="input-login-telefone"
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full"
                data-testid="button-login"
              >
                Entrar
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  placeholder="Digite seu nome"
                  value={registerForm.nome}
                  onChange={(e) => setRegisterForm({ ...registerForm, nome: e.target.value })}
                  data-testid="input-register-nome"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={registerForm.telefone}
                  onChange={(e) => setRegisterForm({ ...registerForm, telefone: e.target.value })}
                  data-testid="input-register-telefone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  data-testid="input-register-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placa">Placa do Veículo (opcional)</Label>
                <Input
                  id="placa"
                  placeholder="ABC1D23"
                  value={registerForm.placa}
                  onChange={(e) => setRegisterForm({ ...registerForm, placa: e.target.value })}
                  data-testid="input-register-placa"
                />
              </div>

              <Button
                onClick={handleRegister}
                className="w-full"
                data-testid="button-register"
              >
                Cadastrar
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
