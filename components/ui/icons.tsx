'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

function IconNextChat({
  className,
  inverted,
  ...props
}: React.ComponentProps<'svg'> & { inverted?: boolean }) {
  const id = React.useId();

  return (
    <svg
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <defs>
        <linearGradient
          id={`gradient-${id}-1`}
          x1='10.6889'
          y1='10.3556'
          x2='13.8445'
          y2='14.2667'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={inverted ? 'white' : 'black'} />
          <stop
            offset={1}
            stopColor={inverted ? 'white' : 'black'}
            stopOpacity={0}
          />
        </linearGradient>
        <linearGradient
          id={`gradient-${id}-2`}
          x1='11.7555'
          y1='4.8'
          x2='11.7376'
          y2='9.50002'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={inverted ? 'white' : 'black'} />
          <stop
            offset={1}
            stopColor={inverted ? 'white' : 'black'}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <path
        d='M1 16L2.58314 11.2506C1.83084 9.74642 1.63835 8.02363 2.04013 6.39052C2.4419 4.75741 3.41171 3.32057 4.776 2.33712C6.1403 1.35367 7.81003 0.887808 9.4864 1.02289C11.1628 1.15798 12.7364 1.8852 13.9256 3.07442C15.1148 4.26363 15.842 5.83723 15.9771 7.5136C16.1122 9.18997 15.6463 10.8597 14.6629 12.224C13.6794 13.5883 12.2426 14.5581 10.6095 14.9599C8.97637 15.3616 7.25358 15.1692 5.74942 14.4169L1 16Z'
        fill={inverted ? 'black' : 'white'}
        stroke={inverted ? 'black' : 'white'}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <mask
        id='mask0_91_2047'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x={1}
        y={0}
        width={16}
        height={16}
      >
        <circle cx={9} cy={8} r={8} fill={inverted ? 'black' : 'white'} />
      </mask>
      <g mask='url(#mask0_91_2047)'>
        <circle cx={9} cy={8} r={8} fill={inverted ? 'black' : 'white'} />
        <path
          d='M14.2896 14.0018L7.146 4.8H5.80005V11.1973H6.87681V6.16743L13.4444 14.6529C13.7407 14.4545 14.0231 14.2369 14.2896 14.0018Z'
          fill={`url(#gradient-${id}-1)`}
        />
        <rect
          x='11.2222'
          y='4.8'
          width='1.06667'
          height='6.4'
          fill={`url(#gradient-${id}-2)`}
        />
      </g>
    </svg>
  );
}

function IconOpenAI({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 24 24'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <title>OpenAI icon</title>
      <path d='M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z' />
    </svg>
  );
}

function IconVercel({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      aria-label='Vercel logomark'
      role='img'
      viewBox='0 0 74 64'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path
        d='M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z'
        fill='currentColor'
      ></path>
    </svg>
  );
}

function IconGitHub({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <title>GitHub</title>
      <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
    </svg>
  );
}

function IconGoogle({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      viewBox='0 0 32 32'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <title>{'google3'}</title>
      <path d='M16 0C7.162 0 0 7.162 0 16s7.162 16 16 16 16-7.163 16-16S24.837 0 16 0zm.238 28c-6.631 0-12-5.369-12-12s5.369-12 12-12c3.238 0 5.95 1.181 8.037 3.138l-3.256 3.138c-.894-.856-2.45-1.85-4.781-1.85-4.1 0-7.438 3.394-7.438 7.575s3.344 7.575 7.438 7.575c4.75 0 6.531-3.413 6.806-5.175h-6.806v-4.113h11.331c.1.6.188 1.2.188 1.988.006 6.856-4.588 11.725-11.519 11.725z' />
    </svg>
  );
}

function IconSeparator({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill='none'
      shapeRendering='geometricPrecision'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1'
      viewBox='0 0 24 24'
      aria-hidden='true'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M16.88 3.549L7.12 20.451'></path>
    </svg>
  );
}

