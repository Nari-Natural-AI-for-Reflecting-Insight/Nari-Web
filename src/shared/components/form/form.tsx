import { ComponentProps, ComponentPropsWithRef, ReactNode, useId } from 'react';
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  FormProvider,
  Control as ReactHookFormControl,
} from 'react-hook-form';
import { createSafeContext } from '@/shared/libs/react/createSafeContext';

export const Root = FormProvider;

/* -------------------------------------------------------------------------------------------------
 * FormField
 * -----------------------------------------------------------------------------------------------*/

type FormFieldContextValue = {
  id: string;
};

const [FormFieldProvider, useFormFieldContext] =
  createSafeContext<FormFieldContextValue>('FormField');

export const Field = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName> & {
    control: ReactHookFormControl<TFieldValues>;
  },
) => {
  const id = useId();

  return (
    <FormFieldProvider value={{ id }}>
      <Controller {...props} />
    </FormFieldProvider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * FormLabel
 * -----------------------------------------------------------------------------------------------*/
type FormLabelProps = ComponentProps<'label'> & {
  children: ReactNode;
};

export const Label = (props: FormLabelProps) => {
  const { children, ...restProps } = props;
  const { id } = useFormFieldContext();

  return (
    <label htmlFor={id} {...restProps}>
      {children}
    </label>
  );
};

/* -------------------------------------------------------------------------------------------------
 * FormControl
 * -----------------------------------------------------------------------------------------------*/
export const Control = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: ComponentPropsWithRef<'input'> & {
    field: ControllerRenderProps<TFieldValues, TName>;
  },
) => {
  const { id } = useFormFieldContext();

  return (
    <input
      className="bg-[#60554F] max-w-[371px] w-full h-14 text-[#AAAAAA] rounded-4xl px-6 py-3 outline-none focus:border-[#FF7500] border border-[#60554F] focus:bg-[#824427] focus:text-white"
      id={id}
      {...props}
      {...props.field}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * FormErrorMessage
 * -----------------------------------------------------------------------------------------------*/

type FormErrorMessageProps = {
  errorMessage?: string;
};

export const ErrorMessage = ({ errorMessage }: FormErrorMessageProps) => {
  const { id } = useFormFieldContext();
  if (!errorMessage) {
    return null;
  }

  return (
    <p id={`${id}-error`} className="text-red-500 text-xs text-center w-full">
      {errorMessage}
    </p>
  );
};
