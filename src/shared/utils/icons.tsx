import React from "react";

export const MailIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="m22 8-10 6L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LockIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 10V8a4 4 0 1 1 8 0v2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const EyeIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const EyeOffIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 12s3.5-6 10-6c2.1 0 3.9.6 5.4 1.5M22 12s-3.5 6-10 6c-2.1 0-3.9-.6-5.4-1.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const GoogleIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 533.5 544.3" width="18" height="18" {...p}>
    <path fill="#EA4335" d="M533.5 278.4c0-18.7-1.7-37-5-54.6H272.1v103.4h147c-6.3 34.2-25.4 63.2-54 82.6v68h87.1c50.9-46.9 81.3-116 81.3-199.4z"/>
    <path fill="#34A853" d="M272.1 544.3c73.5 0 135.2-24.3 180.2-66.1l-87.1-68c-24.2 16.2-55.2 25.7-93.1 25.7-71.6 0-132.3-48.3-153.9-113.2H28.5v70.9C73.1 482.4 166.4 544.3 272.1 544.3z"/>
    <path fill="#4A90E2" d="M118.2 322.7c-10.7-31.9-10.7-66.3 0-98.2V153.6H28.5c-39.5 78.9-39.5 172.3 0 251.2l89.7-82.1z"/>
    <path fill="#FBBC05" d="M272.1 106.7c39.9-.6 78.2 14.7 107.5 42.7l80.5-80.5C407.1 15.2 343.4-2 272.1 0 166.4 0 73.1 61.9 28.5 153.6l89.7 70.9c21.6-64.9 82.3-113.2 153.9-113.2z"/>
  </svg>
);

export const AppleIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M16.365 1.43c0 1.14-.45 2.2-1.18 3.01-.76.83-2.03 1.46-3.1 1.37-.14-1.05.53-2.2 1.28-2.95.78-.8 2.16-1.38 3-.43zM20.5 17.1c-.58 1.35-.86 1.95-1.61 3.14-1.05 1.63-2.53 3.67-4.33 3.7-1.62.02-2.04-1.08-4.26-1.08-2.22 0-2.7 1.05-4.32 1.1-1.78.07-3.14-1.76-4.2-3.38-2.28-3.47-4.02-9.82-1.68-14.11C1.2 4.46 3.41 3.06 5.8 3c1.76-.04 3.43 1.21 4.26 1.21.83 0 2.64-1.49 4.46-1.27.76.03 2.9.31 4.27 2.33-3.73 2.02-3.13 7.26.71 8.83z"/>
  </svg>
);
