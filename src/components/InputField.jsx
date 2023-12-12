// InputField.js

/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ type, label, value, options, required, onChange }) => {

  const [validationError, setValidationError] = useState(null);

  
  useEffect(() => {

    const handleValidation = () => {
      if (required && !value) {
        setValidationError(`${label} is required.`);
      } else {
        setValidationError(null);
      }
    };

    handleValidation();
  }, [value, required, label]);


  return (
    <Form.Group>
      <Form.Label as="h3">{label}</Form.Label>
      {type === 'text' && (
        <Form.Control
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      )}
      {type === 'textarea' && (
        <Form.Control as={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      )}
      {type === 'dropdown' && (
        <Form.Control as="select" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
      )}
      {type === 'checkbox' && (
        options.map((option, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            id={`checkbox-${index}`}
            label={option}
            checked={value.includes(option)}
            onChange={() => onChange(option)}
          />
        ))
      )}
      {type === 'radio' && (
        options.map((option, index) => (
          <Form.Check
            key={index}
            type="radio"
            id={`radio-${index}`}
            label={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
        ))
      )}
      {validationError && <Form.Text className="text-danger">{validationError}</Form.Text>}
    </Form.Group>
  );
};

export default InputField;
