import { ValidatorFuncProps, ValidatorOptionProps } from './ValidatorProps'
import { tx } from '~libs/i18n'

export interface IPidnValidatorOptions extends ValidatorOptionProps {
  errorName: string
}

export const PidnValidator: ValidatorFuncProps = (
  value: string,
  { errorName }: IPidnValidatorOptions,
) => {
  let valid = true
  let error: string

  let minLength = 12

  let norm = value ? value.replace(/[^0-9]/g, '') : ''

  // Validate date-length
  if (!value) {
    valid = false
    error = tx('validators.missing', {
      name: errorName,
    })
  } else if (norm.length < minLength) {
    valid = false
    error = tx('validators.digit', {
      count: minLength - norm.length,
      name: errorName,
    })
  }

  if (valid) {
    // Validate date and luhn-algoritm
    const year = parseInt(norm.substr(0, 4), 10)
    const month = parseInt(norm.substr(4, 2), 10)
    const day = parseInt(norm.substr(6, 2), 10)
    const date = new Date()
    date.setFullYear(year, month - 1, day)

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day ||
      !checkLuhnAlgoritm(norm)
    ) {
      valid = false
      error = tx('validators.pidn')
    }
  }

  return { valid, error }
}

// Checks that the pidn conforms to the luhn-algoritm
const checkLuhnAlgoritm = value => {
  const digits = value.length === 12 ? value.substr(2) : value

  let sum = 0
  const parity = digits.length % 2
  for (let i = 0; i < digits.length; i = i + 1) {
    let digit = parseInt(digits.charAt(i), 10)
    if (i % 2 === parity) {
      digit *= 2
    }
    if (digit > 9) {
      digit -= 9
    }
    sum += digit
  }
  return sum % 10 === 0
}
