export type TStock = {
  brandName: string;
  productName: string;
  size: string;
  quantity: number;
  stockingDate: Date;
  expiryDate: Date;
  sellDate?: Date;
  status?: "PENDING" | "ACCEPTED" | "SOLD" | "EXPIRED";
  soldBy?: string;
  acceptedBy?: string;
};
