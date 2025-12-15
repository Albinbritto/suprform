import { ReactElement, ReactNode } from 'react';
import {
  FieldValues,
  FieldPath,
  ControllerFieldState,
  ControllerRenderProps,
  RegisterOptions,
  SubmitHandler,
  UseFormProps,
  SubmitErrorHandler,
} from 'react-hook-form';

type SuprFormBase = <TFieldValues extends FieldValues = FieldValues>(
  props: SuprFormProps<TFieldValues>
) => ReactElement;

export type SuprFormComponent = SuprFormBase & {
  Control: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(
    props: FormControlProps<TFieldValues, TName>
  ) => ReactElement;
};

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
  visibility?: boolean | Visibility<TFieldValues, TName>;
}

export interface Visibility<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  operator: 'AND' | 'OR';
  conditions: Array<{
    name: TName;
    value: ConditionDataType;
    operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN';
  }>;
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
  visibility?: boolean | Visibility<TFieldValues, TName>;
}

export interface ConditionCheckProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  children: React.ReactNode;
  visibility?: boolean | Visibility<TFieldValues, TName>;
}

export type ConditionDataType = string | number;
