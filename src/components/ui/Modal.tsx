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

  // Render via React Portal to document.body to completely escape GSAP / parent transform stacking contexts
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] flex items-end justify-center bg-black/85 backdrop-blur-md p-0 sm:items-center sm:p-6 md:p-8"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[96vh] sm:max-h-[92vh] w-full ${maxWidth} flex-col overflow-hidden rounded-t-[28px] sm:rounded-[24px] border border-[#111114]/20 bg-[#f7f7f4] shadow-2xl text-[#111114]`}
      >
        {/* Modal Header */}
        {(title || subtitle) && (
          <div className="flex items-start justify-between gap-4 border-b border-[#111114]/12 bg-[#eaeae7] px-6 py-4 sm:px-8 sm:py-5">
            <div className="min-w-0 flex-1">
              {typeof title === 'string' ? (
                <h2 className="font-serif text-2xl sm:text-3xl text-[#111114] tracking-tight">
                  {title}
                </h2>
              ) : (
                title
              )}
              {subtitle && (
                <div className="mt-1 font-mono text-xs text-[#111114]/70">
                  {subtitle}
                </div>
              )}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111114]/8 text-[#111114]/80 hover:bg-[#111114] hover:text-white transition-all cursor-pointer shrink-0 shadow-sm"
              aria-label="Tutup jendela modal"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Optional Toolbar (Tabs / Actions) */}
        {toolbar}

        {/* Modal Scrollable Body */}
        <div
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-7"
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
