import { useMemo } from 'react';
import { FieldPath, FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { ConditionCheckProps, ConditionDataType } from '../../type';

export const ConditionChecker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  children,
  visibility,
}: ConditionCheckProps<TFieldValues, TName>) => {
  const { getValues } = useFormContext<TFieldValues>();

  const namesToWatch = useMemo(() => {
    if (typeof visibility === 'boolean') return [];
    return visibility?.conditions.map((c) => c.name) || [];
  }, [visibility]);

  const watchedValues = useWatch<TFieldValues>({ name: namesToWatch });

  const evaluateCondition = useMemo(() => {
    if (typeof visibility === 'boolean') return visibility;

    if (!visibility || visibility?.conditions.length === 0) return true;

    const { conditions, operator } = visibility;

    const valueByName: Record<TName, ConditionDataType> = namesToWatch.reduce((acc, name, idx) => {
      acc[name] = watchedValues[idx];
      return acc;
    }, {} as Record<TName, ConditionDataType>);

    const results = conditions.map((condition) => {
      const fieldValue = valueByName[condition.name];

      switch (condition.operator) {
        case 'EQUALS':
          return fieldValue === condition.value;
        case 'NOT_EQUALS':
          return fieldValue !== condition.value;
        case 'GREATER_THAN':
          return Number(fieldValue) > Number(condition.value);
        case 'LESS_THAN':
          return Number(fieldValue) < Number(condition.value);
        default:
          return false;
      }
    });

    return operator === 'AND' ? results.every(Boolean) : results.some(Boolean);
  }, [visibility, namesToWatch, watchedValues, getValues]);

  return evaluateCondition ? children : null;
};
