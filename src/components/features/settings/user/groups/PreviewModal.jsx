import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { PREVIEW_COLUMNS } from '@/utils/constants/settings/users';
import { MOCK_PREVIEW_RESULTS, PREVIEW_TOTAL_ITEMS } from '@/utils/dummy-data/settings/users';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import classNames from 'classnames';

const renderPreviewCell = (result, col) => {
  switch (col.key) {
    case 'type':
      return <Icon icon={result.type} width={20} />;
    case 'groups':
      return (
        <div className={localStyles.badgeContainer}>
          {result.groups.map((g, i) => (
            <Badge key={i} variant="cyan">{g}</Badge>
          ))}
        </div>
      );
    default:
      return result[col.key];
  }
};

/** Preview Results modal */
export const PreviewModal = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);

  const filtered = MOCK_PREVIEW_RESULTS.filter((r) =>
    r.monitor.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Preview Results" className={mainStyles.previewModal}>
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search..."
        className={localStyles.searchFullWidth}
      />
      <div className={localStyles.tableContainer}>
        <Table
          columns={PREVIEW_COLUMNS}
          data={filtered}
          keyExtractor={(r) => r.id}
          renderCell={renderPreviewCell}
          emptyMessage="No results found."
        />
      </div>
      <Pagination
        currentPage={page}
        totalItems={PREVIEW_TOTAL_ITEMS}
        pageSize={100}
        onPageChange={setPage}
        showPageSizeSelect={false}
      />
    </Modal>
  );
};
