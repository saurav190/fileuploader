import { useGetFoldersQuery, useCreateFolderMutation } from '@/services/file/file.services';
import { Button, Card, Flex, Grid, Group, Image, LoadingOverlay, Text, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Folder = () => {
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  }

  const { data, isLoading } = useGetFoldersQuery({});
  const [createFolderMutation] = useCreateFolderMutation();
  const [newFolderName, setNewFolderName] = useState('');

  const handleFolderCreate = async () => {
    if (newFolderName.trim() !== '') {
      try {
        await createFolderMutation(JSON.stringify({ folder_name: newFolderName }));
        setNewFolderName(''); // Clear the input after successful creation
      } catch (error) {
        console.error('Error creating folder:', error);
        // Handle error if needed
      }
    }
  };
  

  const handleInputChange = (event) => {
    setNewFolderName(event.target.value);
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <Flex justify={'space-between'} px={'xl'} py={'xs'} align={'center'} gap={'md'} mb="lg">
        <Title order={2}>Folders</Title>
        <Flex gap={'md'} align={'center'}>
          <TextInput
            placeholder="Create Folder"
            value={newFolderName}
            onChange={handleInputChange}
          />
          <Button onClick={handleFolderCreate}>Create</Button>
        </Flex>
      </Flex>
      <Grid p={'lg'}>
        {data?.map((product) => (
          <Grid.Col span={12 / 8} key={product._id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <NavLink to={`/folder/${product._id}`}>
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{product.folder_name}</Text>
                  <Text fw={500}>{product.file_count}</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  {formatDateTime(product.updated_at)}
                </Text>
              </NavLink>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default Folder;
