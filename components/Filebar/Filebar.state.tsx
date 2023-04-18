import { DocumentFile } from '@/types/documentFile'

export interface FilebarInitialState {
    searchTerm: string;
    filteredFiles: DocumentFile[];
    fileBarError: string;
}

export const initialState: FilebarInitialState = {
    searchTerm: '',
    filteredFiles: [],
    fileBarError: '',
};
