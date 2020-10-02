export interface User {
  userId?: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
  phone?: string;
  address?: {
    house?: string;
    street: string;
    city: string;
  };
}
