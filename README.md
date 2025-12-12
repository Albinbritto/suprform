# suprform

A headless React form library for managing complex state, validation, and error handling with a clean, scalable architecture.

## Features

- 🎨 **Headless Architecture** - Complete control over your UI and styling
- 🔒 **TypeScript First** - Full type safety and IntelliSense support
- ✅ **Flexible Validation** - Built-in validators and custom validation rules
- 🎯 **Field-Level Control** - Manage individual fields with ease
- 📊 **Form State Management** - Track dirty, touched, valid states automatically
- ⚡ **Async Validation** - Support for asynchronous validation
- 📦 **Zero Dependencies** - Only requires React as peer dependency
- 🧪 **Well Tested** - Comprehensive test suite included

## Installation

```bash
npm install suprform
```

## Quick Start

```tsx
import { useForm, required, email } from 'suprform';

function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      console.log('Form submitted:', values);
    }
  });

  // Register fields with validators
  form.registerField('email', {
    validators: [
      { rule: required('Email is required') },
      { rule: email('Invalid email format') }
    ]
  });

  form.registerField('password', {
    validators: [
      { rule: required('Password is required') }
    ]
  });

  const emailState = form.getFieldState('email');
  const emailHandlers = form.getFieldHandlers('email');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.submitForm();
    }}>
      <div>
        <input
          type="email"
          value={emailState.value || ''}
          onChange={(e) => emailHandlers.onChange(e.target.value)}
          onBlur={emailHandlers.onBlur}
        />
        {emailState.touched && emailState.error && (
          <span>{emailState.error}</span>
        )}
      </div>
      
      <button type="submit" disabled={!form.isValid || form.submitting}>
        {form.submitting ? 'Submitting...' : 'Login'}
      </button>
    </form>
  );
}
```

## Using useField Hook

For simpler field management, use the `useField` hook:

```tsx
import { useForm, useField, required } from 'suprform';

function TextField({ name, label, form }) {
  const { field, meta } = useField({ name, form });

  return (
    <div>
      <label>{label}</label>
      <input
        value={field.value || ''}
        onChange={(e) => field.onChange(e.target.value)}
        onBlur={field.onBlur}
      />
      {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
  );
}

function MyForm() {
  const form = useForm({
    initialValues: { name: '', email: '' },
    onSubmit: (values) => console.log(values)
  });

  form.registerField('name', {
    validators: [{ rule: required() }]
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.submitForm(); }}>
      <TextField name="name" label="Name" form={form} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Built-in Validators

- `required(message?)` - Validates that a field is not empty
- `minLength(min, message?)` - Validates minimum string length
- `maxLength(max, message?)` - Validates maximum string length
- `email(message?)` - Validates email format
- `pattern(regex, message?)` - Validates against a regex pattern
- `min(value, message?)` - Validates minimum numeric value
- `max(value, message?)` - Validates maximum numeric value
- `matches(fieldName, message?)` - Validates that a field matches another field
- `combine(...validators)` - Combines multiple validators

## Custom Validators

Create custom validators easily:

```tsx
import { ValidationRule } from 'suprform';

const isStrongPassword: ValidationRule = (value: string) => {
  if (!value) return undefined;
  
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumbers = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*]/.test(value);
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return 'Password must contain uppercase, lowercase, numbers, and special characters';
  }
  
  return undefined;
};

// Use in your form
form.registerField('password', {
  validators: [{ rule: isStrongPassword }]
});
```

## API Reference

### useForm(config)

Creates a form instance with state management and validation.

**Parameters:**
- `config.initialValues` - Initial form values
- `config.onSubmit` - Submit handler function
- `config.validateOnChange` - Validate fields on change (default: true)
- `config.validateOnBlur` - Validate fields on blur (default: true)

**Returns:**
- `values` - Current form values
- `errors` - Field errors
- `touched` - Touched field states
- `dirty` - Whether form has been modified
- `submitting` - Whether form is being submitted
- `submitCount` - Number of submission attempts
- `isValid` - Whether form is valid
- `setFieldValue(name, value)` - Set a field value
- `setFieldError(name, error)` - Set a field error
- `setFieldTouched(name, touched)` - Set field touched state
- `resetForm()` - Reset form to initial state
- `validateField(name)` - Validate a single field
- `validateForm()` - Validate all fields
- `submitForm()` - Submit the form
- `getFieldState(name)` - Get field state
- `getFieldHandlers(name)` - Get field handlers
- `registerField(name, config)` - Register a field
- `unregisterField(name)` - Unregister a field

### useField(props)

Hook for managing individual fields.

**Parameters:**
- `name` - Field name
- `form` - Form instance from useForm
- `defaultValue` - Default field value
- `validators` - Array of validators

**Returns:**
- `field` - Field props (value, onChange, onBlur, onFocus)
- `meta` - Field metadata (error, touched, dirty, validating)
- `helpers` - Field helper functions

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
