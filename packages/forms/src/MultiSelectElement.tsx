import CloseIcon from '@mui/icons-material/Cancel'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  UseControllerProps,
} from 'react-hook-form'
import { useController } from 'react-hook-form'
import {
  Checkbox,
  Chip,
  FormControl,
  type FormControlProps,
  FormHelperText,
  InputLabel,
  type InputLabelProps,
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
  type SelectProps,
  useForkRef,
} from '@mui/material'
import { useFormError } from './FormErrorProvider'
import type { ReactNode, Ref, RefAttributes } from 'react'
import { forwardRef } from 'react'
import { useTransform } from './useTransform'

export type MultiSelectElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends Record<string, unknown> = Record<string, unknown>, // <-- add constraint
> = Omit<SelectProps, 'value'> & {
  options: TValue[]
  label?: string
  itemKey?: string
  itemValue?: string
  itemLabel?: string
  required?: boolean
  rules?: UseControllerProps<TFieldValues, TName>['rules']
  name: TName
  parseError?: (error: FieldError) => ReactNode
  minWidth?: number
  menuMaxHeight?: number
  menuMaxWidth?: number
  helperText?: ReactNode
  showChips?: boolean
  preserveOrder?: boolean
  control?: Control<TFieldValues>
  showCheckbox?: boolean
  formControlProps?: Omit<FormControlProps, 'fullWidth' | 'variant'>
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue[]
    output?: (
      event: SelectChangeEvent<unknown>,
      child: ReactNode
    ) => PathValue<TFieldValues, TName>
  }
  inputLabelProps?: Omit<InputLabelProps, 'htmlFor' | 'required'>
}

type MultiSelectElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends Record<string, unknown> = Record<string, unknown>, // <-- add constraint
>(
  props: MultiSelectElementProps<TFieldValues, TName, TValue> &
    RefAttributes<HTMLDivElement>
) => JSX.Element

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MultiSelectElement = forwardRef(function MultiSelectElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends Record<string, unknown> = Record<string, unknown>, // <-- add constraint
>(
  props: MultiSelectElementProps<TFieldValues, TName, TValue>,
  ref: Ref<HTMLDivElement>
) {
  const {
    onBlur,
    options,
    label = '',
    itemKey = 'id',
    itemValue = '',
    itemLabel = 'label',
    required = false,
    rules = {},
    parseError,
    name,
    menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    menuMaxWidth = 250,
    minWidth = 120,
    helperText,
    showChips,
    preserveOrder,
    control,
    showCheckbox,
    formControlProps,
    inputRef,
    transform,
    inputLabelProps,
    ...rest
  } = props

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const renderLabel = (item: any) =>
    options.find((op) => {
      const optionVal = (op as Record<string, any>)[itemValue || itemKey] ?? op
      return optionVal === item
    })?.[itemLabel as keyof TValue] ?? item

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

  const { value, onChange } = useTransform<TFieldValues, TName, TValue[]>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
        typeof transform?.input === 'function'
          ? transform.input
          : (value) => {
            return Array.isArray(value)
              ? value
              : ([] as PathValue<TFieldValues, TName>)
          },
      output: transform?.output,
    },
  })

  const handleInputRef = useForkRef(field.ref, inputRef)

  const renderHelperText = error
    ? typeof customErrorFn === 'function'
      ? customErrorFn(error)
      : error.message
    : helperText

  return (
    <FormControl
      {...formControlProps}
      style={{
        minWidth,
        ...formControlProps?.style,
      }}
      variant={rest.variant}
      fullWidth={rest.fullWidth}
      error={!!error}
      size={rest.size}
      ref={ref}
    >
      {label && (
        <InputLabel
          {...inputLabelProps}
          size={rest.size === 'small' ? 'small' : inputLabelProps?.size}
          error={!!error}
          htmlFor={rest.id || `select-multi-select-${name}`}
          required={required}
        >
          {label}
        </InputLabel>
      )}
      <Select
        {...rest}
        id={rest.id || `select-multi-select-${name}`}
        multiple
        label={label || undefined}
        error={!!error}
        value={value}
        required={required}
        onChange={onChange}
        onBlur={(event) => {
          field.onBlur()
          if (typeof onBlur === 'function') {
            onBlur(event)
          }
        }}
        MenuProps={{
          ...rest.MenuProps,
          slotProps: {
            ...rest.MenuProps?.slotProps,
            paper: {
              ...((rest.MenuProps?.slotProps?.paper as any) ?? {}),
              sx: {
                // Access darkPaper from theme.palette.background.default (see your palette setup)
                backgroundColor: (theme) => theme.palette.background.default,
                // You can add other styles here
                ...(rest.MenuProps?.slotProps?.paper as any)?.sx,
              },
            },
          },
        }}
        renderValue={
          typeof rest.renderValue === 'function'
            ? rest.renderValue
            : showChips
              ? (selected) => (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {(preserveOrder
                    ? options.filter((option) =>
                      (selected as any[]).includes(option)
                    )
                    : (selected as any[]) || []
                  ).map((selectedValue) => (
                    <Chip
                      key={selectedValue}
                      label={renderLabel(selectedValue)}
                      style={{ display: 'flex', flexWrap: 'wrap' }}
                      onDelete={() => {
                        onChange(
                          (Array.isArray(value) ? value : []).filter(
                            (i: any) => i !== selectedValue
                          )
                        )
                      }}
                      deleteIcon={
                        <CloseIcon
                          onMouseDown={(ev) => {
                            ev.stopPropagation()
                          }}
                        />
                      }
                    />
                  ))}
                </div>
              )
              : (selected) =>
                Array.isArray(selected)
                  ? selected.map(renderLabel).join(', ')
                  : ''
        }
        inputRef={handleInputRef}
      >
        {options.map((item) => {
          const val: string | number = typeof item === 'object' && item !== null
            ? (item as Record<string, any>)[itemValue || itemKey]
            : item
          const isChecked = Array.isArray(value)
            ? value.some((v) => v === (val as unknown as TValue))
            : false
          return (
            <MenuItem
              key={val}
              value={val}
              sx={{
                fontWeight: (theme) =>
                  isChecked
                    ? theme.typography.fontWeightBold
                    : theme.typography.fontWeightRegular,
              }}
            >
              {showCheckbox && <Checkbox checked={isChecked} />}
              <ListItemText primary={(item as Record<string, any>)[itemLabel] || item} />
            </MenuItem>
          )
        })}
      </Select>
      {renderHelperText && (
        <FormHelperText error={!!error}>{renderHelperText}</FormHelperText>
      )}
    </FormControl>
  )
})
MultiSelectElement.displayName = 'MultiSelectElement'
export default MultiSelectElement as MultiSelectElementComponent