function IconArrowDown({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='m205.66 149.66-72 72a8 8 0 0 1-11.32 0l-72-72a8 8 0 0 1 11.32-11.32L120 196.69V40a8 8 0 0 1 16 0v156.69l58.34-58.35a8 8 0 0 1 11.32 11.32Z' />
    </svg>
  );
}

function IconArrowRight({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z' />
    </svg>
  );
}

function IconUser({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z' />
    </svg>
  );
}

function IconPlus({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z' />
    </svg>
  );
}

function IconArrowElbow({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z' />
    </svg>
  );
}

function IconSpinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4 animate-spin', className)}
      {...props}
    >
      <path d='M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z' />
    </svg>
  );
}

function IconMessage({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M216 48H40a16 16 0 0 0-16 16v160a15.84 15.84 0 0 0 9.25 14.5A16.05 16.05 0 0 0 40 240a15.89 15.89 0 0 0 10.25-3.78.69.69 0 0 0 .13-.11L82.5 208H216a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16ZM40 224Zm176-32H82.5a16 16 0 0 0-10.3 3.75l-.12.11L40 224V64h176Z' />
    </svg>
  );
}

function IconTrash({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z' />
    </svg>
  );
}

function IconRefresh({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z' />
    </svg>
  );
}

function IconStop({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm24-120h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8Zm-8 48h-32v-32h32Z' />
    </svg>
  );
}

function IconSidebar({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16ZM40 56h40v144H40Zm176 144H96V56h120v144Z' />
    </svg>
  );
}

function IconMoon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M233.54 142.23a8 8 0 0 0-8-2 88.08 88.08 0 0 1-109.8-109.8 8 8 0 0 0-10-10 104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88 104.84 104.84 0 0 0 37-52.91 8 8 0 0 0-1.98-7.98Zm-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104 106 106 0 0 0 14.92-1.06 89 89 0 0 1-26.02 31.4Z' />
    </svg>
  );
}

function IconSun({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0Zm72 88a64 64 0 1 1-64-64 64.07 64.07 0 0 1 64 64Zm-16 0a48 48 0 1 0-48 48 48.05 48.05 0 0 0 48-48ZM58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8Zm80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8Zm112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z' />
    </svg>
  );
}

function IconCopy({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z' />
    </svg>
  );
}

function IconCheck({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z' />
    </svg>
  );
}

function IconDownload({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z' />
    </svg>
  );
}

function IconClose({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 256 256'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z' />
    </svg>
  );
}

function IconEdit({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
      />
    </svg>
  );
}

function IconShare({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      viewBox='0 0 256 256'
      {...props}
    >
      <path d='m237.66 106.35-80-80A8 8 0 0 0 144 32v40.35c-25.94 2.22-54.59 14.92-78.16 34.91-28.38 24.08-46.05 55.11-49.76 87.37a12 12 0 0 0 20.68 9.58c11-11.71 50.14-48.74 107.24-52V192a8 8 0 0 0 13.66 5.65l80-80a8 8 0 0 0 0-11.3ZM160 172.69V144a8 8 0 0 0-8-8c-28.08 0-55.43 7.33-81.29 21.8a196.17 196.17 0 0 0-36.57 26.52c5.8-23.84 20.42-46.51 42.05-64.86C99.41 99.77 127.75 88 152 88a8 8 0 0 0 8-8V51.32L220.69 112Z' />
    </svg>
  );
}

function IconUsers({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      viewBox='0 0 256 256'
      {...props}
    >
      <path d='M117.25 157.92a60 60 0 1 0-66.5 0 95.83 95.83 0 0 0-47.22 37.71 8 8 0 1 0 13.4 8.74 80 80 0 0 1 134.14 0 8 8 0 0 0 13.4-8.74 95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44 44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16 44 44 0 1 0-16.34-84.87 8 8 0 1 1-5.94-14.85 60 60 0 0 1 55.53 105.64 95.83 95.83 0 0 1 47.22 37.71 8 8 0 0 1-2.33 11.07Z' />
    </svg>
  );
}

