import { useEffect, useId, useState } from 'react';
import Select from 'react-select';
import styles from './styles.module.css';

/**
 * Common Select component built on react-select
 * Ensures high z-index to prevent dropdown hiding issues
 *
 * @param {Object} props - All react-select props plus custom className
 * @param {string} props.className - Additional CSS class name
 * @param {boolean} props.isMulti - Enable multi-select
 * @param {Array} props.options - Array of {value, label} objects
 * @param {string|Array} props.value - Selected value(s)
 * @param {Function} props.onChange - Change handler
 */
export const SelectComponent = ({
  className = '',
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  variant = 'default',
  ...restProps
}) => {
  // Convert value to react-select format
  const getSelectValue = () => {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (isMulti) {
      if (!Array.isArray(value)) {
        return [];
      }
      return options.filter((opt) => value.includes(opt.value));
    }

    // Handle both string and number comparisons
    return (
      options.find((opt) => {
        // Use loose equality to handle string/number mismatches
        return opt.value == value || String(opt.value) === String(value);
      }) || null
    );
  };

  // Handle change event
  const handleChange = (selectedOption) => {
    if (onChange) {
      if (isMulti) {
        const values = selectedOption
          ? selectedOption.map((opt) => opt.value)
          : [];
        // For multi-select, pass array directly
        onChange({ target: { value: values } });
      } else {
        const val = selectedOption ? selectedOption.value : '';
        // For single select, pass the value
        onChange({ target: { value: val } });
      }
    }
  };

  // Custom styles for react-select to match app theme
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: variant === 'borderless' ? 'transparent' : 'var(--color-bg-secondary)',
      borderColor: variant === 'borderless' 
        ? 'transparent' 
        : state.isFocused ? 'var(--color-accent-blue)' : 'var(--color-border)',
      borderRadius: 'var(--radius-md)',
      minHeight: variant === 'borderless' ? '30px' : '36px',
      boxShadow: state.isFocused && variant !== 'borderless'
        ? '0 0 0 1px var(--color-accent-blue)'
        : 'none',
      borderWidth: variant === 'borderless' ? '0' : '1px',
      borderBottom: variant === 'borderless' ? '1px solid rgba(255, 255, 255, 0.1)' : provided.borderBottom,
      '&:hover': {
        borderColor: variant === 'borderless' ? 'transparent' : 'var(--color-accent-blue)',
        borderBottomColor: variant === 'borderless' ? 'var(--color-accent-cyan)' : provided.borderBottomColor,
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-bg-secondary)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 9999, // High z-index to prevent hiding
      marginTop: '4px',
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // High z-index for portal
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'var(--color-accent-blue)'
        : state.isFocused
        ? 'var(--color-bg-hover)'
        : 'transparent',
      color: state.isSelected ? 'white' : 'var(--color-text-primary)',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: 'var(--color-accent-blue)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--color-text-primary)',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-bg-tertiary)',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--color-text-primary)',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'var(--color-text-secondary)',
      '&:hover': {
        backgroundColor: 'var(--color-chart-red)',
        color: 'white',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--color-text-muted)',
    }),
    input: (provided) => ({
      ...provided,
      color: 'var(--color-text-primary)',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: variant === 'borderless' ? 'none' : 'block',
      backgroundColor: 'var(--color-border)',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--color-text-muted)',
      '&:hover': {
        color: 'var(--color-text-primary)',
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: 'var(--color-text-muted)',
      '&:hover': {
        color: 'var(--color-text-primary)',
      },
    }),
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const instanceId = useId();

  return (
    <div className={`${styles.selectWrapper} ${className}`}>
      <Select
        instanceId={instanceId}
        options={options}
        value={getSelectValue()}
        onChange={handleChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        styles={customStyles}
        menuPortalTarget={mounted ? document.body : null} // Render menu in body to avoid z-index issues
        menuPosition="fixed" // Fixed positioning for better z-index handling
        classNamePrefix="react-select"
        {...restProps}
      />
    </div>
  );
};
