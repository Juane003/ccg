import * as z from "zod";
import type { TryCatchResult } from "./tryCatch";

type ZodExtends = Readonly<{
  [k: string]: z.core.$ZodType<
    unknown,
    unknown,
    z.core.$ZodTypeInternals<unknown, unknown>
  >;
}>;

type CreateServerFn<T extends ZodExtends, E = Error> = {
  schema: z.ZodObject<T>;
  action: (
    initialData: unknown,
    formData: FormData,
  ) => Promise<TryCatchResult<T, E>>;
  onSuccess: (data: T) => void;
  onError: (error: E) => void;
};

export const createServerFn = <
  T extends Readonly<{
    [k: string]: z.core.$ZodType<
      unknown,
      unknown,
      z.core.$ZodTypeInternals<unknown, unknown>
    >;
  }>,
  E = Error,
>({
  schema,
  action,
  onSuccess,
  onError,
}: CreateServerFn<T, E>) => {
  return async (_initialData: unknown, formData: FormData) => {
    const data = formDataExtractor({ formData, schema });

    const validatedData = schema.safeParse(data);

    if (!validatedData.success) {
      onError(validatedData.error as E);
      return {
        error: validatedData.error,
        data: null,
      };
    }

    const result = await action(validatedData.data, formData);

    return result;
  };
};

type FormDataExtractor<T extends ZodExtends> = {
  formData: FormData;
  schema: z.ZodObject<T>;
};

const formDataExtractor = <T extends ZodExtends>({
  formData,
  schema,
}: FormDataExtractor<T>) => {
  const schemaKeys = schema.keyof().def.type;
  const keys = Object.keys(schemaKeys);

  return keys.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: formData.get(curr),
    };
  }, {});
};
