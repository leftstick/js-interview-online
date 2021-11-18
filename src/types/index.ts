export enum CASE_STATUS {
  NOT_EXECUTED,
  EXECUTING,
  EXEC_SUCCESS,
  EXEC_FAILED,
}

export interface IExamRaw {
  id: string
  title: string
  contentRegexp: RegExp
  examQuestion: string
  testcases: string[]
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

export type CODE_SHARE_TYPE = 'CANDIDATE' | 'INTERVIEWER'

export type ICodeShareMessage =
  | { type: 'CANDIDATE_CONNECT' }
  | {
      type: 'CODE'
      data: { exam: string; code: string }
    }

export enum ICodeShareStatus {
  IDLE,
  CONNECTING,
  CONNECTED,
  CONNECT_FAILED,
}
