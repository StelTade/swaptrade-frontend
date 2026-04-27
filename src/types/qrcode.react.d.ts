declare module 'qrcode.react' {
  import * as React from 'react';

  export interface QRCodeProps {
    value: string;
    size?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    bgColor?: string;
    fgColor?: string;
    className?: string;
    style?: React.CSSProperties;
    renderAs?: 'canvas' | 'svg';
    imageSettings?: {
      src?: string;
      x?: number;
      y?: number;
      height?: number;
      width?: number;
      excavate?: boolean;
    };
  }

  const QRCode: React.FC<QRCodeProps>;
  export default QRCode;
}
