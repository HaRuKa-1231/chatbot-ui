import { DocumentFile } from '@/types/documentFile'

export const updateFile = (updatedFile: DocumentFile, allFiles: DocumentFile[]) => {
    const updatedFiles = allFiles.map((c) => {
        if (c.id === updatedFile.id) {
        return updatedFile;
        }

        return c;
    });

    saveFiles(updatedFiles);

    return {
        single: updatedFile,
        all: updatedFiles,
    };
    }

export const saveFiles = (files: DocumentFile[]) => {
    localStorage.setItem('files', JSON.stringify(files));
}
