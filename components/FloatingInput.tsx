'use client';

import { useState, useId } from 'react';

type CommonProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  name?: string;
};

type InputProps = CommonProps & {
  type?: 'text' | 'tel' | 'email';
  as?: 'input';
};

type SelectProps = CommonProps & {
  as: 'select';
  options: { value: string; label: string }[];
};

const wrapperClass =
  'relative w-full rounded-[10px] bg-[#F9F8F5] transition-colors duration-200';
const baseFieldClass =
  'peer w-full font-sans text-[13px] text-[#1C1C1C] bg-transparent rounded-[10px] px-[14px] pt-[20px] pb-[8px] outline-none';

export function FloatingInput(props: InputProps | SelectProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const hasValue = props.value !== '';
  const floated = focused || hasValue;

  const borderColor = focused ? '#2A5C1A' : '#D0CFCA';

  return (
    <div className={wrapperClass} style={{ border: `0.5px solid ${borderColor}` }}>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-[14px] font-sans transition-all duration-200"
        style={{
          top: floated ? 6 : 13,
          fontSize: floated ? 10 : 13,
          color: focused
            ? '#2A5C1A'
            : floated
            ? '#6B6B6B'
            : 'rgba(107,107,107,0.6)',
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
          className={baseFieldClass}
          style={{ appearance: 'none', WebkitAppearance: 'none' }}
        >
          <option value="" />
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
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
          className={baseFieldClass}
        />
      )}

      {props.as === 'select' && (
        <span
          className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[#6B6B6B] text-xs"
          aria-hidden
        >
          ▾
        </span>
      )}
    </div>
  );
}
