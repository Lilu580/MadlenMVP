import { FormikProps } from "formik";
import { WrapInput } from "@/components/ui/wrap-input";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TDelivery } from "@/lib/types";
import { getFieldError } from "@/lib/utils";
import { TFormikValuesCheckout } from "@/lib/validation";

interface Props {
  formik: FormikProps<TFormikValuesCheckout>;
}

export function CourierFields({ formik }: Props) {
  const { values, errors, setFieldValue, handleChange, handleBlur } = formik;
  const delivery = values.address.delivery as Extract<
    TDelivery,
    { type: "courier" }
  >;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <WrapInput
          title="Країна*"
          error={getFieldError(errors.address?.delivery as never, "country")}
        >
          <Select
            value={delivery.country}
            onValueChange={(v) => setFieldValue("address.delivery.country", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Оберіть вашу країну" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ukraine">Ukraine</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
            </SelectContent>
          </Select>
        </WrapInput>

        <WrapInput
          title="Місто*"
          error={getFieldError(errors.address?.delivery as never, "city")}
        >
          <Select
            value={delivery.city}
            onValueChange={(v) => setFieldValue("address.delivery.city", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Оберіть ваше місто" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="odessa">Odessa</SelectItem>
              <SelectItem value="kiev">Kiev</SelectItem>
            </SelectContent>
          </Select>
        </WrapInput>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <WrapInput
          title="Адреса*"
          error={getFieldError(errors.address?.delivery as never, "address")}
        >
          <Input
            value={delivery.address}
            name="address.delivery.address"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ваша адреса"
          />
        </WrapInput>

        <WrapInput
          title="Поштовий індекс*"
          error={getFieldError(errors.address?.delivery as never, "postIndex")}
        >
          <Input
            value={delivery.postIndex}
            name="address.delivery.postIndex"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ваш поштовий індекс"
          />
        </WrapInput>
      </div>
    </div>
  );
}
