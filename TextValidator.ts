import { ValidatorFuncProps, ValidatorOptionProps } from './ValidatorProps'

export interface ITextValidatorOptions extends ValidatorOptionProps {
  errorMessage: string
  min?: number
  max?: number
}

export const TextValidator: ValidatorFuncProps = (
  value: string,
  { errorMessage, min }: ITextValidatorOptions,
) => {
  const normStrValue = value || ''
  const nrChars = normStrValue.length

  let valid = true
  let error: string

  if (min && min > nrChars) {
    valid = false
    error = errorMessage
  }

  return { valid, error }
}
