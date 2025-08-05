import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Arrow from "../../../../public/eva-arrow-ios-forward-outline-2.svg"

interface Link {
    href: string
    title: string
}
interface Props {
  links: Link[]
}

export const Bredacrumbs: React.FC<Props> = ({ 
  links
}) => {
  return (
    <div className="w-[210px] h-6 top-[148px] left-28 flex">
        {links.map((el, idx) => (
            <div className="flex" key={idx}>
                <Link href={el.href} className={idx+1===links.length ? 'disabled cursor-default' : 'text-placeholder-gray'}>
                    {el.title}
                </Link> 

                {idx + 1 < links.length && (
                    <Image
                       className="w-6 h-6 mx-2 -rotate-90"
                       alt="Eva arrow ios"
                       src={Arrow}
                   />
                )}
            </div>
        ))}
  </div>
  );
};