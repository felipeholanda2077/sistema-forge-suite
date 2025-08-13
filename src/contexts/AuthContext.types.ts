export interface UserData {
  id: string;
  email: string;
  name: string;
  favoritePokemons?: Array<{ id: number }>;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, userData?: UserData) => void;
  logout: () => void;
}
