'use client';

import { useState, useId } from 'react';

type CommonProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  name?: string;
  dark?: boolean;
};

type InputProps = CommonProps & {
  type?: 'text' | 'tel' | 'email';
  as?: 'input';
};

type SelectProps = CommonProps & {
  as: 'select';
  options: { value: string; label: string }[];
};

const baseFieldClass =
  'peer w-full font-sans text-[13px] bg-transparent rounded-[10px] px-[14px] pt-[20px] pb-[8px] outline-none';

export function FloatingInput(props: InputProps | SelectProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const hasValue = props.value !== '';
  const floated = focused || hasValue;
  const dark = props.dark === true;

  const borderColor = dark
    ? focused
      ? '#4A8A2E'
      : 'rgba(255,255,255,0.15)'
    : focused
    ? '#2A5C1A'
    : '#D0CFCA';

  const wrapperClass = `relative w-full rounded-[10px] transition-colors duration-200 ${
    dark ? 'bg-white/[0.08]' : 'bg-[#F9F8F5]'
  }`;

  const fieldColorClass = dark ? 'text-white' : 'text-[#1C1C1C]';

  const labelColor = dark
    ? focused
      ? '#4A8A2E'
      : floated
      ? 'rgba(255,255,255,0.7)'
      : 'rgba(255,255,255,0.5)'
    : focused
    ? '#2A5C1A'
    : floated
    ? '#6B6B6B'
    : 'rgba(107,107,107,0.6)';

  const arrowColorClass = dark ? 'text-white/50' : 'text-[#6B6B6B]';

  return (
    <div className={wrapperClass} style={{ border: `0.5px solid ${borderColor}` }}>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-[14px] font-sans transition-all duration-200"
        style={{
          top: floated ? 6 : 13,
          fontSize: floated ? 10 : 13,
          color: labelColor,
          letterSpacing: floated ? '0.04em' : 0,
        }}
      >
        {props.label}
      </label>

      {props.as === 'select' ? (
        <select
          id={id}
          name={props.name}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseFieldClass} ${fieldColorClass}`}
          style={{ appearance: 'none', WebkitAppearance: 'none' }}
        >
          <option value="" />
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ color: '#1C1C1C' }}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={props.name}
          type={props.type ?? 'text'}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseFieldClass} ${fieldColorClass}`}
        />
      )}

      {props.as === 'select' && (
        <span
          className={`pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 ${arrowColorClass} text-xs`}
          aria-hidden
        >
          ▾
        </span>
      )}
    </div>
  );
}
