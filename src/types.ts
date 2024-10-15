type FlureeNode = {
  "@id": string;
}

type TypedFlureeNode = FlureeNode & {
  "@type": string;
}

export type Spec = TypedFlureeNode & {
  "rdfs:label": string;
  "rdfs:comment": string;
  lines: SpecLine[];
  instructions: string;
};

export type SpecLine = TypedFlureeNode & {
  ingredient: Ingredient;
  note: string;
  amount: number;
  unit: IngredientUnit;
  isGarnish: boolean;
}

export type Ingredient = TypedFlureeNode & {
  "rdfs:label": string;
  "rdfs:comment": string;
}

export type IngredientUnit = TypedFlureeNode & {
  "rdfs:label": string;
  abbrevName: string;
  pluralName: string
  isVolume: boolean;
}