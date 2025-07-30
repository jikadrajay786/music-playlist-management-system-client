import type { ReactNode } from "react";
import { FormProvider, type FieldValues, type UseFormReturn } from "react-hook-form";

type RHFFormProviderProps<T extends FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
};

const RHFFormProvider = <T extends FieldValues>({
  children,
  methods,
  onSubmit,
}: RHFFormProviderProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

export default RHFFormProvider;
