import { PropsWithChildren, useEffect, useRef } from 'react';

type ToolTipPosition = 'tooltip-bottom' | 'tooltip-left' | 'tooltip-right';
type ToolTipColor =
  | 'tooltip-primary'
  | 'tooltip-secondary'
  | 'tooltip-accent'
  | 'tooltip-info'
  | 'tooltip-success'
  | 'tooltip-error';

type ToolTipButton =
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-accent'
  | 'btn-info'
  | 'btn-success'
  | 'btn-error';
// 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'error';

type ToolTipProps = PropsWithChildren<{
  dataTip?: string;
  content?: string;
  open?: boolean;
  position?: ToolTipPosition;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  color?: ToolTipColor;
  btnColor: ToolTipButton;
}>;

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  dataTip,
  content,
  open,
  position,
  bottom,
  left,
  right,
  color,
  btnColor,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const refButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    open && ref.current.classList.add('tooltip-open');
    position && ref.current.classList.add(position);
    bottom && ref.current.classList.add('tooltip-bottom');
    left && ref.current.classList.add('tooltip-left');
    right && ref.current.classList.add('tooltip-right');
  }, []);

  return (
    <div
      ref={ref}
      // className='tooltip'
      className={`tooltip ${color}`}
      data-tip={dataTip ? dataTip : 'insert tip'}
    >
      {children || (
        <button ref={refButton} className={`btn ${btnColor || ''}`}>
          {content ? content : 'insert content'}
        </button>
      )}
    </div>
  );
};

export default ToolTip;
