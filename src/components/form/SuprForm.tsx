import { cloneElement, useCallback } from 'react';
import type { ReactElement } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  FieldValues,
  FieldPath,
} from 'react-hook-form';
import { SuprFormProps, FormControlProps, ControlledFieldProps } from './type';

type SuprFormBase = <TFieldValues extends FieldValues = FieldValues>(
  props: SuprFormProps<TFieldValues>
) => ReactElement;

type SuprFormComponent = SuprFormBase & {
  Control: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(
    props: FormControlProps<TFieldValues, TName>
  ) => ReactElement;
};

const SuprForm: SuprFormComponent = <TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit = () => {},
  style = {},
  className = '',
  formOptions,
}: SuprFormProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    ...formOptions,
  });

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        style={style}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
};

const FormControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  children,
  name,
  rules,
}: FormControlProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={(props) => <ControlledField<TFieldValues, TName> {...props} children={children} />}
    />
  );
};

const ControlledField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  fieldState,
  children,
}: ControlledFieldProps<TFieldValues, TName>) => {
  const { onChange, onBlur, value, name, disabled } = field;
  const { error } = fieldState;

  const originalOnChange = children.props.onChange;
  const originalOnBlur = children.props.onBlur;

  const handleChange = useCallback(
    (...args: any[]) => {
      onChange(...args);
      originalOnChange?.(...args);
    },
    [onChange, originalOnChange]
  );

  const handleBlur = useCallback(
    (...args: any[]) => {
      onBlur();
      originalOnBlur?.(...args);
    },
    [onBlur, originalOnBlur]
  );

  return cloneElement(children, {
    ...children.props,
    name,
    disabled,
    onChange: handleChange,
    value: value || children.props.value,
    onBlur: handleBlur,
    error,
  });
};

SuprForm.Control = FormControl;

export default SuprForm;
