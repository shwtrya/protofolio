import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  toolbar?: ReactNode;
  maxWidth?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  toolbar,
  maxWidth = 'max-w-4xl',
}: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] flex items-end justify-center bg-black/85 backdrop-blur-md pt-8 sm:pt-6 sm:items-center sm:p-6 md:p-8"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[88dvh] sm:max-h-[90vh] w-full ${maxWidth} flex-col overflow-hidden rounded-t-[28px] sm:rounded-[24px] border border-[#111114]/20 bg-[#f7f7f4] shadow-2xl text-[#111114]`}
      >
        {/* Modal Header with shrink-0 */}
        {(title || subtitle) && (
          <div className="shrink-0 flex items-center justify-between gap-3 border-b border-[#111114]/12 bg-[#ededeb] px-5 py-3.5 sm:px-8 sm:py-4">
            <div className="min-w-0 flex-1">
              {typeof title === 'string' ? (
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#111114] tracking-tight leading-tight">
                  {title}
                </h2>
              ) : (
                title
              )}
              {subtitle && (
                <div className="mt-1 font-mono text-[11px] sm:text-xs text-[#111114]/70 truncate">
                  {subtitle}
                </div>
              )}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#111114]/10 text-[#111114] hover:bg-[#111114] hover:text-white transition-all cursor-pointer shrink-0 shadow-sm"
              aria-label="Tutup jendela modal"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Optional Toolbar with shrink-0 */}
        {toolbar && <div className="shrink-0">{toolbar}</div>}

        {/* Modal Scrollable Body: min-h-0 prevents flexbox squishing parent */}
        <div
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto px-4 py-5 sm:px-8 sm:py-7 pb-12 sm:pb-10"
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
