import { commonApiServices } from '@/services/commonApiServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpError } from '@/lib/http-error';
import { setFormErrors } from '@/utils/form-errors.utils';

const createContact = async (body: any) => {
  return await commonApiServices.post(`/contacts`, body);
};

const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => createContact(body),
    onSuccess: (result, variables, context) => {
      // queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.setQueryData(['contacts'], (old: any[] | undefined) => {
        console.log('OLD CONTACT:: ', old);
        // if (!old || !context?.optimisticContact) return old;
        //
        // return old.map((contact) =>
        //   contact.id === context.optimisticContact.id ? result : contact
        // );
      });
    },
    onError: (error) => {
      if (error instanceof HttpError) {
        const errorData = error.data;
        if (Array.isArray(errorData)) {
          setFormErrors(errorData);
        } else if (
          errorData &&
          typeof errorData === 'object' &&
          'property' in errorData
        ) {
          // Wrap single error object in an array
          setFormErrors([errorData]);
        }
      }
    }
  });
};

export { createContact, useCreateContact };
