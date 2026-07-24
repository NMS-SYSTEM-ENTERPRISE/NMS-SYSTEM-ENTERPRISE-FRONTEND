import { Icon } from '@iconify/react';
import { useEffect, useId, useState } from 'react';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styles from './styles.module.css';

/**
 * Common Select component built on react-select
 * Ensures high z-index to prevent dropdown hiding issues
 *
 * @param {Object} props - All react-select props plus custom className
 * @param {string} props.className - Additional CSS class name
 * @param {boolean} props.isMulti - Enable multi-select
 * @param {boolean} props.isCreatable - Enable creatable options
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
  isCreatable = false,
  isClearable = true,
  isSearchable = true,
  variant = 'default',
  compact = false,
  error,
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
      backgroundColor:
        variant === 'borderless' ? 'transparent' : 'var(--color-bg-secondary)',
      borderColor: error
        ? 'var(--color-danger)'
        : variant === 'borderless'
          ? 'transparent'
          : state.isFocused
            ? 'var(--color-accent-blue)'
            : 'var(--color-border)',
      borderRadius: 'var(--radius-md)',
      minHeight: variant === 'borderless' ? '30px' : compact ? '34px' : '36px',
      padding: compact ? '0 4px' : provided.padding,
      boxShadow:
        error && state.isFocused
          ? '0 0 0 1px var(--color-danger)'
          : state.isFocused && variant !== 'borderless'
            ? '0 0 0 1px var(--color-accent-blue)'
            : 'none',
      borderWidth: variant === 'borderless' ? '0' : '1px',
      borderBottom:
        variant === 'borderless'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : provided.borderBottom,
      '&:hover': {
        borderColor:
          variant === 'borderless' ? 'transparent' : 'var(--color-accent-blue)',
        borderBottomColor:
          variant === 'borderless'
            ? 'var(--color-accent-cyan)'
            : provided.borderBottomColor,
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
    groupHeading: (provided) => ({
      ...provided,
      color: 'var(--color-chart-cyan)',
      fontSize: '10px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      padding: '10px 12px 6px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      marginBottom: '4px',
    }),
    group: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: '4px',
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

  const Component = isCreatable ? CreatableSelect : Select;

  // Custom Option to render Edit/Delete icons, avatars, and custom icons
  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {props.data.icon && <Icon icon={props.data.icon} width={18} height={18} color="var(--color-text-muted)" />}
            {props.data.avatar && (
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: props.data.color || 'var(--color-bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 'bold',
                color: '#fff',
                border: '1px solid var(--color-border)'
              }}>
                {props.data.avatar}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{props.label}</span>
              {props.data.subLabel && <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{props.data.subLabel}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {restProps.onEditOption && (
              <Icon
                icon="mdi:pencil"
                width={16}
                height={16}
                color="var(--color-chart-cyan)"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  restProps.onEditOption(props.data);
                }}
              />
            )}
            {restProps.onDeleteOption && (
              <Icon
                icon="mdi:trash-can"
                width={16}
                height={16}
                color="var(--color-danger)"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  restProps.onDeleteOption(props.data);
                }}
              />
            )}
          </div>
        </div>
      </components.Option>
    );
  };

  // Custom SingleValue to render avatar/icon in the selected value
  const CustomSingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {props.data.icon && <Icon icon={props.data.icon} width={16} height={16} color="var(--color-text-muted)" />}
          {props.data.avatar && (
            <div style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: props.data.color || 'var(--color-bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              fontWeight: 'bold',
              color: '#fff',
            }}>
              {props.data.avatar}
            </div>
          )}
          <span>{props.data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

  // Custom Group to add individual scrollbars per category
  const CustomGroup = (props) => {
    return (
      <div style={{ paddingBottom: '4px' }}>
        <components.GroupHeading {...props.headingProps}>
          {props.label}
        </components.GroupHeading>
        <div 
          style={{ 
            maxHeight: '200px', 
            overflowY: 'auto',
            overflowX: 'hidden',
          }} 
          className={styles.customGroupScrollbar}
        >
          {props.children}
        </div>
      </div>
    );
  };

  // Custom MenuList to append a static "Create New" button
  const CustomMenuList = (props) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        {restProps.onCreateStaticClick && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              restProps.onCreateStaticClick();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              cursor: 'pointer',
              borderTop: '1px solid var(--color-border)',
              color: 'var(--color-chart-cyan)',
              backgroundColor: 'var(--color-bg-primary)',
              marginTop: '4px',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--color-bg-hover)')
            }
            onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              'var(--color-bg-primary)')
            }
          >
            <Icon icon="mdi:plus-circle" width={16} height={16} />
            <span>{restProps.createStaticText || 'Create New'}</span>
          </div>
        )}
      </components.MenuList>
    );
  };

  return (
    <div className={`${styles.selectWrapper} ${className}`}>
      <Component
        instanceId={instanceId}
        options={options}
        value={getSelectValue()}
        onChange={handleChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        components={{ Option: CustomOption, MenuList: CustomMenuList, SingleValue: CustomSingleValue, Group: CustomGroup }}
        formatCreateLabel={
          isCreatable
            ? (inputValue) => (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Icon
                  icon="mdi:plus-circle"
                  width={16}
                  height={16}
                  color="var(--color-chart-cyan)"
                />
                <span style={{ color: 'var(--color-chart-cyan)' }}>
                  Create "{inputValue}"
                </span>
              </div>
            )
            : undefined
        }
        styles={customStyles}
        menuPortalTarget={mounted ? document.body : null} // Render menu in body to avoid z-index issues
        menuPosition="fixed" // Fixed positioning for better z-index handling
        classNamePrefix="react-select"
        {...restProps}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
