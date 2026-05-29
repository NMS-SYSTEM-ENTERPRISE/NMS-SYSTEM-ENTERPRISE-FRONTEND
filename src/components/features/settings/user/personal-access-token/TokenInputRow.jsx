import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import localStyles from './styles.module.css';

/** Token field with generate / copy / reveal actions */
export const TokenInputRow = ({ value, onGenerate }) => (
  <div className={localStyles.inputRowContainer}>
    <Input type="text" value={value} readOnly className={localStyles.flexInput} />
    <Button variant="secondary" size="sm">
      <Icon icon="mdi:eye" width={18} />
    </Button>
    <Button variant="secondary" size="sm">
      <Icon icon="mdi:content-copy" width={18} />
    </Button>
    <Button variant="cyan" size="sm" onClick={onGenerate}>
      Generate
    </Button>
  </div>
);
