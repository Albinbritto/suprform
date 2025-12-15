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
  PathValue,
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
  visibility?: boolean | Visibility<TFieldValues>;
}

type StringOperators =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'STARTS_WITH'
  | 'ENDS_WITH'
  | 'INCLUDES'
  | 'NOT_INCLUDES';

type NumberOperators =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'GREATER_THAN_OR_EQUAL'
  | 'LESS_THAN_OR_EQUAL';

type OperatorForType<T> = T extends string
  ? StringOperators
  : T extends number
  ? NumberOperators
  : never;

type ValueForType<T> = T extends string ? string : T extends number ? number : never;

type Condition<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> = {
  name: TFieldName;
  value: ValueForType<PathValue<TFieldValues, TFieldName>>;
  operator: OperatorForType<PathValue<TFieldValues, TFieldName>>;
};

type AnyCondition<TFieldValues extends FieldValues> = {
  [K in FieldPath<TFieldValues>]: Condition<TFieldValues, K>;
}[FieldPath<TFieldValues>];

export interface Visibility<TFieldValues extends FieldValues = FieldValues> {
  operator: 'AND' | 'OR';
  conditions: Array<AnyCondition<TFieldValues>>;
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
  visibility?: boolean | Visibility<TFieldValues>;
}

export interface ConditionCheckProps<TFieldValues extends FieldValues = FieldValues> {
  children: React.ReactNode;
  visibility?: boolean | Visibility<TFieldValues>;
}

export type ConditionDataType = string | number;
