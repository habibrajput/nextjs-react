import { commonApiServices } from '@/services/commonApiServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CatchHttpError } from '@/lib/catch-http-error';

const createContact = async (body: any) => {
  return await commonApiServices.post(`/contacts`, body);
};

const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => createContact(body),
    onSuccess: (result, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      if (error instanceof CatchHttpError) {
      }
    }
  });
};

export { createContact, useCreateContact };
