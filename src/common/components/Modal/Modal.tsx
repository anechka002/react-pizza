import s from './Modal.module.scss';

type Props = {
  title: string
  description: string
  onClose: () => void
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
}

export const Modal = ({
  title,
  description,
  onClose,
  onConfirm,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
}: Props) => {
  return (
    <div className={s.overlay} role="presentation" onClick={onClose}>
      <div
        className={s.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="modal-title" className={s.title}>
          {title}
        </h3>
        <p className={s.description}>{description}</p>
        <div className={s.actions}>
          <button type="button" onClick={onClose} className="button button--outline">
            {cancelText}
          </button>
          <button type="button" onClick={onConfirm} className="button">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
