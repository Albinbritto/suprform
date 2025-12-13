import { ReactNode, ReactElement } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  FieldPath,
  RegisterOptions,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form';

export interface SuprFormProps<TFieldValues extends FieldValues = FieldValues> {
  children: ReactNode;
  onSubmit?: SubmitHandler<TFieldValues>;
  style?: React.CSSProperties;
  className?: string;
  formOptions?: UseFormProps<TFieldValues>;
}

export interface FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  children: ReactElement<any>;
  rules?: RegisterOptions<TFieldValues, TName>;
  name: TName;
  label?: string;
  className?: string;
  id?: string;
}

export interface ControlledFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  children: ReactElement<any>;
  className?: string;
  label?: string;
  id?: string;
}
