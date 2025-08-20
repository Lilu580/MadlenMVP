import { FormikProps } from "formik";
import { WrapInput } from "@/components/ui/wrap-input";
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

export function DepartmentFields({ formik }: Props) {
  const { values, errors, setFieldValue } = formik;
  const delivery = values.address.delivery as Extract<
    TDelivery,
    { type: "department" }
  >;

  return (
    <div className="flex md:flex-row flex-col gap-4 w-full">
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

      <WrapInput
        title="Відділення*"
        error={getFieldError(errors.address?.delivery as never, "office")}
      >
        <Select
          value={delivery.office}
          onValueChange={(v) => setFieldValue("address.delivery.office", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Оберіть відділення" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="odessa">Odessa</SelectItem>
            <SelectItem value="kiev">Kiev</SelectItem>
          </SelectContent>
        </Select>
      </WrapInput>
    </div>
  );
}
