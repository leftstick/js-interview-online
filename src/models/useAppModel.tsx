import { useCallback } from 'react'
import { useSize, useLocalStorageState } from 'ahooks'

export default function () {
  const { width, height } = useSize(document.body)
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorageState('sidebar-collapsed', false)

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((s) => !s)
  }, [setSidebarCollapsed])

  return {
    width,
    height,
    sidebarCollapsed,
    toggleSidebar,
  }
}
