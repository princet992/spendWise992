import { Banknote, Building, CreditCard, Smartphone } from "lucide-react";

export const paymentMethod = [
  {
    id: "cash",
    label: "Cash",
    icon: Banknote,
    color: "text-green-600",
  },
  {
    id: "credit_card",
    label: "Credit Card",
    icon: CreditCard,
    color: "text-blue-600",
  },
  {
    id: "debit_card",
    label: "Debit Card",
    icon: CreditCard,
    color: "text-purple-600",
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    icon: Building,
    color: "text-orange-600",
  },
  {
    id: "digital_wallet",
    label: "Digital Wallet",
    icon: Smartphone,
    color: "text-pink-600",
  },
];
