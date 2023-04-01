import { useParams } from 'react-router-dom';

export default function DramScreen() {
  const { dramId } = useParams();

  return (
    <div>
      <div>Dram Screen</div>
      {dramId !== undefined && <div>DramId: {dramId}</div>}
    </div>
  );
}
