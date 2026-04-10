export interface LoginResponse {
  firstName: string;
  lastName: string;
  email: string;
  token: string; // if your API returns a token
  roleId?: number; // optional
}