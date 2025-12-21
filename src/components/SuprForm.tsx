import {
  useImperativeHandle,
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  useEffect,
} from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  FieldValues,
  FieldPath,
  useFieldArray,
  ArrayPath,
} from 'react-hook-form';
import { SuprFormProvider, useSuprFormContext } from '../context/SuprFormContext';
import { SuprFormProps, FormControlProps, SuprFormComponent, FormControlArrayProps } from '../type';
import { ConditionChecker } from './ConditionChecker';
import { DisabilityChecker } from './DisabilityChecker';

const SuprForm: SuprFormComponent = <TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit = () => {},
  onError = () => {},
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
      };
    },
    [methods]
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
  className = '',
  label,
  id,
  disabled,
  shouldUnregister,
  visibility,
}: FormControlProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();
  const controlledValue = children.props.value ?? '';
  const { showAsterisk } = useSuprFormContext();

  const originalOnChange = children.props.onChange;
  const originalOnBlur = children.props.onBlur;

  const fieldId = useMemo(() => id || crypto.randomUUID(), []);

  return (
    <ConditionChecker<TFieldValues> visibility={visibility}>
      <DisabilityChecker disabled={disabled}>
        <Controller
          control={control}
          name={name}
          rules={rules}
          defaultValue={controlledValue}
          shouldUnregister={shouldUnregister}
          render={({
            field: { name, onBlur, value, onChange, ref, disabled: fieldDisabled },
            fieldState: { error },
          }) => {
            return (
              <div
                className={`controlled-field ${className}`}
                style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
              >
                {label && (
                  <label htmlFor={fieldId} className='controlled-field-label'>
                    {label}
                    {showAsterisk && !!rules && <span style={{ color: 'red' }}> *</span>}
                  </label>
                )}
                {cloneElement(children, {
                  ...children.props,
                  id: fieldId,
                  name,
                  disabled: fieldDisabled,
                  onChange: (...args: any[]) => {
                    onChange(...args);
                    originalOnChange?.(...args);
                  },
                  value: value,
                  onBlur: (...args: any[]) => {
                    onBlur();
                    originalOnBlur?.(...args);
                  },
                  ref,
                })}
                {error && (
                  <div style={{ color: 'red', fontSize: 13 }} className='controlled-field-error'>
                    {error.message}
                  </div>
                )}
              </div>
            );
          }}
        />
      </DisabilityChecker>
    </ConditionChecker>
  );
};

const FormControlArray = <
  TFieldValues extends FieldValues = FieldValues,
  TArrayName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>
>({
  name,
  rules,
  ref,
  children,
  visibility,
  disabled,
}: FormControlArrayProps<TFieldValues, TArrayName>) => {
  const methods = useFieldArray<TFieldValues, TArrayName>({
    name,
    rules,
  });

  useImperativeHandle(ref, () => methods, [methods]);

  const prefixChildrenNames = (children: React.ReactNode, prefix: string): React.ReactNode => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      const childProps = child.props as any;
      const childType = child.type as any;

      const isSuprFormControl =
        childType?.displayName === 'SuprFormControl' ||
        childType === FormControl ||
        (childProps.name !== undefined && typeof childType !== 'string');

      if (isSuprFormControl && childProps.name !== undefined) {
        //visibility handling
        const _visibility = visibility
          ? visibility[childProps.name as keyof typeof visibility]
          : undefined;
        const fieldVisibility = _visibility
          ? {
              ..._visibility,
              conditions:
                _visibility.conditions?.map((cond: any) => ({
                  ...cond,
                  name: `${prefix}${cond.name}`,
                })) || [],
            }
          : undefined;

        //disability handling
        const _disability = disabled
          ? disabled[childProps.name as keyof typeof disabled]
          : undefined;

        const fieldDisabled = _disability
          ? {
              ..._disability,
              conditions:
                _disability.conditions?.map((cond: any) => ({
                  ...cond,
                  name: `${prefix}${cond.name}`,
                })) || [],
            }
          : undefined;

        const clonedProps: any = {
          ...childProps,
          name: `${prefix}${childProps.name}`,
          visibility: fieldVisibility,
          disabled: fieldDisabled,
        };

        if (childProps.id !== undefined) {
          clonedProps.id = `${prefix}${childProps.id}`;
        }

        return cloneElement(child, clonedProps);
      }

      if (childProps.children) {
        return cloneElement(child, {
          ...childProps,
          children: prefixChildrenNames(childProps.children, prefix),
        });
      }

      return child;
    });
  };

  return (
    <>
      {methods.fields.map((_, index) => {
        const prefix = `${name}.${index}.`;
        return (
          <div
            data-index={index}
            key={prefix}
            style={{ display: 'contents' }}
            id='field-array-item'
          >
            {prefixChildrenNames(children, prefix)}
          </div>
        );
      })}
    </>
  );
};

FormControl.displayName = 'SuprFormControl';

SuprForm.Control = FormControl;
SuprForm.ControlArray = FormControlArray;

export default SuprForm;
