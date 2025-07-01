export interface User {
  id: number;
  username: string;
  email: string;
  roleId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  role: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}
