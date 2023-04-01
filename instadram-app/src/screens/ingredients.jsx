import { useParams } from 'react-router-dom';

export default function IngredientScreen() {
  const { ingredId } = useParams();

  return (
    <div>
      <div>Ingredient Screen</div>
      {ingredId !== undefined && <div>IngredId: {ingredId}</div>}
    </div>
  );
}
