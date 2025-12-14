import { useCallback, cloneElement } from 'react';
import { FieldValues, FieldPath } from 'react-hook-form';
import { useSuprFormContext } from '../../context/SuprFormContext';
import { ControlledFieldProps } from '../form/type';

export const ControlledField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  fieldState,
  children,
  className = '',
  label,
  id = crypto.randomUUID(),
  required,
}: ControlledFieldProps<TFieldValues, TName>) => {
  const { showAsterisk } = useSuprFormContext();
  const { onChange, onBlur, value, name, disabled, ref } = field;
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
          {showAsterisk && required && <span style={{ color: 'red' }}> *</span>}
        </label>
      )}
      {cloneElement(children, {
        ...children.props,
        id,
        name,
        disabled,
        onChange: handleChange,
        value: value,
        onBlur: handleBlur,
        ref,
      })}
      {error && (
        <div style={{ color: 'red', fontSize: 13 }} className='controlled-field-error'>
          {error.message}
        </div>
      )}
    </div>
  );
};
