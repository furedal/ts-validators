import { ValidatorFuncProps, ValidatorOptionProps } from './ValidatorProps'
import { tx } from '~libs/i18n'

export interface IBooleanValidatorOptions extends ValidatorOptionProps {
  errorName: string
  value: string
}

export const BooleanValidator: ValidatorFuncProps = (
  inputValue: string,
  { errorName, value }: IBooleanValidatorOptions,
) => {
  const normStrValue = inputValue || ''

  let valid = true
  let error: string

  if (!normStrValue) {
    valid = false
    error = tx('validators.missing', {
      name: errorName,
    })
  }

  if (normStrValue !== value) {
    valid = false
  }

  return { valid, error }
}
