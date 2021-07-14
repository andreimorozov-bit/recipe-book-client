import React from 'react';

import { useParams } from 'react-router-dom';
import { RecipeEdit } from '../components/recipes/RecipeEdit';

export const RecipeEditPage: React.FC = () => {
  const params: { id: string } = useParams();
  const id = params.id;

  return <RecipeEdit id={id} />;
};
