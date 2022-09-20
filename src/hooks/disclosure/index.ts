import { useState } from 'react';

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(curr => !curr);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return {
    isLoading,
    isOpen,
    onClose,
    onOpen,
    onToggle,
    startLoading,
    stopLoading,
  };
};
