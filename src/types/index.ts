interface ESM<T> {
  default: T
}

export interface IExam {
  id: string
  title: string
  getExamInitial: () => Promise<ESM<string>>
  contentRegexp: RegExp
  getTestcases: () => Promise<ESM<string[]>>
}
