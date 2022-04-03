import React, { useState, useEffect } from 'react';
import { getRecipeById } from '../../api/recipes';
import { Recipe } from '../../common/types';
import { NewRecipe } from './newRecipe/NewRecipe';
import { useCookies } from 'react-cookie';

interface RecipeEditProps {
  id: string;
}

export const RecipeEdit: React.FC<RecipeEditProps> = ({ id }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [cookies, setCookies, deleteCookies] = useCookies(['jwtToken']);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await getRecipeById(id, cookies.jwtToken);
      setRecipe(response);
    };

    fetchRecipe();
  }, []);

  return <NewRecipe recipe={recipe} />;
};
