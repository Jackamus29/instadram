import { useState } from 'react';

// import { useParams } from 'react-router-dom';
import SpecCard from '../components/SpecCard';
import RecipeSlideOut from '../components/RecipeSlideOut';

const specs = [
  {
    _id: 1,
    title: 'Paper Plane',
    desc: 'The Paper Plane is a balanced cocktail with just enough sweetness to counteract the bitter and sour notes. It gets its signature orange hue from sweet and citrusy Aperol which plays nicely with the sour lemon juice. The base spirit, bourbon, adds a round richness which brings everything down to earth. Amaro Nonino Quintessentia, though, is the secret weapon.',
    webpage: 'https://www.foodandwine.com/recipes/paper-plane',
    source: 'https://www.foodandwine.com/recipes/paper-plane',
    specLines: [
      {
        _id: 1,
        amount: 0.75,
        unit: {
          _id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          _id: 1,
          name: 'bourbon',
        },
        note: 'Although he doesn\'t have a preferred bourbon for the drink, [Sam Ross] does suggest using a slightly higher-proof bourbon—43-percent to 46-percent ABV to "add a bit of body."',
      },
      {
        _id: 2,
        amount: 0.75,
        unit: {
          _id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          _id: 2,
          name: 'Aperol',
        },
        note: 'bitter orange Italian aperitif',
      },
      {
        _id: 3,
        amount: 0.75,
        unit: {
          _id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          _id: 3,
          name: 'Amaro Nonino',
        },
        note: 'Nonino Quintessentia amaro (bittersweet Italian liqueur)',
      },
      {
        _id: 4,
        amount: 0.75,
        unit: {
          _id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          _id: 4,
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
    _id: 2,
    title: 'Classic Daiquiri',
    desc: 'The daiquiri, one of the world&#39;s great cocktails, is also one of the simplest: the perfect balance of rum, fresh lime juice and sugar.',
    webpage: 'https://www.foodandwine.com/recipes/classic-daiquiri',
    source: 'https://www.foodandwine.com/recipes/classic-daiquiri',
    specLines: [
      {
        _id: 5,
        amount: 2.5,
        unit: {
          _id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          _id: 5,
          name: 'white rum',
        },
        note: 'like Bacardi',
      },
      {
        _id: 6,
        amount: 1.5,
        unit: {
          _id: 1,
          name: 'fluid ounce',
          abbrevName: 'oz.',
        },
        ingredient: {
          _id: 6,
          name: 'fresh lime juice',
        },
      },
      {
        _id: 7,
        amount: 4,
        unit: {
          _id: 2,
          name: 'teaspoon',
          abbrevName: 'tsp.',
        },
        ingredient: {
          _id: 7,
          name: 'superfine sugar',
        },
      },
      {
        _id: 8,
        amount: 1,
        unit: {
          _id: 1,
          name: 'wheel',
        },
        ingredient: {
          _id: 8,
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

  const [specSelected, setSpecSelected] = useState();

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {specs.map((spec) => (
          <SpecCard
            key={spec._id}
            spec={spec}
            isSelected={specSelected === spec._id}
            onClickCard={setSpecSelected}
          />
        ))}
      </ul>
      <RecipeSlideOut
        setSpecSelected={setSpecSelected}
        show={specSelected !== undefined}
      />
    </>
  );
}
