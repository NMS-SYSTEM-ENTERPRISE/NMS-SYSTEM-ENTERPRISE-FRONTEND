import { FilterSidebar } from '@/components/ui/filter-sidebar';

const CategoryFilterSidebar = ({
  isOpen,
  onClose,
  category,
  filters,
  onFilterChange,
}) => {
  const getFiltersForCategory = (cat) => {
    const commonFilters = [
      {
        key: 'search',
        type: 'search',
        label: 'Search',
        placeholder: `Search ${cat}...`,
      },
      {
        key: 'status',
        type: 'select',
        label: 'Status',
        options: [
          { value: '', label: 'All' },
          { value: 'Up', label: 'Up' },
          { value: 'Down', label: 'Down' },
        ],
        placeholder: 'Select status',
      },
    ];

    // Add category-specific filters
    switch (cat) {
      case 'Server & Apps':
        return [
          ...commonFilters,
          {
            key: 'type',
            type: 'select',
            label: 'Type',
            options: [
              { value: '', label: 'All' },
              { value: 'Windows', label: 'Windows' },
              { value: 'Linux', label: 'Linux' },
            ],
            placeholder: 'Select type',
          },
          {
            key: 'cpu',
            type: 'range',
            label: 'CPU Usage (%)',
            min: 0,
            max: 100,
          },
          {
            key: 'memory',
            type: 'range',
            label: 'Memory Usage (%)',
            min: 0,
            max: 100,
          },
          {
            key: 'disk',
            type: 'range',
            label: 'Disk Usage (%)',
            min: 0,
            max: 100,
          },
        ];

      case 'Cloud':
        return [
          ...commonFilters,
          {
            key: 'provider',
            type: 'select',
            label: 'Provider',
            options: [
              { value: '', label: 'All' },
              { value: 'AWS', label: 'AWS' },
              { value: 'Azure', label: 'Azure' },
              { value: 'GCP', label: 'GCP' },
            ],
            placeholder: 'Select provider',
          },
          {
            key: 'region',
            type: 'select',
            label: 'Region',
            options: [
              { value: '', label: 'All' },
              { value: 'us-east-1', label: 'US East 1' },
              { value: 'eu-west-1', label: 'EU West 1' },
              { value: 'ap-south-1', label: 'AP South 1' },
            ],
            placeholder: 'Select region',
          },
        ];

      case 'Network':
        return [
          ...commonFilters,
          {
            key: 'deviceType',
            type: 'select',
            label: 'Device Type',
            options: [
              { value: '', label: 'All' },
              { value: 'Router', label: 'Router' },
              { value: 'Switch', label: 'Switch' },
              { value: 'Firewall', label: 'Firewall' },
            ],
            placeholder: 'Select device type',
          },
          {
            key: 'latency',
            type: 'range',
            label: 'Latency (ms)',
            min: 0,
            max: 1000,
          },
        ];

      default:
        return commonFilters;
    }
  };

  return (
    <FilterSidebar
      isOpen={isOpen}
      onClose={onClose}
      title={`${category} Filters`}
      filters={getFiltersForCategory(category)}
      filterValues={filters}
      onFilterChange={(key, value) => {
        onFilterChange({ ...filters, [key]: value });
      }}
      onApply={() => {
        console.log('Applied filters:', filters);
        onClose();
      }}
      onReset={() => {
        onFilterChange({});
      }}
    />
  );
};

export default CategoryFilterSidebar;