function IconExternalLink({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      viewBox='0 0 256 256'
      {...props}
    >
      <path d='M224 104a8 8 0 0 1-16 0V59.32l-66.33 66.34a8 8 0 0 1-11.32-11.32L196.68 48H152a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-40 24a8 8 0 0 0-8 8v72H48V80h72a8 8 0 0 0 0-16H48a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-72a8 8 0 0 0-8-8Z' />
    </svg>
  );
}

function IconChevronUpDown({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className={cn('h-4 w-4', className)}
      viewBox='0 0 256 256'
      {...props}
    >
      <path d='M181.66 170.34a8 8 0 0 1 0 11.32l-48 48a8 8 0 0 1-11.32 0l-48-48a8 8 0 0 1 11.32-11.32L128 212.69l42.34-42.35a8 8 0 0 1 11.32 0Zm-96-84.68L128 43.31l42.34 42.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32Z' />
    </svg>
  );
}

function IconClip({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 512 512'
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d='M375.6 110.8v289.5h-34.4V110.8c0-37.2-27-77.3-86.6-77.3-66.1 0-83.8 48.4-83.8 77.3v325.8c0 21.4 23.3 41 48.4 41 28.9 0 53.1-23.3 53.1-41.9V167.6c0-29.8-8.4-29.8-15.8-29.8-12.1 0-18.6.9-18.6 27.9v175h-34.4v-175c0-14.9 0-62.4 53.1-62.4 22.3 0 50.3 11.2 50.3 64.2v268.1c0 40-41.9 76.3-87.5 76.3-43.8 0-82.9-35.4-82.9-75.4V110.7C136.4 57.7 173.6 0 253.7 0c81 0 121.9 55.9 121.9 110.8z' />
    </svg>
  );
}

function IconBot({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      className={cn('h-8 w-8', className)}
      {...props}
    >
      <path
        d='M35.412 115.592a6.289 6.289 0 0 0-5.68 3.575c-.053-.005-.104-.017-.158-.017-.942 0-1.7.759-1.7 1.7v2.102c0 .942.758 1.7 1.7 1.7.054 0 .105-.012.157-.016.068.14.138.28.217.417.31.551 1.134.079.816-.467a5.369 5.369 0 0 1 1.2-6.802 5.363 5.363 0 0 1 6.902 0 5.369 5.369 0 0 1 1.2 6.802l-.014.023-.01.024s-.633 1.402-1.878 1.402l-1.575-.014a.807.807 0 0 0-.667-.366h-1.015a.82.82 0 0 0-.822.823c0 .28.178.494.586.494h3.493c1.868 0 2.675-1.833 2.712-1.918v-.005c.078-.136.147-.275.215-.415.055.005.108.017.165.017.941 0 1.7-.759 1.7-1.7v-2.102c0-.942-.759-1.7-1.7-1.7-.055 0-.106.009-.16.016a6.268 6.268 0 0 0-1.626-2.1 6.305 6.305 0 0 0-4.058-1.475zm-2.049 2.987c-.366-.024-.7.053-.992.361a4.56 4.56 0 0 0-1.26 3.125c0 .981.327 2.08.88 2.12.786.057 2.027-.46 3.424-.46 1.48 0 2.787.58 3.561.443.47-.083.744-1.205.744-2.103a4.561 4.561 0 0 0-1.261-3.125c-.78-.82-1.855 0-3.044 0-.743 0-1.442-.321-2.052-.361zm-.174 2.021a.787.787 0 1 1 0 1.574.787.787 0 0 1 0-1.574zm4.452 0a.787.787 0 1 1 0 1.574.787.787 0 0 1 0-1.574z'
        style={{
          opacity: 1,
          vectorEffect: 'none',
          fillOpacity: 1,
          fillRule: 'evenodd',
          stroke: 'none',
          strokeWidth: '.62069714px',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          strokeDasharray: 'none',
          strokeDashoffset: 0,
          strokeOpacity: 1,
          marker: 'none'
        }}
        transform='translate(-25.415 -111.281)'
      />
    </svg>
  );
}

