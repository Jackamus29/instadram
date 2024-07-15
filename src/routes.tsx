import Main from './layouts/main';
// import SplashScreen from './screens/splash';
import Specs from './screens/Specs';
// import DramScreen from './screens/drams';
// import IngredientScreen from './screens/ingredients';
import ErrorPage from './layouts/error-page';

export default [
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          // {
          //   index: true,
          //   element: <SplashScreen />,
          // },
          {
            index: true,
            element: <Specs />,
          },
          {
            path: 'specs/:specId?',
            element: <Specs />,
          },
          // {
          //   path: 'drams/:dramId?',
          //   element: <DramScreen />,
          // },
          // {
          //   path: 'ingredients/:ingredId?',
          //   element: <IngredientScreen />,
          // },
        ],
      },
    ],
  },
];
