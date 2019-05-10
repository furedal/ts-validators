import { ValidatorFuncProps, ValidatorOptionProps } from './ValidatorProps'
import { tx } from '~libs/i18n'

export interface IRequiredValidatorOptions extends ValidatorOptionProps {
  errorName: string
}

export const RequiredValidator: ValidatorFuncProps = (
  value: string,
  { errorName }: IRequiredValidatorOptions,
) => {
  const normStrValue = value || ''

  let valid = true
  let error: string

  if (!normStrValue.length) {
    valid = false
    error = tx('validators.missing', {
      name: errorName || 'undefined',
    })
  }

  return { valid, error }
}
