export default function SpecCard({ spec, isSelected, onClickCard }) {
  return (
    <li className="flex-col" onClick={() => onClickCard(spec._id)}>
      <div className="group aspect-h-1 aspect-w-1 block w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={spec.graphic.source}
          alt={`${spec.title} cocktail`}
          className="pointer-events-none object-cover group-hover:opacity-75"
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {spec.title}</span>
        </button>
      </div>
      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
        {spec.title}
      </p>
      <p className="pointer-events-none block text-sm font-medium text-gray-500">
        {`${spec.specLines.length} ingredients`}
      </p>
    </li>
  );
}
