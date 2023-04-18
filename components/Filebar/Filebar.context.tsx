import { Dispatch, createContext } from 'react';
import { ActionType } from '@/hooks/useCreateReducer';
import { DocumentFile } from '@/types/documentFile'
import { FilebarInitialState } from "./Filebar.state";

export interface FilebarContextProps {
    state: FilebarInitialState;
    dispatch: Dispatch<ActionType<FilebarInitialState>>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleButtonClick: () => void;
    handleDeleteFile: (documentFile: DocumentFile) => void;
    handleRenameFile: (documentFile: DocumentFile, name: string) => void;
}

const FilebarContext = createContext<FilebarContextProps>(undefined!);

export default FilebarContext;
