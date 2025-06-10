import { commonApiServices } from "@/services/commonApiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Contact } from "../_types/types";

const createContact = async (body: any) => {
    const isCreated =  await commonApiServices.post(`/contacts`, body);
    console.log(isCreated);
    return isCreated;
}


const useCreateContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body) => createContact(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
        onError: (error: any) => {
            const msg = error?._metaData?.message?.message;
            console.error('Create contact failed:', msg);
          },
    });
  };

export { createContact, useCreateContact }