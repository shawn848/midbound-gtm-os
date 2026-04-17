'use client';

import { useState } from 'react';
import { logoUrl, initialsForCompany, gradientForCompany } from '@/lib/companyLogo';

interface CompanyLogoPinProps {
  company: string;
  domain: string;
  count: number;
  selected?: boolean;
  dimmed?: boolean;
  size?: number;
  onClick?: () => void;
  label?: string;
}

export default function CompanyLogoPin({
  company,
  domain,
  count,
  selected = false,
  dimmed = false,
  size = 30,
  onClick,
  label,
}: CompanyLogoPinProps) {
  const [imageOk, setImageOk] = useState(true);
  const gradient = gradientForCompany(company);
  const initials = initialsForCompany(company);
  const pinSize = selected ? size + 6 : size;

  return (
    <button
      type="button"
      onClick={onClick}
      title={label || `${company} · ${count} visit${count === 1 ? '' : 's'}`}
      className={`relative inline-flex items-center justify-center rounded-full transition-all ${
        selected ? 'ring-2 ring-primary ring-offset-2 ring-offset-transparent' : ''
      } ${dimmed ? 'opacity-40 hover:opacity-100' : 'opacity-100'} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      style={{
        width: pinSize,
        height: pinSize,
        boxShadow: selected
          ? '0 0 16px rgba(232,119,46,0.85), 0 0 28px rgba(232,119,46,0.45)'
          : '0 2px 6px rgba(0,0,0,0.55)',
      }}
    >
      {imageOk ? (
        <img
          src={logoUrl(domain)}
          alt={company}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImageOk(false)}
          className="rounded-full bg-white/95 object-cover"
          style={{ width: pinSize, height: pinSize }}
        />
      ) : (
        <span
          className="flex items-center justify-center rounded-full font-semibold text-white"
          style={{
            width: pinSize,
            height: pinSize,
            fontSize: Math.round(pinSize * 0.4),
            background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
          }}
        >
          {initials}
        </span>
      )}
      {count > 1 && (
        <span
          className="absolute -bottom-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none px-1.5 py-0.5 border border-background shadow"
          aria-label={`${count} visitors`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
