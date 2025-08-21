// types.ts
import { Prisma } from '@prisma/client';

export type FullTour = Prisma.TourEventGetPayload<{
  include: {
    park: true;
    destinations: true;
    hotels: true;
   
  };
}>;

// types.ts


export type HandleChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export interface BookingPayload {
  tourId: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  travelers: number;
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export interface ProgressBarProps {
  step: number;
  steps: string[];
}


export type FormData = {
  tourId: string;
  name: string;
  email: string;
  phone: string;
  travelers: number;
  startDate: string;
  endDate: string;
  notes: string;
};

export type Errors = Partial<Record<keyof FormData, string>>;

export type StepProps = {
  form: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  errors: Errors;
};

export type Credentials = {
  email: string;
  password: string;
};

export type TeamMember = {
  name: string
  role: string
  bio?: string
  avatarUrl?: string
  languages?: string[]
}
