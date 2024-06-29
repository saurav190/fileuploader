import { useUploadFileMutation } from '@/services/file/file.services';
import { Button, FileInput, Flex, Title } from '@mantine/core';
import React, { useState } from 'react';

interface IFileFolderHeader {
  folderName: string;
  folderId?: string;
}

const FileFolderHeader: React.FC<IFileFolderHeader> = ({ folderName, folderId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, {isLoading}] = useUploadFileMutation();

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleUpload = async () => {
    if (file) {
      await uploadFile({ folderId, file });
      setFile(null); // Reset the file input
    }
  };

  return (
    <>
      <Flex justify={'space-between'} px={'xl'} py={'xs'} align={'center'} gap={'md'} mb="lg">
        <Title order={2}>{folderName}</Title>
        <Flex gap={'md'} align={"center"}>
          <FileInput placeholder="Select file" value={file} onChange={handleFileChange} />
          <Button onClick={handleUpload} loading={isLoading}>Upload</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default FileFolderHeader;
