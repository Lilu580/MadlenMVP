'use client';
import Image from "next/image";
import vector from "../../../../public/vector.svg";
import arrow from "../../../../public/eva-arrow-ios-forward-outline-2.svg"

interface Props {
    onClose: () => void
}

const FilterModal: React.FC<Props> = ({onClose}) => {
  return (
    <div>
        <div className="px-1 flex items-center">
            <div className="pr-2 mr-2">
                <Image
                className="w-5 h-4"
                alt="Vector"
                src={vector}
                />
            </div>

            <div className="mr-11 font-medium text-base">
                Фільтр
            </div>
        </div>
        <div className="flex items-center w-full justify-between mt-10">
            <div className="">
                ЦІНА
            </div>

            <div className="" />

            <Image
                className=""
                alt="Image"
                src={arrow}
            />
        </div>
        <div className="flex flex-col w-[237px] h-[76px] items-center justify-center gap-5 relative">
            <div className="relative self-stretch w-full h-6">
                <div className="absolute w-[237px] h-4 top-0.5 left-0">
                <div className="absolute w-[237px] h-[3px] top-[7px] left-0 bg-[#807d7e] rounded opacity-60" />

                <div className="absolute w-[94px] h-[3px] top-[7px] left-[65px] bg-[#343435] rounded" />

                <div className="absolute w-4 h-4 top-0 left-[151px] bg-[#343435] rounded-lg shadow-s2" />
                </div>

                <Image
                className="absolute w-4 h-4 top-[-399px] left-[-1709px]"
                alt="Left"
                src={arrow}
                />
            </div>

            <div className="relative self-stretch w-full h-8">
                <div className="flex w-[237px] items-center justify-between relative">
                <div className="flex w-[110px] h-8 items-center justify-center gap-2.5 px-[22px] py-1.5 relative border border-solid border-[#bebcbd]">
                    <div className="mt-[-0.50px] [font-family:'Work_Sans-Regular',Helvetica] font-normal text-[#3c4242] text-base leading-[normal] relative w-fit tracking-[0] whitespace-nowrap">
                    3 200 ₴
                    </div>
                </div>

                <div className="flex w-[110px] h-8 items-center justify-center gap-2.5 px-[15px] py-1.5 relative border border-solid border-[#bebcbd]">
                    <div className="mt-[-0.50px] [font-family:'Work_Sans-Regular',Helvetica] font-normal text-[#3c4242] text-base leading-[normal] relative w-fit tracking-[0] whitespace-nowrap">
                    10 000 ₴
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FilterModal;