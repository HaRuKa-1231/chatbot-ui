import {
  IconCheck,
  IconTrash,
  IconX,
  IconPencil,
  IconFile,
} from '@tabler/icons-react';
import {
  DragEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';

import { DocumentFile } from '@/types/documentFile';
import { getMemoryVector } from '@/utils/app/memoryVector';
import SidebarActionButton from '@/components/Buttons/SidebarActionButton';

import FilebarContext from '../Filebar.context';

interface Props {
  documentFile: DocumentFile;
}

export const FileComponent = ({ documentFile }: Props) => {
  const {
    dispatch: fileDispatch,
    handleDeleteFile,
    handleRenameFile,
  } = useContext(FilebarContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRename();
    }
  };

  const handleRename = () => {
    if (renameValue.trim().length > 0) {
      handleRenameFile(documentFile, renameValue);
      setRenameValue('');
      setIsRenaming(false);
    }
  };

  const handleConfirm: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (isDeleting) {
      handleDeleteMemoryVector();
      handleDeleteFile(documentFile);
      fileDispatch({ field: 'searchTerm', value: '' });
      fileDispatch({ field: 'fileBarError', value: '' });
    } else if (isRenaming) {
      handleRename();
    }
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleDeleteMemoryVector = () => {
    const memoryVector = getMemoryVector();
    if (memoryVector) {
      const newMemoryVector = memoryVector.filter(
        (vector) => vector.metadata.originalName !== documentFile.id
      );
      localStorage.setItem('vectorstore', JSON.stringify(newMemoryVector));
    }
  };


  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(false);
    setIsRenaming(false);
  };

  const handleOpenRenameModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsRenaming(true)
    documentFile && setRenameValue(documentFile.name);
  };

  const handleOpenDeleteModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, documentFile: DocumentFile) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData('documentFile', JSON.stringify(documentFile));
    }
  };

  useEffect(() => {
    if (isRenaming) {
      setIsDeleting(false);
    } else if (isDeleting) {
      setIsRenaming(false);
    }
  }, [isRenaming, isDeleting]);

  return (
    <div className="relative flex items-center">
      {isRenaming && (
        <div className="flex w-full items-center gap-3 rounded-lg bg-[#343541]/90 p-3">
          <IconFile size={18} />
          <input
            className="mr-12 flex-1 overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-white outline-none focus:border-neutral-100"
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleEnterDown}
            autoFocus
          />
        </div>
      )}
      <button
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#343541]/90"
        draggable="true"
        onDragStart={(e) => handleDragStart(e, documentFile)}
        onMouseLeave={() => {
          setIsDeleting(false);
          setIsRenaming(false);
          setRenameValue('');
        }}
      >
        <IconFile size={18} />

        <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all pr-12 text-left text-[12.5px] leading-3">
          {documentFile.name}
        </div>
      </button>

      {(isDeleting || isRenaming) && (
        <div className="absolute right-1 z-10 flex text-gray-300">
          <SidebarActionButton handleClick={handleConfirm}>
            <IconCheck size={18} />
          </SidebarActionButton>

          <SidebarActionButton handleClick={handleCancel}>
            <IconX size={18} />
          </SidebarActionButton>
        </div>
      )}

      {!isDeleting && !isRenaming && (
        <div className="absolute right-1 z-10 flex text-gray-300">
          <SidebarActionButton handleClick={handleOpenRenameModal}>
              <IconPencil size={18} />
            </SidebarActionButton>
          <SidebarActionButton handleClick={handleOpenDeleteModal}>
            <IconTrash size={18} />
          </SidebarActionButton>
        </div>
      )}

    </div>
  );
};
