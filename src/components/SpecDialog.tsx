import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spec } from '@/types';
import { ChangeEvent, useState } from 'react';

export type SpecDialogProps = {
  spec: Spec;
  open: boolean;
  isNewSpec: boolean;
  onSave: (spec: Spec) => void;
  onDelete: (specId: string) => void;
  onClose: () => void;
};

export function SpecDialog({
  spec,
  open,
  isNewSpec,
  onSave,
  onDelete,
  onClose,
}: Readonly<SpecDialogProps>) {
  const [newSpec, setNewSpec] = useState<Spec>(spec);

  const handleFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setNewSpec({ ...newSpec, [fieldName]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        {/* New Spec Form Header */}
        {isNewSpec && (
          <DialogHeader>
            <DialogTitle>Add a new Spec</DialogTitle>
            <DialogDescription>
              Name and describe your Spec, then add Ingredients and Instructions
            </DialogDescription>
          </DialogHeader>
        )}
        {/* Update Spec Form Header */}
        {!isNewSpec && (
          <DialogHeader>
            <DialogTitle>Update this Spec</DialogTitle>
            <DialogDescription>
              Make any changes you need and don't forget to hit Save!
            </DialogDescription>
          </DialogHeader>
        )}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rdfs:label" className="text-right">
              Name
            </Label>
            <Input
              id="rdfs:label"
              onChange={(e) => handleFieldChange('rdfs:label', e)}
              defaultValue={spec['rdfs:label']}
              placeholder="Drink name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rdfs:comment" className="text-right">
              Description
            </Label>
            <Input
              id="rdfs:comment"
              type="text"
              onChange={(e) => handleFieldChange('rdfs:comment', e)}
              defaultValue={spec['rdfs:comment']}
              placeholder="Drink description..."
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {!isNewSpec && (
            <Button
              type="submit"
              onClick={() => {
                onClose();
                onDelete(newSpec['@id']);
              }}
            >
              Delete
            </Button>
          )}
          <Button
            type="submit"
            onClick={() => {
              onClose();
              onSave(newSpec);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