function IconPDF({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      viewBox='0 0 303.188 303.188'
      className={cn('h-8 w-8', className)}
      {...props}
    >
      <path
        d='M219.821 0H32.842v303.188h237.504V50.525z'
        style={{
          fill: '#e8e8e8'
        }}
      />
      <path
        d='M230.013 149.935c-3.643-6.493-16.231-8.533-22.006-9.451-4.552-.724-9.199-.94-13.803-.936-3.615-.024-7.177.154-10.693.354-1.296.087-2.579.199-3.861.31a93.594 93.594 0 0 1-3.813-4.202c-7.82-9.257-14.134-19.755-19.279-30.664 1.366-5.271 2.459-10.772 3.119-16.485 1.205-10.427 1.619-22.31-2.288-32.251-1.349-3.431-4.946-7.608-9.096-5.528-4.771 2.392-6.113 9.169-6.502 13.973-.313 3.883-.094 7.776.558 11.594.664 3.844 1.733 7.494 2.897 11.139a165.324 165.324 0 0 0 3.588 9.943 171.593 171.593 0 0 1-2.63 7.603c-2.152 5.643-4.479 11.004-6.717 16.161l-3.465 7.507c-3.576 7.855-7.458 15.566-11.815 23.02-10.163 3.585-19.283 7.741-26.857 12.625-4.063 2.625-7.652 5.476-10.641 8.603-2.822 2.952-5.69 6.783-5.941 11.024-.141 2.394.807 4.717 2.768 6.137 2.697 2.015 6.271 1.881 9.4 1.225 10.25-2.15 18.121-10.961 24.824-18.387 4.617-5.115 9.872-11.61 15.369-19.465l.037-.054c9.428-2.923 19.689-5.391 30.579-7.205 4.975-.825 10.082-1.5 15.291-1.974 3.663 3.431 7.621 6.555 11.939 9.164 3.363 2.069 6.94 3.816 10.684 5.119 3.786 1.237 7.595 2.247 11.528 2.886 1.986.284 4.017.413 6.092.335 4.631-.175 11.278-1.951 11.714-7.57.134-1.72-.237-3.228-.98-4.55zm-110.869 10.31a170.827 170.827 0 0 1-6.232 9.041c-4.827 6.568-10.34 14.369-18.322 17.286-1.516.554-3.512 1.126-5.616 1.002-1.874-.11-3.722-.937-3.637-3.065.042-1.114.587-2.535 1.423-3.931.915-1.531 2.048-2.935 3.275-4.226 2.629-2.762 5.953-5.439 9.777-7.918 5.865-3.805 12.867-7.23 20.672-10.286-.449.71-.897 1.416-1.34 2.097zm27.222-84.26a38.169 38.169 0 0 1-.323-10.503 24.858 24.858 0 0 1 1.038-4.952c.428-1.33 1.352-4.576 2.826-4.993 2.43-.688 3.177 4.529 3.452 6.005 1.566 8.396.186 17.733-1.693 25.969-.299 1.31-.632 2.599-.973 3.883a121.219 121.219 0 0 1-1.648-4.821c-1.1-3.525-2.106-7.091-2.679-10.588zm16.683 66.28a236.508 236.508 0 0 0-25.979 5.708c.983-.275 5.475-8.788 6.477-10.555 4.721-8.315 8.583-17.042 11.358-26.197 4.9 9.691 10.847 18.962 18.153 27.214.673.749 1.357 1.489 2.053 2.22-4.094.441-8.123.978-12.062 1.61zm61.744 11.694c-.334 1.805-4.189 2.837-5.988 3.121-5.316.836-10.94.167-16.028-1.542-3.491-1.172-6.858-2.768-10.057-4.688-3.18-1.921-6.155-4.181-8.936-6.673 3.429-.206 6.9-.341 10.388-.275 3.488.035 7.003.211 10.475.664 6.511.726 13.807 2.961 18.932 7.186 1.009.833 1.331 1.569 1.214 2.207zM227.64 25.263H32.842V0h186.979z'
        style={{
          fill: '#fb3449'
        }}
      />
      <path
        d='M126.841 241.152c0 5.361-1.58 9.501-4.742 12.421-3.162 2.921-7.652 4.381-13.472 4.381h-3.643v15.917H92.022v-47.979h16.606c6.06 0 10.611 1.324 13.652 3.971 3.041 2.647 4.561 6.41 4.561 11.289zm-21.856 6.235h2.363c1.947 0 3.495-.546 4.644-1.641 1.149-1.094 1.723-2.604 1.723-4.529 0-3.238-1.794-4.857-5.382-4.857h-3.348v11.027zM175.215 248.864c0 8.007-2.205 14.177-6.613 18.509s-10.606 6.498-18.591 6.498h-15.523v-47.979h16.606c7.701 0 13.646 1.969 17.836 5.907 4.189 3.938 6.285 9.627 6.285 17.065zm-13.455.46c0-4.398-.87-7.657-2.609-9.78-1.739-2.122-4.381-3.183-7.926-3.183h-3.773v26.877h2.888c3.939 0 6.826-1.143 8.664-3.43 1.837-2.285 2.756-5.78 2.756-10.484zM196.579 273.871h-12.766v-47.979h28.355v10.403h-15.589v9.156h14.374v10.403h-14.374v18.017z'
        style={{
          fill: '#a4a9ad'
        }}
      />
      <path
        d='M219.821 50.525h50.525L219.821 0z'
        style={{
          fill: '#d1d3d3'
        }}
      />
    </svg>
  );
}

