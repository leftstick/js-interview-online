import { useSize } from '@umijs/hooks'

export default function() {
  const [{ width, height }] = useSize(document.body)

  return {
    width,
    height
  }
}
