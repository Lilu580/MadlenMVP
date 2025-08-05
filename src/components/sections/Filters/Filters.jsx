'use client';
import React, { useEffect } from "react";
import Image from "next/image";
import Arrow from "../../../../public/eva-arrow-ios-forward-outline-2.svg"
import vector from "../../../../public/vector.svg";
import { useModal } from '@/providers/Modal';

export const Filters = () => {
  const { openModal } = useModal();

  return (
    <div className="flex justify-between">
        <div className="mt-6 px-1 py-3 flex items-center"  onClick={() => openModal('FILTERS')}>
            <div className="p-2 mr-2">
                <Image
                className="w-5 h-4"
                alt="Vector"
                src={vector}
                />
            </div>

            <div className="mr-11 font-medium text-base">
                Фільтр
            </div>

            <Image
                className=""
                alt="Image"
                src={Arrow}
            
            />
        </div>

        <div className="mt-6 px-1 py-3 flex items-center">
            <div className="p-2 mr-2">
                <Image
                className="w-5 h-4"
                alt="Vector"
                src={vector}
                />
            </div>
            <div className="mr-3 font-medium text-base">
                Сортування
            </div>

            <Image
                className=""
                alt="Image"
                src={Arrow}
            />
        </div>
    </div>
  );
};