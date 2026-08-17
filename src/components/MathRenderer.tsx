import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  displayMode?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', displayMode = false }) => {
  const renderedHTML = useMemo(() => {
    // Helper function to render text containing inline $...$ or block $$...$$ LaTeX formulas
    if (!content) return '';

    // Regex to capture $$...$$ or $...$
    const parts = content.split(/(\$\$.*?\$\$|\$.*?\$)/g);

    return parts.map((part) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2);
        try {
          return katex.renderToString(math, { displayMode: true, throwOnError: false });
        } catch (e) {
          return part;
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        try {
          return katex.renderToString(math, { displayMode: false, throwOnError: false });
        } catch (e) {
          return part;
        }
      } else {
        // Plain text
        return part;
      }
    }).join('');
  }, [content]);

  return (
    <span
      className={`math-rendered-content ${displayMode ? 'block my-2 text-center' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
    />
  );
};
