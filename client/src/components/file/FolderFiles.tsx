import { Button, Card, Grid, Group, Image, Text, Modal, LoadingOverlay } from '@mantine/core';
import React, { useState } from 'react';
import FileFolderHeader from './FileFolderHeader';
import { useDeleteFileMutation, useGetFilesQuery } from '@/services/file/file.services';
import { useParams } from 'react-router-dom';

interface File {
  __id: string;
  folder_name: string;
  file_name: string;
  url: string;
  created_at: string;
}

const FolderFiles: React.FC = () => {
  // const folderId = '668044240b1d316c1bb221cb';
  const params = useParams();
  console.log({params});
  
  const { data: files = [], refetch, isLoading } = useGetFilesQuery(params?.id);
  const [deleteFile] = useDeleteFileMutation();
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDeleteClick = (file: File) => {
    setSelectedFile(file);
    setModalOpened(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedFile) {
      console.log({selectedFile});
      
      await deleteFile(selectedFile._id);
      refetch();
      setModalOpened(false);
    }
  };

  return (
    <>
    <LoadingOverlay visible={isLoading} />
      <FileFolderHeader folderId={params?.id} folderName="folder" />
      <Grid p={'lg'}>
        {files?.length > 0 ? (files.map((file) => (
          <Grid.Col span={12 / 8} key={file._id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={file.url}
                  height={160}
                  alt="File Image"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{file.file_name}</Text>
              </Group>

              <Text size="sm" c="dimmed">
                {file.created_at}
              </Text>

              <Button  fullWidth mt="md" radius="md" onClick={() => handleDeleteClick(file)}>
                Delete
              </Button>
            </Card>
          </Grid.Col>
        ))) : ('No Files Found please upload some files to view here.')}
      </Grid>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Delete Confirmation"
        centered
      >
        <Text>Are you sure you want to delete {selectedFile?.file_name}?</Text>
        <Group  mt="md">
          <Button onClick={() => setModalOpened(false)}>Cancel</Button>
          <Button color="red" onClick={handleConfirmDelete}>Delete</Button>
        </Group>
      </Modal>
    </>
  );
};

export default FolderFiles;
