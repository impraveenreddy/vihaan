import { createContext, useState, ReactNode } from "react";

interface EnquiryContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const EnquiryContext = createContext<EnquiryContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const EnquiryProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <EnquiryContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </EnquiryContext.Provider>
  );
};
