import React from 'react';
import type { FormInputProps } from '../../../types';
import './FormInput.scss';

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const inputId = `input-${name}`;
  const hasError = !!error;

  return (
    <div className={`form-input ${hasError ? 'form-input--error' : ''}`}>
      <label htmlFor={inputId} className="form-input__label">
        {label}
        {required && <span className="form-input__required">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="form-input__textarea"
          rows={5}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="form-input__input"
        />
      )}
      
      {error && (
        <span className="form-input__error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};