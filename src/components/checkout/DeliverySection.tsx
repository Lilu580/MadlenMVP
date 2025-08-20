import { FormikProps } from "formik";
import { RadioGroup } from "@/components/ui/radio-group";
import { WrapInput } from "@/components/ui/wrap-input";
import { DeliveryOption } from "./DeliveryOption";
import { DeliveryTypeSwitcher } from "./DeliveryTypeSwitcher";
import { getFieldError } from "@/lib/utils";
import { TFormikValuesCheckout } from "@/lib/validation";

interface Props {
  formik: FormikProps<TFormikValuesCheckout>;
}

export function DeliverySection({ formik }: Props) {
  const { values, errors, setFieldValue } = formik;

  return (
    <section className="gap-5 flex flex-col w-full">
      <h4 className="header-4 text-gray-project-100">Спосіб доставки</h4>

      <WrapInput error={getFieldError(errors.address as never, "type")}>
        <RadioGroup
          value={values.address.type}
          onValueChange={(v) => setFieldValue("address.type", v)}
        >
          <div className="flex flex-col w-full gap-4">
            <DeliveryOption
              value={"novapost"}
              label="Нова Пошта"
              subtitle="2-4 дні"
              open={values.address.type === "novapost"}
            >
              <DeliveryTypeSwitcher formik={formik} />
            </DeliveryOption>

            <DeliveryOption
              value={"ukrpost"}
              label="Укрпошта"
              subtitle="4-6 днів"
              open={values.address.type === "ukrpost"}
            >
              <DeliveryTypeSwitcher formik={formik} />
            </DeliveryOption>
          </div>
        </RadioGroup>
      </WrapInput>
    </section>
  );
}
