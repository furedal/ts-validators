export type ValidatorOptionProps = { [key: string]: any }

export type ValidatorFuncProps = (
  string,
  options: ValidatorOptionProps,
) => { valid: boolean; error?: string }

export interface ValidatorProps {
  func: ValidatorFuncProps
  options: ValidatorOptionProps
}
