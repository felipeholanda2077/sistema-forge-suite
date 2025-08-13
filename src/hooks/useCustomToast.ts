import * as React from "react"
import { ToastActionElement } from "@/components/ui/Toast/toast"
import { useToast } from "@/hooks/use-toast"

type ToastData = {
  title: string
  description?: string
  variant?: 'default' | 'destructive'
  action?: ToastActionElement
}

export function useCustomToast() {
  const { toast } = useToast()
  
  const showToast = React.useCallback(({ title, description, variant = 'default' }: ToastData) => {
    // The toast function is actually an object with a 'default' method
    // that we can call to show a toast
    const toastFn = toast as unknown as {
      (props: { title: string; description?: string; variant?: 'default' | 'destructive' }): void
      default: (props: { title: string; description?: string; variant?: 'default' | 'destructive' }) => void
    }
    
    // Create the toast props
    const toastProps = {
      title,
      ...(description && { description }),
      variant,
    };
    
    // Use the default method if it exists, otherwise call toast directly
    if (typeof toastFn.default === 'function') {
      toastFn.default(toastProps);
    } else if (typeof toastFn === 'function') {
      toastFn(toastProps);
    }
  }, [toast])
  
  return { showToast }
}
