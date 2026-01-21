import clsx from 'clsx';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import styles from './styles.module.css';

export const Popup = ({
  trigger,
  content,
  placement = 'bottom',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    }
  );

  return (
    <>
      <div
        ref={setReferenceElement}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={styles.popupTrigger}
      >
        {trigger}
      </div>

      {isOpen && (
        <>
          <div
            className={styles.popupOverlay}
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={setPopperElement}
            style={popperStyles.popper}
            {...attributes.popper}
            className={clsx(styles.popupContent, className)}
          >
            {content}
          </div>
        </>
      )}
    </>
  );
};
