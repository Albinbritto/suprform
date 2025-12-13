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
  className,
  label,
  id,
}: FormControlProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={(props) => (
        <ControlledField<TFieldValues, TName>
          {...props}
          children={children}
          className={className}
          label={label}
          id={id}
        />
      )}
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
  className = '',
  label,
  id = crypto.randomUUID(),
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

  return (
    <div
      className={`controlled-field ${className}`}
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
    >
      {label && (
        <label htmlFor={id} className='controlled-field-label'>
          {label}
        </label>
      )}
      {cloneElement(children, {
        ...children.props,
        id,
        name,
        disabled,
        onChange: handleChange,
        value: value || children.props.value,
        onBlur: handleBlur,
      })}
      {error && (
        <div style={{ color: 'red', fontSize: 13 }} className='controlled-field-error'>
          {error.message}
        </div>
      )}
    </div>
  );
};

SuprForm.Control = FormControl;

export default SuprForm;
