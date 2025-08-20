import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const errorZodMain = {
  invalid_type_error: "Неправильний тип данних",
  required_error: "Поле обов'язкове",
};

const departmentDeliverySchema = z.object({
  type: z.literal("department"),
  city: z.string(errorZodMain).min(1, "Вкажіть місто"),
  office: z.string(errorZodMain).min(1, "Вкажіть відділення"),
});

const courierDeliverySchema = z.object({
  type: z.literal("courier"),
  country: z.string(errorZodMain).min(1, "Вкажіть країну"),
  city: z.string(errorZodMain).min(1, "Вкажіть місто"),
  address: z.string(errorZodMain).min(1, "Вкажіть адресу"),
  postIndex: z.string(errorZodMain).min(1, "Вкажіть поштовий індекс"),
});

const deliverySchema = z.discriminatedUnion("type", [
  departmentDeliverySchema,
  courierDeliverySchema,
]);

const addressSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("novapost"),
    delivery: deliverySchema,
  }),
  z.object({
    type: z.literal("ukrpost"),
    delivery: deliverySchema,
  }),
]);

const formSchema = z.object({
  name: z.string(errorZodMain).min(1, "Вкажіть ім'я"),
  surname: z.string(errorZodMain).min(1, "Вкажіть прізвище"),
  email: z.string(errorZodMain).email("Невірний email"),
  phone: z.string(errorZodMain).min(5, "Невірний номер телефону"),
  address: addressSchema,
  payments: z.enum(["online", "cash"], errorZodMain),
  additionalInfo: z.string(errorZodMain).optional(),
  isCall: z.boolean(errorZodMain).default(false),
});

export const validationSchemaCheckout = toFormikValidationSchema(formSchema);

export type TFormikValuesCheckout = z.infer<typeof formSchema>;
