import { useState } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  tooltip?: string;
  className?: string;
}

export function PageHeader({ title, description, tooltip, className }: PageHeaderProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className={`mb-8 ${className ?? ''}`}>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {tooltip && (
          <div className="relative flex items-center">
            <button
              type="button"
              aria-describedby="page-header-tooltip"
              className="flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground/60 hover:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 transition-colors"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              onFocus={() => setTooltipVisible(true)}
              onBlur={() => setTooltipVisible(false)}
              aria-label="More information"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              id="page-header-tooltip"
              role="tooltip"
              aria-hidden={!tooltipVisible}
              className="absolute left-1/2 bottom-full mb-2 z-50 pointer-events-none"
              style={{
                transform: tooltipVisible
                  ? 'translateX(-50%) translateY(0)'
                  : 'translateX(-50%) translateY(5px)',
                opacity: tooltipVisible ? 1 : 0,
                transition: 'opacity 200ms ease, transform 200ms ease',
              }}
            >
              <div className="w-max max-w-[220px] rounded-md bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md border border-border">
                {tooltip}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-border" />
            </div>
          </div>
        )}
      </div>
      {description && (
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
