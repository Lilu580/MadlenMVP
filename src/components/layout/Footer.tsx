import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer id={"footer"} className="w-full flex items-center justify-center">
      <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-12 md:grid-rows-1 w-full items-start max-w-8xl px-[112px] py-[70px]">
        <div className="flex flex-col gap-10 md:col-span-3 md:col-start-1 md:row-start-1 lg:pt-8">
          <Image alt="Madlen Logo" src="/Logo.svg" width={185} height={68} />
          <div className={"flex flex-col gap-4 items-start justify-start"}>
            <span className="flex flex-col gap-2">
              <p className="text-r-3 text-gray-project-90">+380 67 665 23 22</p>
              <p className="text-r-3 text-gray-project-90">madlen@gmail.com</p>
              <p className="text-r-3 text-gray-project-90">
                м. Київ, вул. Незалежності буд. 32
              </p>
            </span>
            <div className="flex gap-2">
              <Button className={"!p-2"} asChild>
                <a href="">
                  <Image
                    alt="Madlen Logo"
                    src="/inst.svg"
                    width={16}
                    height={16}
                  />
                </a>
              </Button>

              <Button className={"!p-2"} asChild>
                <a href="">
                  <Image
                    alt="Madlen Logo"
                    src="/inst.svg"
                    width={16}
                    height={16}
                  />{" "}
                </a>
              </Button>

              <Button className={"!p-2"} asChild>
                <a href="">
                  <Image
                    alt="Madlen Logo"
                    src="/inst.svg"
                    width={16}
                    height={16}
                  />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <nav className="md:col-span-2 md:col-start-4 md:row-start-1 lg:flex lg:col-start-4 lg:col-span-4 lg:justify-between lg:pt-8">
          <p className="flex flex-col">
            <span className="mb-2 mt-5 md:mt-0">Каталог</span>
            <span className="mb-2">Новинки</span>
            <span className="mb-2">Категорії</span>
            <span className="mb-4">Контакти</span>
          </p>
          <p className="flex flex-col">
            <span className="mb-2">Політика конфіденційності</span>
            <span className="mb-2">Умови використання</span>
          </p>
        </nav>
        <div className="flex flex-col gap-3 md:mt-0 col-span-2 row-start-2 md:row-start-1 md:col-start-6 md:col-span-4 lg:col-start-10 xl:col-start-9 xl:w-[392px] lg:pt-8">
          <p className={"text-r-3 text-gray-project-100 mb-1.5"}>
            БУДЬТЕ НА ЗВ&#39;ЯЗКУ
          </p>
          <p className="text-r-3 text-gray-project-80">
            Підпишіться на новини про наші останні надходження, ексклюзивні
            акції та події
          </p>
          <form className="relative">
            <Input
              type="email"
              placeholder="Введіть ваш e-mail"
              className="px-2 rounded-lg"
            />
            <Button
              type="submit"
              className={"absolute right-0 top-0 !p-[20px]"}
            >
              <Image
                alt="Madlen Logo"
                src="/arrow_send.svg"
                width={18}
                height={18}
              />
            </Button>
          </form>
          <p className="w-full text-right text-gray-project-60 text-m-4">
            © 2025 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
