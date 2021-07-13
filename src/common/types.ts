export type Unit =
  | 'gram'
  | 'pcs'
  | 'litre'
  | 'ml'
  | 'tbsp'
  | 'tsp'
  | 'can'
  | 'bottle'
  | 'oz'
  | 'lb'
  | '';

export type Ingredient = {
  name: string;
  unit: Unit;
  amount: string;
};

export type NewRecipe = {
  title: string;
  description: string;
  ingredients: Ingredient[];
  category: string;
  servings: number;
  rating: number | null;
};

export type User = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  category: string;
  servings: number;
  rating: number | null;
};
