export interface DocumentFile {
  id: string;
  name: string;
  description: string;
  content: string | null;
  folderId: string | null;
}
