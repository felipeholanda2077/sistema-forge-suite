import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/Toggle/toggle"

type ToggleGroupContextProps = VariantProps<typeof toggleVariants>

interface BaseToggleGroupProps {
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
}

// Create separate types for single and multiple toggle groups
type SingleToggleGroupProps = BaseToggleGroupProps & {
  type?: 'single'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
} & Omit<React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>, 'onValueChange' | 'type' | 'value' | 'defaultValue'>

type MultipleToggleGroupProps = BaseToggleGroupProps & {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
} & Omit<React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>, 'onValueChange' | 'type' | 'value' | 'defaultValue'>

type ToggleGroupProps = SingleToggleGroupProps | MultipleToggleGroupProps

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  size: "default",
  variant: "default",
})

// Create a type that properly handles the ref forwarding and props
type ToggleGroupComponent = React.ForwardRefExoticComponent<
  ToggleGroupProps & React.RefAttributes<HTMLDivElement>
>
// Create a type guard to check if props are for multiple selection
function isMultipleProps(props: ToggleGroupProps): props is MultipleToggleGroupProps {
  return props.type === 'multiple'
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(({ 
  className, 
  variant = "default",
  size = "default",
  children,
  onValueChange,
  type = 'single',
  value,
  defaultValue,
  ...props 
}, ref) => {
  // Handle value changes with proper type safety
  const handleValueChange = (newValue: string | string[]) => {
    if (!onValueChange) return;
    
    if (type === 'multiple') {
      const valueArray = Array.isArray(newValue) ? newValue : [newValue]
      ;(onValueChange as (value: string[]) => void)(valueArray)
    } else {
      const valueString = Array.isArray(newValue) ? newValue[0] || '' : newValue || ''
      ;(onValueChange as (value: string) => void)(valueString)
    }
  }

  // Create the root props with proper type safety
  const rootProps: React.ComponentProps<typeof ToggleGroupPrimitive.Root> = {
    ref,
    className: cn("flex items-center justify-center gap-1", className),
    type,
    onValueChange: handleValueChange,
    ...props,
  }

  // Add value and defaultValue with proper typing
  if (isMultipleProps({ type, value, defaultValue } as ToggleGroupProps)) {
    rootProps.value = value as string[] | undefined
    rootProps.defaultValue = defaultValue as string[] | undefined
  } else {
    rootProps.value = value as string | undefined
    rootProps.defaultValue = defaultValue as string | undefined
  }

  return (
    <ToggleGroupPrimitive.Root {...rootProps}>
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}) as ToggleGroupComponent

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
