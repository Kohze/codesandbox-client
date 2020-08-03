import track from '@codesandbox/common/lib/utils/analytics';
import {
  Button,
  Collapsible,
  Element,
  FormField,
  Input,
  Stack,
  Text,
} from '@codesandbox/components';
import { useOvermind } from 'app/overmind';
import React, { ChangeEvent } from 'react';

export const CreateRepo = () => {
  const {
    actions: {
      git: { createRepoClicked, repoTitleChanged },
    },
    state: {
      editor: {
        isAllModulesSynced,
        currentSandbox: { originalGit },
      },
      git: { error, repoTitle },
    },
  } = useOvermind();

  const updateRepoTitle = ({
    target: { value: title },
  }: ChangeEvent<HTMLInputElement>) => repoTitleChanged({ title });

  const createRepo = e => {
    e.preventDefault();
    track('Export to GitHub Clicked');
    createRepoClicked();
  };

  const disabled = Boolean(error) || !repoTitle || !isAllModulesSynced;

  return (
    <Collapsible title="Create GitHub Repository" defaultOpen={!originalGit}>
      <Element paddingX={2}>
        <Text variant="muted" marginBottom={4} block>
          Export the content of this sandbox to a new Github repository.
        </Text>
        {!isAllModulesSynced && (
          <Text marginBottom={2} block variant="danger">
            Save your files first before exporting.
          </Text>
        )}

        {error && (
          <Text marginBottom={2} block variant="danger">
            {error}
          </Text>
        )}

        <Stack
          marginX={0}
          as="form"
          direction="vertical"
          gap={2}
          onSubmit={createRepo}
        >
          <FormField label="Repository name" hideLabel>
            <Input
              type="text"
              onChange={updateRepoTitle}
              value={repoTitle}
              placeholder="Enter new repository name"
            />
          </FormField>
          <Element paddingX={2}>
            <Button type="submit" disabled={disabled} variant="secondary">
              Create repository on Github
            </Button>
          </Element>
        </Stack>
      </Element>
    </Collapsible>
  );
};
