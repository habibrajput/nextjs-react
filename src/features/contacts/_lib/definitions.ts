import { z } from 'zod';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional()
});

export const CreateContactFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.'
  }),
  lastName: z.string().optional(),
  email: z.string().min(2, {
    message: 'Email name must be at least 2 characters.'
  }),
  smsPhoneNumber: z.string().min(11, {
    message: 'Sms phone number must be at least 11 characters.'
  }),
  whatsAppPhoneNumber: z.string().min(10, {
    message: 'Whats app phone number must be at least 11 characters.'
  }),
  groups: z.array(optionSchema).min(1, {
    message: 'Group is required.'
  })
});
