'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import localStyles from './styles.module.css';

/** Token field with generate / copy / reveal actions */
export const TokenInputRow = ({ value, onGenerate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { showSuccess } = useToast();

  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        showSuccess('Token copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy token:', err);
      }
    }
  };

  return (
    <div className={localStyles.inputRowContainer}>
      <Input 
        type={isVisible ? "text" : "password"} 
        value={value} 
        readOnly 
        className={localStyles.flexInput} 
      />
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={() => setIsVisible(!isVisible)}
        title={isVisible ? "Hide Token" : "Show Token"}
      >
        <Icon icon={isVisible ? "mdi:eye-off" : "mdi:eye"} width={18} />
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        <Icon icon="mdi:content-copy" width={18} />
      </Button>
      <Button variant="cyan" size="sm" onClick={onGenerate}>
        Generate
      </Button>
    </div>
  );
};
