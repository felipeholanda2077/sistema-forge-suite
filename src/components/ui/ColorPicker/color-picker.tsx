import * as React from 'react';
import { HexColorPicker, RgbaColor } from 'react-colorful';
import { cn } from '../../lib/utils';

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  color?: string;
  onChange?: (color: string) => void;
  className?: string;
  showAlpha?: boolean;
  presets?: string[];
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultColor?: string;
}

export function ColorPicker({
  color = '#000000',
  onChange,
  className,
  showAlpha = false,
  presets = [],
  children,
  open: isOpenProp,
  onOpenChange,
  defaultColor = '#000000',
  ...props
}: ColorPickerProps) {
  const [isOpenState, setIsOpenState] = React.useState(false);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenState;
  const [internalColor, setInternalColor] = React.useState(color || defaultColor);

  React.useEffect(() => {
    setInternalColor(color);
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setInternalColor(newColor);
    onChange?.(newColor);
  };

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setIsOpenState(open);
    }
    onOpenChange?.(open);
  };

  const toggleOpen = () => handleOpenChange(!isOpen);

  return (
    <div className={cn('relative', className)} {...props}>
      {children ? (
        React.cloneElement(children as React.ReactElement, {
          onClick: toggleOpen,
        })
      ) : (
        <button
          type="button"
          className="h-10 w-10 rounded-md border border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: internalColor }}
          onClick={toggleOpen}
        />
      )}
      
      {isOpen && (
        <div className="absolute z-50 mt-2 rounded-md border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <HexColorPicker
            color={internalColor}
            onChange={handleColorChange}
            className="mb-4"
          />
          
          {presets.length > 0 && (
            <div className="mt-4 grid grid-cols-6 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: preset }}
                  onClick={() => handleColorChange(preset)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