function IconTXT({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      viewBox='0 0 303.188 303.188'
      className={cn('h-8 w-8', className)}
      {...props}
    >
      <path
        d='M219.821 0H32.842v303.188h237.504V50.525z'
        style={{
          fill: '#e8e8e8'
        }}
      />
      <path
        d='M92.817 166.37h49.543v12.865H92.817zM92.817 141.729H200.36v12.865H92.817zM92.817 117.087h117.551v12.865H92.817zM92.817 92.445h82.209v12.865H92.817zM92.817 67.804h117.551v12.865H92.817z'
        style={{
          fill: '#d1d3d3'
        }}
      />
      <path
        d='M113.189 273.871h-12.963v-37.379H88.511v-10.6h36.361v10.6h-11.683v37.379zM174.952 273.871h-14.998l-9.352-14.998-9.256 14.998h-14.669l15.917-24.547-14.965-23.433h14.373l8.664 14.834 8.336-14.834h14.801l-15.195 24.449 16.344 23.531zM201.502 273.871h-12.963v-37.379h-11.716v-10.6h36.361v10.6h-11.683v37.379h.001zM227.64 25.263H32.842V0h186.979z'
        style={{
          fill: '#a4a9ad'
        }}
      />
      <path
        d='M219.821 50.525h50.525L219.821 0z'
        style={{
          fill: '#d1d3d3'
        }}
      />
    </svg>
  );
}

function IconPrompt({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-8 w-8', className)}
      {...props}
      {...props}
    >
      <path d='M27 0H3C1.35 0 0 1.35 0 3v26c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3zm-1 28H4V4h22v24zM8 14h14v2H8zm0 4h14v2H8zm0 4h14v2H8zm0-12h14v2H8z' />
    </svg>
  );
}

export {
  IconArrowDown,
  IconArrowElbow,
  IconArrowRight,
  IconBot,
  IconCheck,
  IconChevronUpDown,
  IconClip,
  IconClose,
  IconCopy,
  IconDownload,
  IconEdit,
  IconExternalLink,
  IconGitHub,
  IconGoogle,
  IconMessage,
  IconMoon,
  IconNextChat,
  IconOpenAI,
  IconPDF,
  IconPlus,
  IconPrompt,
  IconRefresh,
  IconSeparator,
  IconShare,
  IconSidebar,
  IconSpinner,
  IconStop,
  IconSun,
  IconTXT,
  IconTrash,
  IconUser,
  IconUsers,
  IconVercel
};
