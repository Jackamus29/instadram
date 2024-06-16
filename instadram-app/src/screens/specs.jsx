import { useState } from 'react';
import {
  PlusCircleIcon,
  MagnifyingGlassCircleIcon,
} from '@heroicons/react/20/solid';

// import { useParams } from 'react-router-dom';
import SpecCard from '../components/SpecCard';
import RecipeSlideOut from '../components/RecipeSlideOut';
import AddSpecForm from '../components/AddSpecForm';

const specs = [
  {
    id: 1,
    title: 'Paper Plane',
    desc: 'The Paper Plane is a balanced cocktail with just enough sweetness to counteract the bitter and sour notes. It gets its signature orange hue from sweet and citrusy Aperol which plays nicely with the sour lemon juice. The base spirit, bourbon, adds a round richness which brings everything down to earth. Amaro Nonino Quintessentia, though, is the secret weapon.',
    webpage: 'https://www.foodandwine.com/recipes/paper-plane',
    source: 'https://www.foodandwine.com/recipes/paper-plane',
    specLines: [
      {
        id: 1,
        amount: 0.75,
        unit: {
          id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          id: 1,
          name: 'bourbon',
        },
        note: 'Although he doesn\'t have a preferred bourbon for the drink, [Sam Ross] does suggest using a slightly higher-proof bourbon—43-percent to 46-percent ABV to "add a bit of body."',
      },
      {
        id: 2,
        amount: 0.75,
        unit: {
          id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          id: 2,
          name: 'Aperol',
        },
        note: 'bitter orange Italian aperitif',
      },
      {
        id: 3,
        amount: 0.75,
        unit: {
          id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          id: 3,
          name: 'Amaro Nonino',
        },
        note: 'Nonino Quintessentia amaro (bittersweet Italian liqueur)',
      },
      {
        id: 4,
        amount: 0.75,
        unit: {
          id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          id: 4,
          name: 'lemon juice',
        },
      },
    ],
    instructions: [
      {
        '@type': 'HowToStep',
        text: 'Fill a cocktail shaker with ice. Add all of the remaining ingredients and shake well. Strain into a chilled coupe.',
      },
    ],
    graphic: {
      type: 'image',
      source:
        'https://www.foodandwine.com/thmb/TREXZvoT2FiRRn1ApbHLjY9w25U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Paper-Plane-FT-RECIPE1022-2000-b140c68dbfc448948ce09e00db46de98.jpg',
    },
  },
  {
    id: 2,
    title: 'Classic Daiquiri',
    desc: "The daiquiri, one of the world's great cocktails, is also one of the simplest: the perfect balance of rum, fresh lime juice and sugar.",
    webpage: 'https://www.foodandwine.com/recipes/classic-daiquiri',
    source: 'https://www.foodandwine.com/recipes/classic-daiquiri',
    specLines: [
      {
        id: 5,
        amount: 2.5,
        unit: {
          id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          id: 5,
          name: 'white rum',
        },
        note: 'like Bacardi',
      },
      {
        id: 6,
        amount: 1.5,
        unit: {
          id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          id: 6,
          name: 'fresh lime juice',
        },
      },
      {
        id: 7,
        amount: 4,
        unit: {
          id: 2,
          name: 'teaspoon',
          abbrevName: 'tsp.',
        },
        ingredient: {
          id: 7,
          name: 'superfine sugar',
        },
      },
      {
        id: 8,
        amount: 1,
        unit: {
          id: 1,
          name: 'wheel',
        },
        ingredient: {
          id: 8,
          name: 'lime',
        },
        isGarnish: true,
      },
    ],
    instructions: [
      {
        '@type': 'HowToStep',
        text: 'In a cocktail shaker, stir the rum, lime juice and sugar until the sugar is dissolved. Add the ice and shake until chilled. Strain into a chilled cocktail glass, garnish with the lime wheel and serve.',
      },
    ],
    graphic: {
      type: 'image',
      source:
        'https://www.foodandwine.com/thmb/wIfIqrZUf4_HO0YaIxHCQ_-hpbY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Daiquiri-FT-RECIPE1022-2000-a062a7a337a0428cb8618fb3e93f5838.jpg',
    },
  },
];

export default function SpecScreen() {
  // const { specId } = useParams();

  const [specsSelected, setSpecsSelected] = useState([]);
  const pushSpec = (spec) => setSpecsSelected([...specsSelected, spec]);
  const popSpec = () => setSpecsSelected(specsSelected.slice(0, -1));
  const handleRecipeSlideOutClose = () => setSpecsSelected([]);

  const [addSpecFormOpen, setAddSpecFormOpen] = useState(false);
  const [newSpec, setNewSpec] = useState(undefined);
  const handleAddFormClose = () => {
    setAddSpecFormOpen(false);
  };
  const handleAddFormSubmit = () => {};
  const handleAddFormClear = () => {};

  return (
    <>
      <div className="w-full flex my-2">
        <div className="flex flex-grow rounded-md shadow-sm mr-3">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="search"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 py-1.5 bg-gray-900 text-white ring-1 ring-inset ring-gray-300 placeholder:text-white placeholder:opacity-50 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setAddSpecFormOpen(true);
          }}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-900 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Add Spec
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {specs.map((spec) => (
          <SpecCard
            key={spec.id}
            spec={spec}
            onClickCard={() => pushSpec(spec.id)}
          />
        ))}
      </ul>
      <RecipeSlideOut
        show={specsSelected.length > 0}
        recipes={specsSelected.map((specId) =>
          specs.find((s) => s.id === specId)
        )}
        onRefClick={(refId) => pushSpec(refId)}
        onPopRecipe={popSpec}
        onClose={handleRecipeSlideOutClose}
      />
      <AddSpecForm
        show={addSpecFormOpen}
        onClose={handleAddFormClose}
        newSpec={newSpec}
        onSubmit={handleAddFormSubmit}
        onClear={handleAddFormClear}
      />
    </>
  );
}
