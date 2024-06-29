import { apiService } from '@services/api.service.ts';

const fileService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getFolders: builder.query({
          query: () => ({
            url: '/folders',
            method: 'GET',
          }),
          providesTags: ['FOLDER'],
        }),
        createFolder: builder.mutation({
          query: (folderName) => ({
            url: '/folders',
            method: 'POST',
            body: { folder_name: folderName },
          }),
          invalidatesTags: ['FOLDER'],
        }),
        getFiles: builder.query({
          query: (folderId) => `/files/${folderId}`,
          providesTags: (result, error, folderId) => [{ type: 'FILE', id: folderId }],
        }),
        uploadFile: builder.mutation({
          query: ({ folderId, file }) => {
            const formData = new FormData();
            formData.append('file', file);
            return {
              url: `/files/${folderId}`,
              method: 'POST',
              body: formData,
            };
          },
          invalidatesTags: (result, error, { folderId }) => [{ type: 'FILE', id: folderId }],
        }),
        deleteFile: builder.mutation({
          query: (fileId) => ({
            url: `/files/${fileId}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['FILE'],
        }),
      }),
    });
    
    export const {
      useGetFoldersQuery,
      useGetFilesQuery,
      useCreateFolderMutation,
      useUploadFileMutation,
      useDeleteFileMutation,
    } = fileService;