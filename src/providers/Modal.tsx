'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = null | 'FILTER' | string;

interface ModalContextProps {
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalData: any;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<any>(null);
  const isOpen = modalType !== null;

  const openModal = (type: ModalType, data?: any) => {
    setModalType(type);
    setModalData(data || null);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalType, modalData, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};