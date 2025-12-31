import { useImperativeHandle, useEffect } from 'react';
import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { SuprFormProvider } from '../context/SuprFormContext';
import { SuprFormProps, SuprFormComponent } from '../type';
import { FormControl } from './FormControl';
import { FormControlArray } from './FormControlArray';

const SuprForm: SuprFormComponent = <TFieldValues extends FieldValues = FieldValues>({
  children,
  style = {},
  className = '',
  formOptions,
  showAsterisk,
  ref,
  onChange,
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
        handleSubmit: methods.handleSubmit,
        formState: methods.formState,
      };
    },
    [JSON.stringify(methods)]
  );

  useEffect(() => {
    const subscription = methods.watch((value) => {
      onChange?.(value);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  return (
    <SuprFormProvider showAsterisk={showAsterisk}>
      <FormProvider {...methods}>
        <div style={style} className={className}>
          {children}
        </div>
      </FormProvider>
    </SuprFormProvider>
  );
};

SuprForm.Control = FormControl;
SuprForm.ControlArray = FormControlArray;

export default SuprForm;
