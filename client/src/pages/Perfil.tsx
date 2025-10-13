import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User as UserIcon, Car, Plus, X } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import VoucherCard from "@/components/VoucherCard";
import VoucherQRModal from "@/components/VoucherQRModal";
import { useAppData } from "@/lib/fake-data";
import { useToast } from "@/hooks/use-toast";
import type { Voucher } from "@shared/schema";

export default function Perfil() {
  const [, setLocation] = useLocation();
  const { user, setUser, vehicles, setVehicles, vouchers } = useAppData();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    nome: user.nome,
    telefone: user.telefone,
    email: user.email || "",
  });
  const [newPlaca, setNewPlaca] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleSaveProfile = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso",
    });
  };

  const handleAddVehicle = () => {
    if (!newPlaca.trim()) return;
    
    setVehicles([...vehicles, { placa: newPlaca.trim().toUpperCase() }]);
    setNewPlaca("");
    toast({
      title: "Veículo adicionado!",
      description: `Placa ${newPlaca.toUpperCase()} cadastrada`,
    });
  };

  const handleRemoveVehicle = (placa: string) => {
    setVehicles(vehicles.filter(v => v.placa !== placa));
    toast({
      title: "Veículo removido",
      description: `Placa ${placa} foi removida`,
    });
  };

  const activeVouchers = vouchers.filter(v => v.status === "ativo");

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Perfil</h2>
        </div>

        {/* User Info */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <UserIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold" data-testid="text-profile-nome">
                  {user.nome}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid="text-profile-telefone">
                  {user.telefone}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              data-testid="button-edit-profile"
            >
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </div>

          {isEditing && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={editForm.nome}
                  onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                  data-testid="input-edit-nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={editForm.telefone}
                  onChange={(e) => setEditForm({ ...editForm, telefone: e.target.value })}
                  data-testid="input-edit-telefone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  data-testid="input-edit-email"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                className="w-full"
                data-testid="button-save-profile"
              >
                Salvar Alterações
              </Button>
            </div>
          )}
        </Card>

        {/* Vehicles */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold">Veículos Cadastrados</h3>
          </div>

          <div className="space-y-2">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.placa}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                data-testid={`vehicle-${vehicle.placa}`}
              >
                <Badge variant="outline" className="font-mono">
                  {vehicle.placa}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveVehicle(vehicle.placa)}
                  data-testid={`button-remove-${vehicle.placa}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="ABC1D23"
              value={newPlaca}
              onChange={(e) => setNewPlaca(e.target.value)}
              data-testid="input-new-placa"
            />
            <Button
              onClick={handleAddVehicle}
              size="icon"
              data-testid="button-add-vehicle"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Active Vouchers */}
        <div className="space-y-4">
          <h3 className="font-semibold">Vouchers Ativos</h3>
          {activeVouchers.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Nenhum voucher ativo no momento
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {activeVouchers.map((voucher) => (
                <VoucherCard
                  key={voucher.id}
                  voucher={voucher}
                  onClick={() => setSelectedVoucher(voucher)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedVoucher && (
        <VoucherQRModal
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}
