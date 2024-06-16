import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const defaultTabs = [
  { name: 'Description', current: true },
  { name: 'Instructions', current: false },
];

export default function RecipeSlideOut({
  show,
  recipes,
  onRefClick,
  onPopRecipe,
  onClose,
}) {
  const recipeToShow = recipes.length > 0 ? recipes[0] : undefined;
  const [tabs, setTabs] = useState(defaultTabs);
  const changeTab = (tabName) => {
    setTabs(tabs.map((t) => ({ ...t, current: t.name === tabName })));
  };
  const activeTabName = tabs.find((t) => t.current)?.name;

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                  <div className="relative flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="absolute w-full z-40 px-2 py-4 sm:px-4">
                      <div className="flex items-start justify-between">
                        <h2
                          id="slide-over-heading"
                          className="p-2 backdrop-blur-sm font-serif text-2xl leading-6 text-white"
                        >
                          {recipeToShow?.title}
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div className="flex flex-col flex-1">
                      <div className="flex-none mb-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="aspect-h-7 aspect-w-10 block w-full rounded-br-lg overflow-hidden">
                            {recipeToShow && (
                              <img
                                className="absolute h-full w-full object-cover"
                                src={recipes[0]?.graphic.source}
                                alt="Completed Spec"
                              />
                            )}
                          </div>
                          <div className="flex flex-col py-4 sm:flex sm:px-6">
                            <div className="flex-none">
                              <h3 className="mb-2 text-lg text-gray-900 sm:text-xl">
                                Ingredients
                              </h3>
                            </div>
                            <div className="flex-1">
                              <dl className="flex flex-col overflow-auto mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                {recipeToShow?.specLines.map((specLine) => (
                                  <div
                                    key={specLine.id}
                                    className="flex flex-col py-3 text-sm font-medium"
                                  >
                                    <div className="flex">
                                      <dt className="min-w-1/6 flex-none whitespace-nowrap mr-2 text-gray-500">
                                        <span
                                          className={
                                            `${specLine.amount}`.includes('/')
                                              ? 'diagonal-fractions'
                                              : ''
                                          }
                                        >
                                          {specLine.amount}
                                        </span>{' '}
                                        <span className="font-serif">
                                          {specLine.unit.abbrevName}
                                        </span>
                                      </dt>
                                      <dd className="flex-1 max-w-5/6 text-gray-900">
                                        {specLine.ingredient.name}
                                      </dd>
                                    </div>
                                    {specLine.note !== undefined && (
                                      <div className="flex">
                                        <span className="min-w-1/6 flex-none mr-2"></span>
                                        <p className="mt-2 flex-1 max-w-5/6 text-sm italic text-gray-500">
                                          {specLine.note}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 px-4 xs:px-0 xs:pt-0">
                        <div className="border-b border-gray-200 pb-5 sm:pb-0">
                          <div className="mt-1 sm:mt-2">
                            <div className="sm:hidden">
                              <label htmlFor="current-tab" className="sr-only">
                                Select a tab
                              </label>
                              <select
                                id="current-tab"
                                name="current-tab"
                                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                defaultValue={
                                  tabs.find((tab) => tab.current).name
                                }
                                onChange={(e) =>
                                  changeTab(e.currentTarget.value)
                                }
                              >
                                {tabs.map((tab) => (
                                  <option key={tab.name}>{tab.name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="hidden sm:block">
                              <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                  <button
                                    key={tab.name}
                                    onClick={() => changeTab(tab.name)}
                                    className={classNames(
                                      tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                      'whitespace-nowrap border-b-2 px-1 pb-4 text-lg font-medium'
                                    )}
                                    aria-current={
                                      tab.current ? 'page' : undefined
                                    }
                                  >
                                    {tab.name}
                                  </button>
                                ))}
                              </nav>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            activeTabName === 'Description' ? 'p-4' : 'hidden'
                          }
                        >
                          <p>{recipeToShow?.desc}</p>
                        </div>
                        <div
                          className={
                            activeTabName === 'Instructions' ? 'p-4' : 'hidden'
                          }
                        >
                          {recipeToShow?.instruction?.length > 1 ? (
                            <ol className="list-decimal">
                              {recipeToShow?.instructions.map(
                                (instruction, idx) => (
                                  <li key="idx">{instruction.text}</li>
                                )
                              )}
                            </ol>
                          ) : (
                            <p>{recipeToShow?.instructions[0].text}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex-none flex w-full px-4 mb-4 justify-end">
                        <a
                          href={recipeToShow?.source}
                          className="rounded-full px-2 py-1 bg-indigo-600 bg:text-indigo-900 text-white"
                        >
                          Go to Source
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
