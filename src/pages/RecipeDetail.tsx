import { RecipeDetail } from '../components/recipes/detail/RecipeDetail';
import { useParams } from 'react-router-dom';

export const RecipeDetailPage: React.FC = () => {
  const params: { id: string } = useParams();
  const id = params.id;

  return <RecipeDetail id={id} />;
};
