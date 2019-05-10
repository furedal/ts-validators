import { ValidatorFuncProps, ValidatorOptionProps } from './ValidatorProps'
import { tx } from '~libs/i18n'

const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export interface IEmailValidatorOptions extends ValidatorOptionProps {
  errorName: string
}

export const EmailValidator: ValidatorFuncProps = (
  value: string,
  { errorName }: IEmailValidatorOptions,
) => {
  let valid = true
  let error: string

  if (!value) {
    valid = false
    error = tx('validators.missing', {
      name: errorName,
    })
  } else if (!regexp.test(value)) {
    valid = false
    error = tx('validators.email')
  }

  return { valid, error }
}
