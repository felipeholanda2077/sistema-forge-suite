import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/Toast/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

type ToastContent = string | { title?: string; description?: string; variant?: 'default' | 'destructive' };

type PromiseData<T = unknown> = {
  loading: string | React.ReactNode;
  success: string | ((data: T) => string | { title?: string; description?: string });
  error: string | ((error: Error) => string | { title?: string; description?: string });
};

interface ToastReturn {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}

interface ToastWithPromise extends ToastReturn {
  promise: <T>(promise: Promise<T>, data: PromiseData<T>) => { id: string; dismiss: () => void };
}

function createToast({ ...props }: Toast): ToastReturn {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

// Type assertion to add promise method to toast function
const toast = createToast as unknown as ToastWithPromise;

toast.promise = <T,>(
  promise: Promise<T>,
  data: PromiseData
) => {
  const id = genId();
  
  // Show loading state
  dispatch({
    type: "ADD_TOAST",
    toast: {
      id,
      title: typeof data.loading === 'string' ? data.loading : 'Loading...',
      description: typeof data.loading === 'string' ? undefined : data.loading,
      open: true,
    },
  });

  // Handle promise resolution/rejection
  promise
    .then((response) => {
      const successData = typeof data.success === 'function' 
        ? data.success(response)
        : data.success;
      
      const toastData = (() => {
        if (typeof successData === 'string') {
          return { title: successData };
        } else if (typeof successData === 'object' && successData !== null) {
          return { 
            title: 'title' in successData ? String(successData.title) : 'Success',
            description: 'description' in successData ? String(successData.description) : undefined
          };
        }
        return { title: 'Success', description: String(successData) };
      })();
      
      dispatch({
        type: "UPDATE_TOAST",
        toast: {
          id,
          title: toastData.title,
          description: toastData.description,
          variant: 'default' as const,
        },
      });
    })
    .catch((error) => {
      const errorData = typeof data.error === 'function'
        ? data.error(error)
        : data.error;
      
      const toastError = (() => {
        if (typeof errorData === 'string') {
          return { title: 'Error', description: errorData };
        } else if (typeof errorData === 'object' && errorData !== null) {
          return { 
            title: 'title' in errorData ? String(errorData.title) : 'Error',
            description: 'description' in errorData ? String(errorData.description) : 'An error occurred'
          };
        }
        return { title: 'Error', description: String(errorData) };
      })();
      
      dispatch({
        type: "UPDATE_TOAST",
        toast: {
          id,
          title: toastError.title,
          description: toastError.description,
          variant: 'destructive' as const,
        },
      });
    });

  return {
    id,
    dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
  };
};

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
