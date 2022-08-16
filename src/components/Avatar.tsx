import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { FiUser } from 'react-icons/fi';

import { convertClassnames } from '+/lib/convertClassnames';

interface AvatarProps {
  fallbackClassname?: string;
  imageClassname?: string;
  name?: string;
  rootClassName?: string;
  size?: 'small' | 'medium' | 'large';
  src?: string;
}

export function Avatar({
  fallbackClassname = '',
  imageClassname = '',
  name,
  rootClassName = '',
  size = 'medium',
  src,
}: AvatarProps) {
  const nameInitials = name
    ?.split(' ')
    .map(word => word[0])
    .join('');

  return (
    <div className="gap-4">
      <AvatarPrimitive.Root
        className={convertClassnames([
          rootClassName,
          'inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle',
          size === 'small'
            ? 'h-8 w-8 text-sm'
            : size === 'medium'
            ? 'h-10 w-10 text-base'
            : 'h-12 w-12 text-lg',
        ])}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={name}
          className={convertClassnames([
            imageClassname,
            'h-full w-full rounded-full object-cover',
          ])}
        />
        <AvatarPrimitive.Fallback
          className={convertClassnames([
            fallbackClassname,
            'flex h-full w-full items-center justify-center font-medium leading-3',
            nameInitials ? 'bg-brand-secondary' : 'bg-gray-400 text-xl',
          ])}
        >
          {nameInitials ?? <FiUser />}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    </div>
  );
}
