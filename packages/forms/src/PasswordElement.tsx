import type { MouseEvent, ReactNode, Ref, RefAttributes } from 'react'
import { forwardRef, useState } from 'react'
import type { TextFieldElementProps } from './TextFieldElement'
import TextFieldElement from './TextFieldElement'
import type { IconButtonProps } from '@mui/material'
import { IconButton, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import type { FieldPath, FieldValues } from 'react-hook-form'

export type PasswordElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown,
> = TextFieldElementProps<TFieldValues, TName, TValue> & {
  iconColor?: IconButtonProps['color']
  renderIcon?: (password: boolean) => ReactNode
}

type PasswordElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: PasswordElementProps<TFieldValues, TName> &
    RefAttributes<HTMLDivElement>
) => JSX.Element

const PasswordElement = forwardRef(function PasswordEl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown,
>(
  props: PasswordElementProps<TFieldValues, TName, TValue>,
  ref: Ref<HTMLDivElement>
) {
  const {
    iconColor,
    renderIcon = (password) =>
      password ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />,
    InputProps = {},
    slotProps,
    autoComplete = 'new-password',
    variant = 'outlined',
    ...rest
  } = props

  const [password, setPassword] = useState<boolean>(true)

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label={password ? 'Hide password' : 'Show password'}
        onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
        onClick={() => setPassword(!password)}
        tabIndex={-1}
        color={iconColor ?? 'default'}
        size="small"
        disableRipple
        sx={{ p: 0.5 }}
      >
        {renderIcon(password)}
      </IconButton>
    </InputAdornment>
  )

  const mergedInputProps = {
    endAdornment,
    disableUnderline: true,
    ...InputProps,
  }

  return (
    <TextFieldElement
      {...(rest as TextFieldElementProps)}
      ref={ref}
      type={password ? 'password' : 'text'}
      autoComplete={autoComplete}
      variant={variant}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          height: '40px', // Match your SelectElement height
          paddingRight: 1,
          '& fieldset': {
            borderColor: '#ccc',
            borderWidth: 1,
          },
          '&:hover fieldset': {
            borderColor: '#aaa',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#888',
          },
          '& input': {
            padding: '10.5px 14px',
          },
        },
      }}
      {...(typeof slotProps === 'undefined'
        ? {
            InputProps: mergedInputProps,
          }
        : {
            slotProps: {
              ...slotProps,
              input: {
                ...mergedInputProps,
                ...slotProps?.input,
              },
            } as TextFieldElementProps['slotProps'],
          })}
    />
  )
})

PasswordElement.displayName = 'PasswordElement'
export default PasswordElement as PasswordElementComponent


