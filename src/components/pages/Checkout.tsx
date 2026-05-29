"use client";

import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import { CardProductCart } from "@/components/cart/CardProductCart";
import { CardGeneralPrice } from "@/components/cart/CardGeneralPrice";
import { Button } from "@/components/ui/button";
import { CardMain } from "@/components/layout/CardMain";
import React from "react";
import { useRouter } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { productCart, lastOrderAtom } from "@/lib/store";
import { useFormik } from "formik";
import { WrapInput } from "@/components/ui/wrap-input";
import { Input } from "@/components/ui/input";
import { DeliverySection } from "@/components/checkout/DeliverySection";
import { TFormikValuesCheckout, validationSchemaCheckout } from "@/lib/validation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Visa } from "@/components/svg/Vise";
import { MasterCard } from "@/components/svg/MasterCard";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "@/components/svg";
import { getPriceProduct } from "@/lib/utils";

export function Checkout() {
  const router = useRouter();
  const [basket, setBasket] = useAtom(productCart);
  const setLastOrder = useSetAtom(lastOrderAtom);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const formik = useFormik<TFormikValuesCheckout>({
    initialValues,
    validationSchema: validationSchemaCheckout,
    onSubmit: async (values) => {
      setError("");
      setLoading(true);

      try {
        const items = basket.map((item) => ({
          productId: item.id.split("_")[0],
          name: item.name,
          article: item.article,
          image: item.image,
          color: item.color,
          nameColor: item.nameColor,
          count: item.count,
          unitPrice: getPriceProduct(item.price, 1),
        }));

        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, items }),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Помилка оформлення");
          return;
        }

        const order = await res.json();
        setLastOrder(order);
        setBasket([]);
        router.push("/cart/checkout/success");
      } catch {
        setError("Помилка з'єднання. Спробуйте ще раз.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <BreadCrumbs
        mainTitle="Оформлення замовлення"
        links={[
          { link: "/", title: "Головна" },
          { link: "/cart", title: "Кошик" },
        ]}
      />
      <div className="flex flex-col w-full gap-8">
        <h2 className="header-2 text-gray-project-100 uppercase md:text-left text-center">
          ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
        </h2>
        <div className="flex flex-col xl:flex-row w-full gap-5 items-start">
          <form className="w-full flex flex-col gap-8 px-4 py-6 border border-gray-project-30 rounded-[16px]">
            <section className="gap-5 flex flex-col w-full">
              <h4 className="header-4 text-gray-project-100">Контактні дані</h4>
              <div className="flex w-full gap-4 flex-col">
                <div className="flex w-full flex-col md:flex-row gap-4">
                  <WrapInput title="І'мя*" error={formik.errors.name}>
                    <Input type="text" autoComplete="name" value={formik.values.name} name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Ваше ім'я" />
                  </WrapInput>
                  <WrapInput title="Прізвище*" error={formik.errors.surname}>
                    <Input type="text" autoComplete="name" value={formik.values.surname} name="surname" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Ваше прізвище" />
                  </WrapInput>
                </div>
                <div className="flex w-full flex-col md:flex-row gap-4">
                  <WrapInput title="E-mail*" error={formik.errors.email}>
                    <Input type="email" autoComplete="email" value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Ваш e-mail" />
                  </WrapInput>
                  <WrapInput title="Телефон*" error={formik.errors.phone}>
                    <Input type="tel" autoComplete="tel" value={formik.values.phone} name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Ваш телефон" />
                  </WrapInput>
                </div>
              </div>
            </section>

            <DeliverySection formik={formik} />

            <section className="gap-5 flex flex-col w-full">
              <h4 className="header-4 text-gray-project-100">Метод оплати</h4>
              <div className="flex flex-col w-full">
                <WrapInput error={formik.errors.payments}>
                  <RadioGroup defaultValue="online" value={formik.values.payments} onValueChange={(v) => formik.setFieldValue("payments", v)}>
                    <div className="flex items-center justify-between w-full py-5 px-6 border border-gray-project-30 rounded-[8px]">
                      <div className="flex gap-3 items-center justify-center">
                        <RadioGroupItem value="online" />
                        <p className="text-m-1 text-gray-project-90">Карткою онлайн</p>
                      </div>
                      <div className="flex gap-3 items-center justify-center">
                        <div className="flex items-center justify-center w-[48px] h-[26px]"><Visa /></div>
                        <div className="flex items-center justify-center w-[48px] h-[26px]"><MasterCard /></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full py-5 px-6 border border-gray-project-30 rounded-[8px]">
                      <RadioGroupItem value="cash" />
                      <p className="text-m-1 text-gray-project-90">Оплата при отриманні</p>
                    </div>
                  </RadioGroup>
                </WrapInput>
              </div>
            </section>

            <section className="gap-5 flex flex-col w-full">
              <h4 className="header-4 text-gray-project-100">Додаткова інформація (необов'язково)</h4>
              <WrapInput title="Примітки до замовлення" error={formik.errors.additionalInfo}>
                <Textarea value={formik.values.additionalInfo} name="additionalInfo" autoComplete="additionalInfo" onChange={formik.handleChange} onBlur={formik.handleBlur} maxLength={1000} placeholder="Примітки щодо вашого замовлення" />
              </WrapInput>
              <div className="flex gap-2 items-center w-full">
                <Checkbox checked={formik.values.isCall} name="isCall" onCheckedChange={(v) => formik.setFieldValue("isCall", v)} />
                <p className="text-m-1 text-gray-project-90">Підтверджую замовлення, не передзвонюйте мені</p>
              </div>
            </section>
          </form>

          <div className="flex flex-col border border-gray-project-30 rounded-[16px] py-6 px-4 gap-8 w-full xl:max-w-[495px] h-auto">
            <ul className="w-full flex flex-col gap-4">
              {basket.length ? (
                basket.map((product, key) => (
                  <CardProductCart variant="checkout" product={product} key={key} />
                ))
              ) : (
                <p className="header-4 w-full text-center">В кошику немає товару</p>
              )}
            </ul>
            <h4 className="header-4 text-gray-project-90 text-center xl:text-left w-full">
              Сума замовлення:
            </h4>
            <CardGeneralPrice variant="checkout" />
            {error && <p className="text-r-3 text-red-project-50 text-center">{error}</p>}
            <div className="flex w-full items-center justify-center">
              <Button
                disabled={!formik.isValid || !formik.dirty || loading || basket.length === 0}
                onClick={formik.submitForm}
                className="max-w-none md:max-w-[278px] xl:max-w-none w-full"
              >
                ОФОРМИТИ ЗАМОВЛЕННЯ
                {loading && <Loader className="stroke-gray-project-40 ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardMain>
  );
}

const initialValues: TFormikValuesCheckout = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: {
    type: "novapost",
    delivery: { type: "department", city: "", office: "" },
  },
  payments: "online",
  additionalInfo: "",
  isCall: false,
};
