import type { ChangeEvent, ReactNode, Ref, RefAttributes } from 'react'
import { forwardRef } from 'react'
import { Avatar, Box, MenuItem, TextField, useForkRef } from '@mui/material'
import { Image as ImageIcon } from '@mui/icons-material' // default img icon
import type { TextFieldProps } from '@mui/material'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  UseControllerProps,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import { useFormError } from './FormErrorProvider'
import { useTransform } from './useTransform'

export type SelectElementWithIconProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends Record<string, any> = Record<string, any>,
> = Omit<TextFieldProps, 'name' | 'type' | 'onChange'> & {
  rules?: UseControllerProps<TFieldValues, TName>['rules']
  name: TName
  options?: TValue[]
  valueKey?: string
  labelKey?: string
  logoKey?: string
  type?: 'string' | 'number'
  parseError?: (error: FieldError) => ReactNode
  objectOnChange?: boolean
  onChange?: (value: any) => void
  renderOption?: (item: TValue, selected: boolean) => ReactNode
  renderValue?: (selected: TValue | string | number | undefined) => ReactNode
  control?: Control<TFieldValues>
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue
    output?: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => PathValue<TFieldValues, TName>
  }
}

type SelectElementWithIconComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends Record<string, any> = Record<string, any>,
>(
  props: SelectElementWithIconProps<TFieldValues, TName, TValue> &
    RefAttributes<HTMLDivElement>
) => JSX.Element

const SelectElementWithIcon = forwardRef(function SelectElementWithIcon<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends Record<string, any> = Record<string, any>,
>(
  props: SelectElementWithIconProps<TFieldValues, TName, TValue>,
  ref: Ref<HTMLDivElement>
) {
  const {
    name,
    required,
    valueKey = 'id',
    labelKey = 'label',
    logoKey = 'logoUrl',
    options = [],
    parseError,
    type,
    objectOnChange,
    rules = {},
    control,
    inputRef,
    transform,
    onBlur,
    ...rest
  } = props

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn
  const isNativeSelect = !!rest.SelectProps?.native

  const rulesTmp = {
    ...rules,
    ...(required &&
      !rules.required && {
      required: 'This field is required',
    }),
  }

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules: rulesTmp,
    disabled: rest.disabled,
    control,
  })

  const { value, onChange } = useTransform<
    TFieldValues,
    TName,
    TValue extends string | number | undefined ? TValue : never
  >({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
        typeof transform?.input === 'function'
          ? transform.input
          : (value) => {
            return value?.[valueKey] ?? value ?? ('' as unknown as TValue)
          },
      output:
        typeof transform?.output === 'function'
          ? transform.output
          : (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            let value: string | number = event.target.value
            if (type === 'number' && value) {
              value = Number(value)
            }
            return value as PathValue<TFieldValues, TName>
          },
    },
  })

  const handleInputRef = useForkRef(field.ref, inputRef)

  // handle shrink on number input fields
  if (type === 'number' && typeof value !== 'undefined') {
    rest.slotProps = {
      ...rest.slotProps,
      inputLabel: {
        ...(rest.slotProps?.inputLabel ?? {}),
        shrink: true,
      },
    }
  }

  return (
    <TextField
      {...rest}
      name={name}
      value={value}
      onBlur={(event) => {
        field.onBlur()
        if (typeof onBlur === 'function') {
          onBlur(event)
        }
      }}
      ref={ref}
      onChange={(event) => {
        onChange(event)
        if (typeof rest.onChange === 'function') {
          let val: string | number | TValue | undefined = event.target.value
          if (type === 'number' && val) {
            val = Number(val)
          }
          if (objectOnChange) {
            val = options.find(
              (i) => (i as Record<string, any>)[valueKey] === val
            )
          }
          rest.onChange(val)
        }
      }}
      select
      sx={{
        '& .MuiSelect-icon': {
          color: (theme) => theme.palette.text.secondary,
        },
      }}
      required={required}
      error={!!error}
      helperText={
        error
          ? typeof customErrorFn === 'function'
            ? customErrorFn(error)
            : error.message
          : rest.helperText
      }
      inputRef={handleInputRef}
      SelectProps={{
        renderValue: (selected: any) => {
          if (!selected) return ''
          const selectedItem = options.find(
            (i) =>
              (i as Record<string, any>)[valueKey] === selected ||
              (i as Record<string, any>) === selected
          )
          if (!selectedItem) return selected
          return (selectedItem as Record<string, any>)[labelKey] // ✅ only label text
        },
      }}
    >
      {isNativeSelect && <option />}
      {options.map((item) => {
        const optionValue =
          typeof item === 'object' && item !== null && valueKey in item
            ? (item as Record<string, any>)[valueKey]
            : item

        const optionLabel =
          typeof item === 'object' && item !== null && labelKey in item
            ? (item as Record<string, any>)[labelKey]
            : item

        const optionLogo =
          typeof item === 'object' && item !== null && logoKey in item
            ? (item as Record<string, any>)[logoKey]
            : undefined

        const key = `${name}_${optionValue}`

        return isNativeSelect ? (
          <option key={key} value={optionValue}>
            {optionLabel}
          </option>
        ) : (
          <MenuItem key={key} value={optionValue}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {optionLogo ? (
                <Avatar src={optionLogo} sx={{ width: 24, height: 24, mr: 1 }} />
              ) : (
                <ImageIcon sx={{ width: 24, height: 24, mr: 1 }} />
              )}
              {optionLabel}
            </Box>
          </MenuItem>
        )
      })}
    </TextField>
  )
})

SelectElementWithIcon.displayName = 'SelectElementWithIcon'
export default SelectElementWithIcon as SelectElementWithIconComponent
