import { FC } from 'react';
import { DocumentFile } from '@/types/documentFile';
import { FileComponent } from './DocumentFile';

interface Props {
  files: DocumentFile[];
}

export const Files: FC<Props> = ({ files }) => {
  return <div className="flex w-full flex-col gap-1">
    {files
      .slice()
      .reverse()
      .map((file, index) => (
        <FileComponent key={index} documentFile={file} />
      ))}
  </div>;
};
