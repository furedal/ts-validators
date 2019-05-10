import { ValidatorFuncProps, ValidatorOptionProps } from './ValidatorProps'
import { tx } from '~libs/i18n'

export interface INumberValidatorOptions extends ValidatorOptionProps {
  minValue?: number
  maxValue?: number
  minDigits?: number
  maxDigits?: number
  errorName: string
}

export const NumberValidator: ValidatorFuncProps = (
  value: string,
  { minValue, maxValue, minDigits, maxDigits, errorName }: INumberValidatorOptions,
) => {
  const normStrValue = (value || '').replace(/\D/g, '')
  const digits = normStrValue.length
  const normIntValue = parseInt(normStrValue, 10)

  let valid = true
  let error: string

  if (isNaN(normIntValue)) {
    valid = false
    error = tx('validators.missing', {
      name: errorName,
    })
  } else if (minValue && normIntValue < minValue) {
    valid = false
    error = tx('validators.number_low', {
      value: Number(minValue).toLocaleString('sv'),
      name: errorName,
    })
  } else if (maxValue && normIntValue > maxValue) {
    valid = false
    error = tx('validators.number_high', {
      value: Number(maxValue).toLocaleString('sv'),
      name: errorName,
    })
  } else if (minDigits && minDigits > digits) {
    error = tx('validators.digit', {
      count: minDigits - digits,
      name: errorName,
    })
    valid = false
  } else if (maxDigits && maxDigits < digits) {
    error = tx('validators.digit_to_many', {
      count: digits - maxDigits,
      name: errorName,
    })
    valid = false
  }

  return { valid, error }
}
