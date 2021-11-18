export function destoryGlobalSpinner() {
  const splash = document.querySelector('#splash-spinner')
  const spinner = document.querySelector('.spinner')
  if (splash) {
    document.head.removeChild(splash)
  }
  if (spinner && spinner.parentNode) {
    spinner.parentNode.removeChild(spinner)
  }
}

export function exportAnswers() {
  const len = sessionStorage.length
  const anwsersText = new Array(len).fill(null).reduce((prev, cur, i) => {
    const key = sessionStorage.key(i)
    const content = sessionStorage.getItem(key!)
    return prev + '\n' + key + '\n' + content + '\n'
  }, '')

  const aLink = document.createElement('a')
  aLink.href = `data:application/octet-stream;charset=utf-16le;base64,${btoa(
    unescape(encodeURIComponent(anwsersText))
  )}`
  aLink.download = 'coupang_exam_answers.txt'
  aLink.click()
}
