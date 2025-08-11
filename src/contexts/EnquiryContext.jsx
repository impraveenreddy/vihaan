import React, { createContext, useState } from "react";

export const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <EnquiryContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </EnquiryContext.Provider>
    );
};
