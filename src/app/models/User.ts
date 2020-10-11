export interface User {
  userId?: string;
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: string;
  phone?: string;
  dateOfBirth?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  address?: {
    house?: string;
    street: string;
    city: string;
  };
}
