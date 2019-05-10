import { ValidatorFuncProps, ValidatorOptionProps } from './ValidatorProps'
import { tx } from '~libs/i18n'

export interface IUUID4ValidatorOptions extends ValidatorOptionProps {
  errorName: string
}

export const UUID4Validator: ValidatorFuncProps = (
  value: string,
  { errorName }: IUUID4ValidatorOptions,
) => {
  const norm = value || ''

  let valid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
    norm,
  )
  let error: string

  if (!valid) {
    error = tx('validators.invalid', { name: errorName })
  }

  return { valid, error }
}
