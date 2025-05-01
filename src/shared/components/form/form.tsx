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
    <label htmlFor={id} {...restProps} className="text-sm">
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
      className="border rounded border-gray-200"
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
  if (!errorMessage) {
    return null;
  }
  return <p className="text-red-500 text-sm">{errorMessage}</p>;
};
