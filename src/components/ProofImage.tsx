import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ProofImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: React.ImgHTMLAttributes<HTMLImageElement>['loading'];
  fallbackLabel?: string;
}

const ProofImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fallbackLabel = 'Dokumentasi sedang disiapkan'
}: ProofImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasError = failedSrc === src;

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={fallbackLabel}
        className={`flex flex-col items-center justify-center gap-3 bg-gray-100 text-center text-gray-600 dark:bg-gray-900 dark:text-gray-300 ${className}`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-400">
          <ImageOff size={22} />
        </div>
        <span className="px-4 text-sm font-semibold">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      onError={() => setFailedSrc(src)}
    />
  );
};

export default ProofImage;
