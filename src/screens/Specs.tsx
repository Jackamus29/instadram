import SpecCard from '@/components/SpecCard';
import { SpecDialog } from '@/components/SpecDialog';
import { Button } from '@/components/ui/button';
import useFlureeClient from '@/hooks/useFlureeClient';
import { Spec } from '@/types';
import { useCallback, useEffect, useState } from 'react';

type SelectedSpecState = { spec: Spec; isNew: boolean };

export default function Specs() {
  const { flureeClient, connectionStatus } = useFlureeClient();
  const [isQuerying, setIsQuerying] = useState(false);
  const [shouldFetchSpecs, setShouldFetchSpecs] = useState(true);

  const [specs, setSpecs] = useState<Spec[]>([]);
  const [selectedSpecState, setSelectedSpecState] =
    useState<SelectedSpecState | null>(null);

  const querySpecs = useCallback(async () => {
    if (flureeClient === null) {
      return;
    }
    setShouldFetchSpecs(false);
    setIsQuerying(true);
    return flureeClient
      .query({
        select: {
          '?specs': [
            '@id',
            '@type',
            'rdfs:label',
            'rdfs:comment',
            'lines',
            'instructions',
          ],
        },
        where: {
          '@id': '?specs',
          '@type': 'Spec',
        },
      })
      .send()
      .then((results: Spec[]) => {
        setSpecs(results);
      })
      .finally(() => setIsQuerying(false));
  }, [flureeClient]);

  // useEffect to kick off Specs Query
  useEffect(() => {
    if (shouldFetchSpecs) {
      querySpecs();
    }
  }, [querySpecs, shouldFetchSpecs]);

  const handleCreateNewSpec = () => {
    const newSpec = {
      '@id': '',
      '@type': 'Spec',
      'rdfs:label': '',
      'rdfs:comment': '',
      lines: [],
      instructions: '',
    };
    setSelectedSpecState({ spec: newSpec, isNew: true });
  };

  const handleSpecSave = (spec: Spec) => {
    if (flureeClient === null || selectedSpecState === null) {
      return;
    }
    const specToSave = selectedSpecState.isNew
      ? {
          ...spec,
          '@id':
            'http://instadram.com/instadram/specs/' +
            spec['rdfs:label'].toLowerCase().replace(' ', '-'),
        }
      : spec;
    flureeClient
      .upsert(specToSave)
      .send()
      .then(() => setShouldFetchSpecs(true));
  };

  const handleDeleteSpec = (specId: string) => {
    if (flureeClient === null || specId === '') {
      return;
    }
    flureeClient
      .delete(specId)
      .send()
      .then(() => setShouldFetchSpecs(true));
  };

  if (connectionStatus === 'FAILURE') {
    return (
      <>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Specs</h1>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            {connectionStatus === 'FAILURE' && (
              <h3 className="text-2xl font-bold tracking-tight">
                Failed to connect to database
              </h3>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">My Specs</h1>
        <Button onClick={handleCreateNewSpec}>New Spec</Button>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        {/* Loading Specs */}
        {isQuerying && (
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Fetching Specs
            </h3>
            <p className="text-sm text-muted-foreground">
              Just a moment while we gather 'em up
            </p>
          </div>
        )}
        {/* No Specs Found */}
        {!isQuerying && specs.length === 0 && (
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No Specs found
            </h3>
            <p className="text-sm text-muted-foreground">
              Click the button to add specs
            </p>
            <Button className="mt-4" onClick={handleCreateNewSpec}>
              New Spec
            </Button>
          </div>
        )}
        {/* Render Specs */}
        {!isQuerying && specs.length > 0 && (
          <div className="flex w-full h-full p-2 justify-start items-start gap-1 text-center">
            {specs.map((spec, i) => (
              <SpecCard
                key={`spec-${i}`}
                spec={spec}
                handleSelectSpec={(spec) =>
                  setSelectedSpecState({ spec, isNew: false })
                }
              />
            ))}
          </div>
        )}
        {/* Render Spec Dialog */}
        {selectedSpecState !== null && (
          <SpecDialog
            spec={selectedSpecState.spec}
            open={true}
            isNewSpec={selectedSpecState.isNew}
            onSave={handleSpecSave}
            onDelete={handleDeleteSpec}
            onClose={() => setSelectedSpecState(null)}
          />
        )}
      </div>
    </>
  );
}
