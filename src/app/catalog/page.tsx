"use client";

import React, { JSX } from "react";
import { Bredacrumbs } from "@/components/sections/Breadcrumbs/Breadcrumbs";
import { Filters } from '@/components/sections/Filters/Filters'
import vector from "../../../public/vector.svg";
import Image from "next/image";
import Arrow from "../../../public/eva-arrow-ios-forward-outline-2.svg"

import { RecomendationCart } from "@/components/sections/Article/RecomendationCart";
export default function Page (): JSX.Element {

  return (
    <div className="w-full">
        <Bredacrumbs links={[{title: 'Головна', href:'/'}, {title: 'Каталог', href: '/catalog'}]}/>
        <h3 className="text-2xl mt-8 font-medium">КАТАЛОГ</h3>
          <Filters />
    
            {/* <div className="w-[237px] h-[331px] top-[49px] absolute left-0">
            <div className="flex flex-col w-[237px] items-start gap-[13px] relative">
              <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">

                <div className="relative self-stretch w-full h-[76px]">
                
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative self-stretch w-full h-[31px]">
                  <div className="absolute top-[13px] left-0 font-4 font-[number:var(--4-font-weight)] text-rsave-u text-[length:var(--4-font-size)] tracking-[var(--4-letter-spacing)] leading-[var(--4-line-height)] [font-style:var(--4-font-style)]">
                    МАТЕРІАЛ
                  </div>

                  <div className="absolute w-[237px] h-px top-0 left-0 bg-OI-5mf-q" />

                  <Image
                    className="absolute w-2 h-3.5 top-[-488px] left-[-1709px]"
                    alt="Image"
                    src={image2}
                  />
                </div>

                <div className="flex flex-col w-[86px] items-start gap-3 relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <div className="w-5 relative h-5">
                      <div className="bg-[#555555] rounded-sm border border-solid border-white relative h-5">
                        <Image
                          className="absolute w-4 h-4 top-[-536px] left-[-1710px]"
                          alt="Element checkmark"
                          src={checkmark}
                        />
                      </div>
                    </div>

                    <div className="relative w-fit mt-[-1.00px] font-1440-body-text-2-reg font-[number:var(--1440-body-text-2-reg-font-weight)] text-gray-80 text-[length:var(--1440-body-text-2-reg-font-size)] tracking-[var(--1440-body-text-2-reg-letter-spacing)] leading-[var(--1440-body-text-2-reg-line-height)] [font-style:var(--1440-body-text-2-reg-font-style)]">
                      Джинс
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto] mr-[-3.00px]">
                    <div className="w-5 bg-backgroundlight-modewhite-100 rounded-sm border border-solid border-[#ced4da] relative h-5" />

                    <div className="relative w-fit mt-[-1.00px] font-1440-body-text-2-reg font-[number:var(--1440-body-text-2-reg-font-weight)] text-gray-80 text-[length:var(--1440-body-text-2-reg-font-size)] tracking-[var(--1440-body-text-2-reg-letter-spacing)] leading-[var(--1440-body-text-2-reg-line-height)] [font-style:var(--1440-body-text-2-reg-font-style)]">
                      Хлопок
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto] mr-[-13.00px]">
                    <div className="w-5 bg-backgroundlight-modewhite-100 rounded-sm border border-solid border-[#ced4da] relative h-5" />

                    <div className="relative w-fit mt-[-1.00px] font-1440-body-text-2-reg font-[number:var(--1440-body-text-2-reg-font-weight)] text-gray-80 text-[length:var(--1440-body-text-2-reg-font-size)] tracking-[var(--1440-body-text-2-reg-letter-spacing)] leading-[var(--1440-body-text-2-reg-line-height)] [font-style:var(--1440-body-text-2-reg-font-style)]">
                      Бавовна
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto] mr-[-27.00px]">
                    <div className="w-5 bg-backgroundlight-modewhite-100 rounded-sm border border-solid border-[#ced4da] relative h-5" />

                    <div className="relative w-fit mt-[-1.00px] font-1440-body-text-2-reg font-[number:var(--1440-body-text-2-reg-font-weight)] text-gray-80 text-[length:var(--1440-body-text-2-reg-font-size)] tracking-[var(--1440-body-text-2-reg-letter-spacing)] leading-[var(--1440-body-text-2-reg-line-height)] [font-style:var(--1440-body-text-2-reg-font-style)]">
                      Поліестер
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto] mr-[-9.00px]">
                    <div className="w-5 bg-backgroundlight-modewhite-100 rounded-sm border border-solid border-[#ced4da] relative h-5" />

                    <div className="relative w-fit mt-[-1.00px] font-1440-body-text-2-reg font-[number:var(--1440-body-text-2-reg-font-weight)] text-gray-80 text-[length:var(--1440-body-text-2-reg-font-size)] tracking-[var(--1440-body-text-2-reg-letter-spacing)] leading-[var(--1440-body-text-2-reg-line-height)] [font-style:var(--1440-body-text-2-reg-font-style)]">
                      Еластан
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* <div className="flex flex-col w-[1216px] items-center gap-12 absolute top-[379px] left-28">
          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[228px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[228px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                <RecomendationCart product={{
                    name: "",
                    price: "",
                    oldPrice: "",
                    imageSrc: "",
                    frameSrc: ""
                  }} />

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[228px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[228px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[228px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[228px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-5 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[228px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[228px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>

              <div className="relative flex-1 grow h-[356px]">
                <div className="w-[227px] relative h-[356px] rounded-xl">
                  <div className="flex flex-col w-[227px] items-end gap-2 p-2 absolute top-0 left-0 bg-neutral-color00 rounded-xl shadow-[0px_4px_28px_-2px_#00000014]">
                    <div className="relative self-stretch w-full h-[264px] bg-white rounded-[10px] overflow-hidden">
                      <Image
                        className="absolute w-[211px] h-[264px] top-0 left-0"
                        alt="Image"
                        src={image1}
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2 pb-0 px-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Open_Sans-SemiBold',Helvetica] font-semibold text-neutral-color100 text-[15px] tracking-[0] leading-6">
                          Назва товару
                        </div>

                        <div className="[font-family:'Open_Sans-Bold',Helvetica] font-bold text-neutral-color100 text-xs leading-5 relative w-fit tracking-[0] whitespace-nowrap">
                          1 000,00 грн
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image
                    className="absolute w-10 h-10 top-[308px] left-[179px]"
                    alt="Frame"
                    src={frame141}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
            <div className="flex w-[34px] h-[34px] items-center justify-center gap-2.5 px-0.5 py-0 relative rounded-lg">
              <Image
                className="relative w-6 h-6"
                alt="Arrow arrow right SM"
                src={arrowRightSm}
              />
            </div>

            <div className="flex flex-col w-[34px] items-center justify-center gap-2.5 pt-1.5 pb-1 px-[13px] relative self-stretch bg-[#4f4f4f] rounded-lg">
              <div className="ml-[-1.50px] mr-[-1.50px] text-neutral-color00 relative w-fit mt-[-1.00px] [font-family:'Open_Sans-Bold',Helvetica] font-bold text-lg tracking-[0] leading-6 whitespace-nowrap">
                1
              </div>
            </div>

            <div className="flex flex-col w-[34px] items-center justify-center gap-2.5 pt-1.5 pb-1 px-[11px] relative self-stretch rounded-[10px]">
              <div className="text-[#4f4f4f] relative w-fit mt-[-1.00px] [font-family:'Open_Sans-Bold',Helvetica] font-bold text-lg tracking-[0] leading-6 whitespace-nowrap">
                2
              </div>
            </div>

            <div className="flex flex-col w-[34px] items-center justify-center gap-2.5 pt-1.5 pb-1 px-[11px] relative self-stretch rounded-[10px]">
              <div className="text-[#4f4f4f] relative w-fit mt-[-1.00px] [font-family:'Open_Sans-Bold',Helvetica] font-bold text-lg tracking-[0] leading-6 whitespace-nowrap">
                3
              </div>
            </div>

            <div className="flex flex-col w-[34px] items-center justify-center gap-2.5 pt-1.5 pb-1 px-2.5 relative self-stretch rounded-[10px]">
              <div className="text-[#4f4f4f] relative w-fit mt-[-1.00px] [font-family:'Open_Sans-Bold',Helvetica] font-bold text-lg tracking-[0] leading-6 whitespace-nowrap">
                4
              </div>
            </div>

            <div className="flex flex-col w-[34px] items-center justify-center gap-2.5 pt-1.5 pb-1 px-[7px] relative self-stretch rounded-[10px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Open_Sans-Bold',Helvetica] font-bold text-[#4f4f4f] text-lg tracking-[0] leading-6 whitespace-nowrap">
                ...
              </div>
            </div>

            <div className="flex flex-col w-[34px] items-center justify-center gap-2.5 pt-1.5 pb-1 px-[7px] relative self-stretch rounded-[10px]">
              <div className="ml-[-0.50px] mr-[-0.50px] text-[#4f4f4f] relative w-fit mt-[-1.00px] [font-family:'Open_Sans-Bold',Helvetica] font-bold text-lg tracking-[0] leading-6 whitespace-nowrap">
                28
              </div>
            </div>

            <div className="flex w-[34px] h-[34px] items-center justify-center gap-2.5 px-0.5 py-0 relative rounded-lg rotate-180">
              <Image
                className="relative w-6 h-6 -rotate-180"
                alt="Arrow arrow right SM"
                src={arrowRightSm2}
              />
            </div>
          </div>
        </div>

        <div className="absolute top-[231px] left-[649px] [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
          КОСТЮМИ
        </div>

        <div className="absolute w-[210px] h-6 top-[148px] left-28">
          <div className="absolute top-0 left-0 font-body-2 font-[number:var(--body-2-font-weight)] text-main-gray text-[length:var(--body-2-font-size)] tracking-[var(--body-2-letter-spacing)] leading-[var(--body-2-line-height)] whitespace-nowrap [font-style:var(--body-2-font-style)]">
            Головна
          </div>

          <div className="absolute top-0 left-[140px] font-body-2 font-[number:var(--body-2-font-weight)] text-[#222121] text-[length:var(--body-2-font-size)] tracking-[var(--body-2-letter-spacing)] leading-[var(--body-2-line-height)] whitespace-nowrap [font-style:var(--body-2-font-style)]">
            Каталог
          </div>

          <Image
            className="absolute w-6 h-6 top-0 left-[91px]"
            alt="Eva arrow ios"
            src={evaArrowIosForwardOutline}
          />
        </div> */}
    </div>
  );
};
