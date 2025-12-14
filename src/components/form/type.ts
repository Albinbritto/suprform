import { ReactNode, ReactElement } from 'react';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  FieldPath,
  RegisterOptions,
  SubmitHandler,
  UseFormProps,
  SubmitErrorHandler,
} from 'react-hook-form';

export interface SuprFormProps<TFieldValues extends FieldValues = FieldValues> {
  children: ReactNode;
  onSubmit?: SubmitHandler<TFieldValues>;
  style?: React.CSSProperties;
  className?: string;
  formOptions?: UseFormProps<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
  showAsterisk?: boolean;
  ref?: React.Ref<any>;
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
  shouldUnregister?: boolean;
  disabled?: boolean;
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
  required?: boolean;
}
