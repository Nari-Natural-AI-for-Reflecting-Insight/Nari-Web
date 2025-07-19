import { ComponentProps, useId } from 'react';
import {
  Controller,
  FormProvider,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/shared/libs/cn';
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
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
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
export const Label = (props: ComponentProps<'label'>) => {
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
export const Control = (props: ComponentProps<typeof Slot>) => {
  const { id } = useFormFieldContext();

  return <Slot id={id} {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * FormErrorMessage
 * -----------------------------------------------------------------------------------------------*/
type FormErrorMessageProps = {
  errorMessage?: string;
} & ComponentProps<'p'>;

export const ErrorMessage = ({
  errorMessage,
  ...props
}: FormErrorMessageProps) => {
  const { id } = useFormFieldContext();

  return (
    <p
      id={`${id}-error`}
      className={cn(
        'text-red-500 text-xs text-right w-full pr-5 pt-1',
        props.className,
      )}
    >
      {errorMessage}
    </p>
  );
};
