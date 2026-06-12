import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const itemCreateSchema = z.object({
  type: z.enum(['lost', 'found']),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000),
  category: z.string().min(1, 'Please select a category'),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().min(1, 'Please provide a location'),
  }),
  date_occurred: z.string().min(1, 'Please provide the date'),
  time_occurred: z.string().optional(),
  reward: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ItemCreateFormData = z.infer<typeof itemCreateSchema>;
