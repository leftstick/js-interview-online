export enum CASE_STATUS {
  NOT_EXECUTED,
  EXECUTING,
  EXEC_SUCCESS,
  EXEC_FAILED
}

interface ESM<T> {
  default: T
}

export interface IExamRaw {
  id: string
  title: string
  contentRegexp: RegExp
  getExamInitial: () => Promise<ESM<string>>
  getTestcases: () => Promise<ESM<string[]>>
}

export interface ITestcase {
  content: string
  status: CASE_STATUS
}

export interface IExam {
  id: string
  title: string
  code: string
  contentRegexp: RegExp
  testcases: ITestcase[]
}

export function defineExamRaw(examRaw: IExamRaw) {
  return examRaw
}
