import { useMemo } from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { ConditionCheckProps } from '../../type';

export const ConditionChecker = <TFieldValues extends FieldValues = FieldValues>({
  children,
  visibility,
}: ConditionCheckProps<TFieldValues>) => {
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

    const valueByName: Record<string, any> = namesToWatch.reduce((acc, name, idx) => {
      acc[name as string] = watchedValues[idx];
      return acc;
    }, {} as Record<string, any>);

    const results = conditions.map((condition) => {
      const fieldValue = valueByName[condition.name as string];

      switch (condition.operator) {
        case 'EQUALS':
          return fieldValue === condition.value;
        case 'NOT_EQUALS':
          return fieldValue !== condition.value;
        case 'GREATER_THAN':
          return fieldValue > condition.value;
        case 'LESS_THAN':
          return fieldValue < condition.value;
        case 'GREATER_THAN_OR_EQUAL':
          return fieldValue >= condition.value;
        case 'LESS_THAN_OR_EQUAL':
          return fieldValue <= condition.value;
        case 'STARTS_WITH':
          return fieldValue.startsWith(condition.value);
        case 'ENDS_WITH':
          return fieldValue.endsWith(condition.value);
        case 'INCLUDES':
          return fieldValue.includes(condition.value);
        case 'NOT_INCLUDES':
          return !fieldValue.includes(condition.value);
        default:
          return false;
      }
    });

    return operator === 'AND' ? results.every(Boolean) : results.some(Boolean);
  }, [visibility, namesToWatch, watchedValues, getValues]);

  return evaluateCondition ? children : null;
};
