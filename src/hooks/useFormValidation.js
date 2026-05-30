import { useCallback, useEffect, useState } from 'react';

/**
 * Form validation with blur (focus removal) and submit validation.
 *
 * @param {Object} values - Current form values
 * @param {Record<string, (value: unknown, values: Object) => string|null|undefined>} rules
 * @param {{ isActive?: boolean }} options - Reset when isActive becomes false (e.g. modal closed)
 */
export function useFormValidation(values, rules, { isActive = true } = {}) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setErrors({});
      setTouched({});
      setSubmitAttempted(false);
    }
  }, [isActive]);

  const validateField = useCallback(
    (field) => {
      const validator = rules[field];
      if (!validator) return null;
      const message = validator(values[field], values);
      return message || null;
    },
    [rules, values]
  );

  const getFieldError = useCallback(
    (field) => {
      if (!(touched[field] || submitAttempted)) return undefined;
      return errors[field] || undefined;
    },
    [touched, submitAttempted, errors]
  );

  // Automatically revalidate fields that are already touched or when submit is attempted
  useEffect(() => {
    if (submitAttempted || Object.keys(touched).length > 0) {
      setErrors((prev) => {
        let hasChanges = false;
        const next = { ...prev };
        Object.keys(rules).forEach((field) => {
          if (touched[field] || submitAttempted) {
            const currentErr = validateField(field);
            if (next[field] !== currentErr) {
              next[field] = currentErr;
              hasChanges = true;
            }
          }
        });
        return hasChanges ? next : prev;
      });
    }
  }, [values, touched, submitAttempted, rules, validateField]);

  const handleBlur = useCallback(
    (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: validateField(field) }));
    },
    [validateField]
  );

  const revalidateField = useCallback(
    (field) => {
      if (touched[field] || submitAttempted) {
        setErrors((prev) => ({ ...prev, [field]: validateField(field) }));
      }
    },
    [touched, submitAttempted, validateField]
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    Object.keys(rules).forEach((field) => {
      const err = validateField(field);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    setTouched((prev) => {
      const next = { ...prev };
      Object.keys(rules).forEach((field) => {
        next[field] = true;
      });
      return next;
    });
    setSubmitAttempted(true);
    return Object.keys(newErrors).length === 0;
  }, [rules, validateField]);

  /** Wire Input / Select — call setValue with the new value */
  const fieldProps = useCallback(
    (field, setValue) => ({
      error: getFieldError(field),
      onBlur: () => handleBlur(field),
      onChange: (e) => {
        const next =
          e?.target !== undefined
            ? e.target.type === 'checkbox'
              ? e.target.checked
              : e.target.value
            : e;
        setValue(next);
        revalidateField(field);
      },
    }),
    [getFieldError, handleBlur, revalidateField]
  );

  return {
    errors,
    getFieldError,
    handleBlur,
    revalidateField,
    validateAll,
    fieldProps,
  };
}

/** @param {string} message */
export const required = (message) => (value) => {
  if (value === null || value === undefined) return message;
  if (Array.isArray(value) && value.length === 0) return message;
  if (typeof value === 'string' && !value.trim()) return message;
  return null;
};

/** Required select / dropdown value */
export const selectRequired = (message) => (value) => {
  if (value === null || value === undefined || value === '') return message;
  if (Array.isArray(value) && value.length === 0) return message;
  return null;
};
