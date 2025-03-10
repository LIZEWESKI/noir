import React from 'react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const InputField = ({ label, name, value, type = 'text', description, error, setData, placeholder = label, inputRef }) => {
  const handleChange = (e) => {
    const newValue = type === 'file' ? e.target.files[0] : e.target.value;
    setData(name, newValue);
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor={name} className="font-medium text-base">
          {label}
        </Label>
      </div>
      <Input
        id={name}
        placeholder={placeholder}
        autoComplete = {type === 'password' ? "current-password" : 'username' }
        type={type}
        value={type !== 'file' ? value : undefined}
        onChange={handleChange}
        ref={inputRef}
        required={type !== 'file'}
      />
      {error && <p className="text-sm text-danger font-medium">{error}</p>}
      {description && <p className="text-[0.8rem] text-muted-foreground">{description}</p>}
    </div>
  );
};

export default InputField;
