'use client';

import { useModal } from '@/providers/Modal';
import FilterModal from './FilterModal';
import Image from "next/image";
import Cross from '../../../../public/Vectorcross.svg';

const ModalRenderer = () => {
  const { modalType, closeModal } = useModal();
  if (!modalType) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 "
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded shadow-lg relative z-100 w-3/4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          className="absolute right-7 top-8 translate-x-full cursor-pointer"
          alt="Close"
          src={Cross}
          onClick={closeModal}
        />
        {modalType === 'FILTERS' && <FilterModal onClose={closeModal} />}
      </div>
    </div>
  );
};

export default ModalRenderer;
