
# Dynamic Form Generator

An application to generate simple forms.
[Click here](https://dynamic-formgenerator.netlify.app) to visit.

### Prerequisites:
- Make sure you have Node.js and npm installed on your machine.

### Instructions:
1. **Clone the repository:**
```bash
git clone <repository-url>
cd <repository-folder>
```
2. **Install Dependencies:**
```bash
npm install
or
yarn
```
3. **Run the Application:**
```bash
npm run dev
or
yarn dev
```
This command will start the development server, and the application will be accessible in your browser at http://localhost:5173.

4. **Test the Application:**

- Open your web browser and go to http://localhost:5173.
- Use the "Text Field," "Text Area," "Dropdown," "Checkbox," and "Radio" buttons to add different input fields.
- Fill in the details in the modal that appears and click "Save" to add the field.
- Remove fields using the "Remove" button.
- Try submitting the form with the "Submit" button; it will show validation errors if any.
- Save and load the form using the "Save Form" and "Load Form" buttons.

5. **Review the Code:**

Check the code structure and understand how input fields are dynamically generated and validated.
Review the InputField component in InputField.js to understand how different input types are handled.

6. **Explore the Application:**

Experiment with different input field types and options.
Check how the validation works for required fields and options.

**Additional Information:**
- The application uses React with React Bootstrap for the UI components.
- Input fields are dynamically generated based on the user's choices.
- Validation errors are displayed below the form fields.
- Form submission, saving, and loading functionality are implemented using localStorage.

## Features
- Add different types of input fields (Text Field, Text Area, Dropdown, Checkbox, Radio).
- Customize field labels, options, and set fields as required.
- Submit the form with validation error messages.
- Save and load form states using local storage.

## Code Structure
- FormBuilder.js: Main component for the form builder.
- InputField.js: Component for rendering different input field types.
- App.js: Application entry point.