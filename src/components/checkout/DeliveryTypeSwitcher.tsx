import { FormikProps } from "formik";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DepartmentFields } from "./DepartmentFields";
import { CourierFields } from "./CourierFields";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React from "react";
import { TFormikValuesCheckout } from "@/lib/validation";

interface Props {
  formik: FormikProps<TFormikValuesCheckout>;
}

export function DeliveryTypeSwitcher({ formik }: Props) {
  const { values, setFieldValue } = formik;

  return (
    <RadioGroup
      value={values.address.delivery.type}
      onValueChange={(v) => setFieldValue("address.delivery.type", v)}
    >
      <Collapsible
        open={formik.values.address.delivery.type === "department"}
        className="flex w-full flex-col gap-4 pl-4"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-start justify-start gap-3">
            <RadioGroupItem
              value="department"
              className={"mt-0.5"}
              onClick={() => {
                formik.setFieldValue("address.delivery.city", "");
                formik.setFieldValue("address.delivery.country", "");
                formik.setFieldValue("address.delivery.address", "");
                formik.setFieldValue("address.delivery.postIndex", "");
              }}
            />
            <p className={"text-m-1 text-gray-project-90"}>У відділенні</p>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex w-full">
          <DepartmentFields formik={formik} />
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={formik.values.address.delivery.type === "courier"}
        className="flex w-full flex-col gap-4 pl-4"
      >
        <CollapsibleTrigger asChild>
          <div className="flex items-start justify-start gap-3">
            <RadioGroupItem
              value="courier"
              className={"mt-0.5"}
              onClick={() => {
                formik.setFieldValue("address.delivery.city", "");
                formik.setFieldValue("address.delivery.office", "");
              }}
            />
            <p className={"text-m-1 text-gray-project-90"}>
              Кур’єрська доставка
            </p>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex w-full">
          <CourierFields formik={formik} />
        </CollapsibleContent>
      </Collapsible>
    </RadioGroup>
  );
}
