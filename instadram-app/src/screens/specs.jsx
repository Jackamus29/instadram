import { useParams } from 'react-router-dom';

export default function SpecScreen() {
  const { specId } = useParams();

  return (
    <div>
      <div>Spec Screen</div>
      {specId !== undefined && <div>SpecId: {specId}</div>}
    </div>
  );
}
