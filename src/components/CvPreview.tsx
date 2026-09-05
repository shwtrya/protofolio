import { ReactNode, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Modal from './ui/Modal';

const CV_PREVIEW = '/proof/preview-cv.webp';

interface Props {
  className?: string;
  label?: string;
  showIcon?: boolean;
  icon?: ReactNode;
}

export const CvPreview = ({
  className = 'btn btn-secondary btn-lg',
  label = 'Pratinjau CV',
  showIcon = false,
  icon,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <span>{label}</span>
        {showIcon && (icon ?? <ArrowUpRight size={16} />)}
      </button>

      {open && (
        <Modal
          isOpen
          onClose={() => setOpen(false)}
          title="Curriculum Vitae"
          subtitle="Shawava Tritya · Lulusan TKJ SMKN 1 Cileungsi"
        >
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-[10px] border border-line bg-surface2">
              <img
                src={CV_PREVIEW}
                alt="Pratinjau CV Shawava Tritya"
                width={1191}
                height={1685}
                className="h-auto w-full"
              />
            </div>
            <p className="t-body text-sm">
              Pratinjau CV lengkap. Salinan resmi dapat saya kirimkan langsung lewat email atau
              WhatsApp saat dihubungi.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CvPreview;
