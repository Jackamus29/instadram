import Main from './layouts/main';
import SplashScreen from './screens/splash';
import SpecScreen from './screens/specs';
import DramScreen from './screens/drams';
import IngredientScreen from './screens/ingredients';
import ErrorPage from './layouts/error-page';

export const routes = [
  {
    path: '/',
    element: <Main />,
    // errorElement: <ErrorPage />,
    children: [
      {
        // errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <SplashScreen />,
          },
          {
            path: 'specs/:specId?',
            element: <SpecScreen />,
          },
          {
            path: 'drams/:dramId?',
            element: <DramScreen />,
          },
          {
            path: 'ingredients/:ingredId?',
            element: <IngredientScreen />,
          },
        ],
      },
    ],
  },
];
