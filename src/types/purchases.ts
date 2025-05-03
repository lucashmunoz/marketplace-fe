export interface Purchase {
  id: string;
  item_id: string;
  quantity: number;
  email: string;
  unit_price: number;
  total_price: number;
  date: string;
  description: string;
}
