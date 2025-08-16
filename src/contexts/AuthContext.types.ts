export interface UserData {
  id?: string;  // Frontend id
  _id?: string; // Backend id
  email: string;
  name: string;
  favoritePokemons: number[];
  
  // Add other fields that might come from the backend
  [key: string]: any;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (token: string, userData?: UserData) => void;
  logout: () => void;
}
