import { useImperativeHandle } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  FieldValues,
  FieldPath,
} from 'react-hook-form';
import { SuprFormProvider } from '../../context/SuprFormContext';
import { ControlledField } from '../controlled-field';
import { SuprFormProps, FormControlProps, SuprFormComponent } from '../../type';

const SuprForm: SuprFormComponent = <TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit = () => {},
  onError = () => {},
  style = {},
  className = '',
  formOptions,
  showAsterisk,
  ref,
}: SuprFormProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    ...formOptions,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        setValue: methods.setValue,
        setError: methods.setError,
        clearErrors: methods.clearErrors,
        getValues: methods.getValues,
        reset: methods.reset,
        setFocus: methods.setFocus,
        resetField: methods.resetField,
        trigger: methods.trigger,
        unregister: methods.unregister,
        watch: methods.watch,
      };
    },
    [methods]
  );

  return (
    <SuprFormProvider showAsterisk={showAsterisk}>
      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={methods.handleSubmit(onSubmit, onError)}
          style={style}
          className={className}
        >
          {children}
        </form>
      </FormProvider>
    </SuprFormProvider>
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
  disabled,
  shouldUnregister,
  visibility,
}: FormControlProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();
  const controlledValue = children.props.value;
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={controlledValue}
      disabled={disabled}
      shouldUnregister={shouldUnregister}
      render={(props) => (
        <ControlledField<TFieldValues, TName>
          {...props}
          children={children}
          className={className}
          label={label}
          id={id}
          required={!!rules}
          visibility={visibility}
        />
      )}
    />
  );
};

SuprForm.Control = FormControl;

export default SuprForm;
