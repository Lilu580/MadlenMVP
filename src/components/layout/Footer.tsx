import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center">
      <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-8 md:grid-rows-1 max-w-8xl px-[112px] py-[70px]">
        <div className="mr-16 md:col-span-3  md:col-start-1 md:row-start-1">
          <Image
            alt="Madlen Logo"
            src="/Logo.svg"
            width={112}
            height={40}
            className="mb-8"
          />
          <p className="flex flex-col">
            <span className="mb-1">+380 67 665 23 22</span>
            <span className="mb-1">madlen@gmail.com</span>
            <span className="mb-1">м. Київ</span>
            <span className="mb-6">вул. Незалежності буд. 32</span>
          </p>
          <div className="flex gap-2">
            <a
              href=""
              className="bg-black w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <Image alt="Madlen Logo" src="/inst.svg" width={16} height={16} />
            </a>
            <a
              href=""
              className="bg-black w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <Image alt="Madlen Logo" src="/inst.svg" width={16} height={16} />
            </a>
            <a
              href=""
              className="bg-black w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <Image alt="Madlen Logo" src="/inst.svg" width={16} height={16} />
            </a>
          </div>
        </div>
        <nav className="md:col-span-2 md:col-start-4 md:row-start-1 lg:flex lg:col-start-3 lg:col-span-3 lg:justify-between">
          <p className="flex flex-col ">
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
        <div className="mt-6 md:mt-0 col-span-2 w-full row-start-2 md:row-start-1 md:col-start-6  md:col-span-3 lg:col-start-7">
          <h3>БУДЬТЕ НА ЗВ&#39;ЯЗКУ</h3>
          <p className="text-primary-gray mt-4">
            Підпишіться на новини про наші останні надходження, ексклюзивні
            акції та події
          </p>
          <form className="mt-2 flex border border-border-input justify-between rounded-lg">
            <input
              type="email"
              placeholder="Введіть ваш e-mail"
              className="px-2 rounded-lg"
            />
            <button
              type="submit"
              className="bg-black w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <Image
                alt="Madlen Logo"
                src="/arrow_send.svg"
                width={32}
                height={32}
              />
            </button>
          </form>
          <p className="w-full text-center mt-6 text-placeholder-gray md:mt-16 md:text-end">
            © 2025 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
