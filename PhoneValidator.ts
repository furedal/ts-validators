import { ValidatorFuncProps, ValidatorOptionProps } from './ValidatorProps'
import { tx } from '~libs/i18n'

export interface IPhoneValidatorOptions extends ValidatorOptionProps {
  errorName: string
}

export const PhoneValidator: ValidatorFuncProps = (
  value: string,
  { errorName }: IPhoneValidatorOptions,
) => {
  let valid = true
  let error: string

  let minLength = 9
  let maxLength = 15

  let norm = value ? value.replace(/[^0-9+]/g, '') : ''
  if (norm.startsWith('00')) {
    norm = norm.replace('00', '+')
  }

  if (norm.startsWith('+')) {
    minLength += 3
    maxLength += 3
  }

  if (!value) {
    valid = false
    error = tx('validators.missing', {
      name: errorName,
    })
  } else if (norm.length < minLength) {
    valid = false
    error = tx('validators.digits_missing', {
      name: errorName,
    })
  } else if (norm.length > maxLength) {
    valid = false
    error = tx('validators.digits_to_many', {
      name: errorName,
    })
  }

  return { valid, error }
}
