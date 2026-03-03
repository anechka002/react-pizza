import { useEffect, type ReactNode } from 'react';
import s from './Modal.module.scss';

type ModalProps = {
  onClose: () => void
  children: ReactNode
  labelledBy?: string
}

type SectionProps = {
  children: ReactNode
}

type TitleProps = SectionProps & {
  id?: string
}

const ModalRoot = ({ onClose, children, labelledBy }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={s.overlay} role="presentation" onClick={onClose}>
      <div
        className={s.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const ModalTitle = ({ id, children }: TitleProps) => {
  return (
    <h3 id={id} className={s.title}>
      {children}
    </h3>
  );
};

const ModalDescription = ({ children }: SectionProps) => {
  return <p className={s.description}>{children}</p>;
};

const ModalActions = ({ children }: SectionProps) => {
  return <div className={s.actions}>{children}</div>;
};

export const Modal = Object.assign(ModalRoot, {
  Title: ModalTitle,
  Description: ModalDescription,
  Actions: ModalActions,
});
