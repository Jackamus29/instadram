import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spec } from '@/types';

type SpecCardProps = {
  spec: Spec;
  handleSelectSpec: (spec: Spec) => void;
};

export default function SpecCard({ spec, handleSelectSpec }: SpecCardProps) {
  return (
    <Card
      onClick={() => handleSelectSpec(spec)}
      className="max-w-xs text-left hover:cursor-pointer"
    >
      <CardHeader className="p-4 pb-0">
        <CardTitle>{spec['rdfs:label']}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
        <div className="flex items-baseline gap-2 text-3xl leading-none">
          <CardDescription>{spec['rdfs:comment']}</CardDescription>
          {spec.lines && spec.lines.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              {spec.lines.length} ingredients
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
