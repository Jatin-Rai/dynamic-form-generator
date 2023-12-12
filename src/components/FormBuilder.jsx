import { useState } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import InputField from './InputField';

const FormBuilder = () => {
    const [formFields, setFormFields] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFieldType, setSelectedFieldType] = useState(null);
    const [newFieldLabel, setNewFieldLabel] = useState('');
    const [newFieldOptions, setNewFieldOptions] = useState('');
    const [required, setRequired] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const hasInputFields = formFields.length > 0;

    const addFormField = (type) => {
        setSelectedFieldType(type);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedFieldType(null);
        setNewFieldLabel('');
        setNewFieldOptions('');
    };

    const handleModalSubmit = () => {
        setShowModal(false);
        let newField;

        const baseField = {
            type: selectedFieldType,
            label: newFieldLabel,
            value: '',
            required,
        };

        if (selectedFieldType === 'dropdown' || selectedFieldType === 'checkbox' || selectedFieldType === 'radio') {
            newField = {
                ...baseField,
                options: newFieldOptions.split(','),
                value: [],
            };
        } else {
            newField = { ...baseField };
        }

        setFormFields([...formFields, newField]);
        setSelectedFieldType(null);
        setNewFieldLabel('');
        setNewFieldOptions('');
        setRequired(false);
    };

    const removeFormField = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    const handleCheckboxChange = (index, option) => {
        const updatedFields = [...formFields];
        updatedFields[index].value = updatedFields[index].value.includes(option)
            ? updatedFields[index].value.filter((val) => val !== option)
            : [...updatedFields[index].value, option];
        setFormFields(updatedFields);
    };

    const handleRadioChange = (index, option) => {
        const updatedFields = [...formFields];
        updatedFields[index].value = option;
        setFormFields(updatedFields);
    };

    const handleValueChange = (index, value) => {
        const updatedFields = [...formFields];
        updatedFields[index].value = value;
        setFormFields(updatedFields);
    };

    const renderFormFields = () => {
        return formFields.map((field, index) => (
            <div key={index} className='mb-3'>
                    {field.type && (
                        <InputField
                            type={field.type}
                            label={field.label}
                            value={field.value}
                            options={field.options}
                            required={required}
                            onChange={(option) =>
                                field.type === 'checkbox'
                                    ? handleCheckboxChange(index, option)
                                    : field.type === 'radio'
                                        ? handleRadioChange(index, option)
                                        : handleValueChange(index, option)
                            }
                        />
                    )}
                    <Button variant="danger" className='mt-3' onClick={() => removeFormField(index)}>
                        Remove
                    </Button>
            </div>
        ));
    };

    const validateForm = () => {
        const errors = formFields.map((field) => {
            if (field.required && !field.value) {
                return `${field.label} is required.`;
            } else if (field.type === 'dropdown' && field.required && field.value.length === 0) {
                return `Please select an option for ${field.label}.`;
            } else if (
                (field.type === 'checkbox' || field.type === 'radio') &&
                field.required &&
                field.value.length === 0
            ) {
                return `Select at least one option for ${field.label}.`;
            }
            return null;
        });

        setValidationErrors(errors.filter((error) => error !== null));

        return errors.every((error) => error === null);
    };

    const renderValidationErrors = () => {
        if (validationErrors.length === 0) {
            return null;
        }

        return (
            <div className="alert alert-danger mt-3">
                <ul>
                    {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const handleSubmit = () => {
        const isValid = validateForm();

        if (isValid) {
            alert("Form Submitted Successfully");
            console.log('Form submitted:', formFields);
        } else {
            alert("Form Submition Failed");
            console.log('Form validation failed.');
        }
    };

    const saveForm = () => {
        localStorage.setItem('formFields', JSON.stringify(formFields));
    };

    const loadForm = () => {
        const savedFormFields = JSON.parse(localStorage.getItem('formFields')) || [];
        setFormFields(savedFormFields);
    };

    return (
        <Container className='mt-5'>
                <div className='d-flex col gap-3 justify-content-center'>
                        <Button onClick={() => addFormField('text')}>Text Field</Button>
                        <Button onClick={() => addFormField('textarea')}>Text Area</Button>
                        <Button onClick={() => addFormField('dropdown')}>Dropdown</Button>
                        <Button onClick={() => addFormField('checkbox')}>Checkbox</Button>
                        <Button onClick={() => addFormField('radio')}>Radio</Button>
                </div>
                <div className='d-flex row gap-2'>
                    {renderFormFields()}
                    {hasInputFields && renderValidationErrors()}
                    {hasInputFields && (
                        <div className='d-inline-flex gap-3 mt-5 mb-5'>
                            <Button type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button onClick={saveForm}>Save Form</Button>
                            <Button onClick={loadForm}>Load Form</Button>
                        </div>
                    )}
                </div>

            {/* Modal for entering label and options */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Label and Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Enter Label"
                        value={newFieldLabel}
                        onChange={(e) => setNewFieldLabel(e.target.value)}
                    />
                    {(selectedFieldType === 'dropdown' || selectedFieldType === 'checkbox' || selectedFieldType === 'radio') && (
                        <Form.Control
                            type="text"
                            placeholder="Enter Options (comma-separated)"
                            value={newFieldOptions}
                            onChange={(e) => setNewFieldOptions(e.target.value)}
                        />
                    )}
                    <Form.Check
                        type="checkbox"
                        label="Required"
                        checked={required}
                        onChange={(e) => setRequired(e.target.checked)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleModalSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default FormBuilder;
