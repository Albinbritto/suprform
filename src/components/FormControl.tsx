import { useMemo, cloneElement } from 'react';
import { FieldValues, FieldPath, useFormContext, Controller } from 'react-hook-form';
import { useSuprFormContext } from '../context/SuprFormContext';
import { FormControlProps } from '../type';
import { ConditionChecker } from './ConditionChecker';
import { DisabilityChecker } from './DisabilityChecker';

export const FormControl = <
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
  description,
}: FormControlProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();
  const controlledValue = children.props.value ?? '';
  const { showAsterisk } = useSuprFormContext();

  const originalOnChange = children.props.onChange;
  const originalOnBlur = children.props.onBlur;

  const fieldId = useMemo(() => id || crypto.randomUUID(), []);

  const fieldDescription = useMemo(() => {
    if (!description) return;

    if (typeof description === 'string') {
      return { position: 'LABEL_BOTTOM', text: description };
    }

    return description;
  }, [description]);

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
                <div
                  className='controlled-field-description'
                  style={{
                    display: 'inline-flex',
                    ...(fieldDescription && {
                      gap: '2px',
                      alignItems: 'center',
                      flexDirection: fieldDescription.position === 'LABEL_RIGHT' ? 'row' : 'column',
                    }),
                  }}
                >
                  {label && (
                    <label htmlFor={fieldId} className='controlled-field-label'>
                      {label}
                      {showAsterisk && !!rules && <span style={{ color: 'red' }}> *</span>}
                    </label>
                  )}
                  {fieldDescription && fieldDescription.position !== 'CONTROL_BOTTOM' && (
                    <span style={{ color: '#a1a1a1', fontSize: 12 }}>{fieldDescription.text}</span>
                  )}
                </div>

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

FormControl.displayName = 'SuprFormControl';
