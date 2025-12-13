# suprform

A lightweight, **design system agnostic** React form library built as a powerful wrapper on top of **[react-hook-form](https://react-hook-form.com)**. Manage complex forms, validation, and error handling with a clean, composable API—no UI components bundled, complete control over your design.

> **What is SuprForm?** A thin, type-safe layer on top of `react-hook-form` that adds intuitive field management, built-in validation rules, and automatic error display—while staying completely design-system agnostic.

## Key Highlights

- 🎨 **Design System Agnostic** - Works with any UI framework (Material-UI, Tailwind, custom components, etc.) or plain HTML
- 🪝 **Built on react-hook-form** - Leverages the performance and flexibility of the most popular form library
- 🔒 **TypeScript First** - Full type safety and IntelliSense support with complete type inference
- ✅ **Seamless Validation** - Declarative validation rules with built-in validators and custom rule support
- 🎯 **Field-Level Control** - Granular control over individual fields with automatic state tracking
- 📊 **Automatic State Management** - Tracks dirty, touched, valid, error, and submission states
- ⚡ **Async Validation** - Native support for asynchronous validation (API calls, etc.)
- 🧪 **Well Tested** - Comprehensive test suite with full coverage
- 📦 **Minimal Footprint** - Only requires React as a peer dependency

## Installation

````bash
npm install suprform

## Quick Start with SuprForm.Control

The easiest way to get started—use the composable `SuprForm.Control` component with your own UI components:

```tsx
import SuprForm from 'suprform';

function LoginForm() {
  return (
    <SuprForm
      onSubmit={(values) => {
        console.log('Form submitted:', values);
      }}
    >
      <SuprForm.Control
        name='email'
        label='Email Address'
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
      >
        <input type='email' placeholder='you@example.com' />
      </SuprForm.Control>

      <SuprForm.Control
        name='password'
        label='Password'
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' },
        }}
      >
        <input type='password' placeholder='••••••••' />
      </SuprForm.Control>

      <button type='submit'>Login</button>
    </SuprForm>
  );
}
````

**That's it!** `SuprForm.Control` automatically:

- Renders a label above the input
- Validates on blur and change
- Displays error messages below the input
- Manages field state (touched, dirty, value, etc.)

Works with any input component—plain HTML, styled divs, Material-UI inputs, custom components, etc.

## Advanced Example: Custom UI Components

Since SuprForm is **design system agnostic**, use it with your favorite component library:

```tsx
import SuprForm from 'suprform';
import { TextField, Button } from '@mui/material'; // or your own

function SignupForm() {
  return (
    <SuprForm
      onSubmit={(values) => {
        console.log('User signed up:', values);
      }}
    >
      <SuprForm.Control
        name='username'
        label='Username'
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'Min 3 characters' },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Only letters, numbers, and underscores',
          },
        }}
      >
        <TextField variant='outlined' fullWidth />
      </SuprForm.Control>

      <SuprForm.Control
        name='email'
        label='Email'
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email',
          },
        }}
      >
        <TextField type='email' variant='outlined' fullWidth />
      </SuprForm.Control>

      <Button variant='contained' type='submit'>
        Sign Up
      </Button>
    </SuprForm>
  );
}
```

## Styling

Since SuprForm is **design system agnostic**, styling is completely in your control. Here are the CSS classes generated:

```css
/* Wrapper for the entire field */
.controlled-field {
  /* Your styles */
}

/* Label element */
.controlled-field-label {
  /* Your styles */
}

/* Error message container */
.controlled-field-error {
  /* Defaults to red, 14px font, margin-top 4px */
  /* Override with your own styles */
}
```

**Example with Tailwind CSS:**

```tsx
<SuprForm.Control
  name='email'
  label='Email'
  rules={{ required: 'Email is required' }}
  className='mb-4'
>
  <input
    type='email'
    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2'
  />
</SuprForm.Control>
```

**Example with styled-components:**

```tsx
import styled from 'styled-components';

const StyledField = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #0066cc;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }
  }

  .controlled-field-error {
    color: #d32f2f;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
`;

function EmailField() {
  return (
    <SuprForm.Control
      name='email'
      label='Email'
      rules={{ required: 'Email is required' }}
      className={StyledField}
    >
      <input type='email' />
    </SuprForm.Control>
  );
}
```

## Publishing

To publish a new version to npm:

1. Ensure you are logged in to npm:

```bash
npm login
```

2. Build the package (runs automatically via `prepublishOnly`):

```bash
npm run build
```

3. Bump the version and publish:

```bash
npm version patch   # or minor/major
npm publish --access public --otp=XXXXXX
```

(Replace `XXXXXX` with your 2FA code if you have 2FA enabled.)

The published package contains only the compiled `dist/` files with ESM/CJS builds and TypeScript declarations.

## Validation Rules

All validation rules come from **react-hook-form**. Pass them directly to the `rules` prop:

```tsx
<SuprForm.Control
  name='age'
  rules={{
    required: 'Age is required',
    min: { value: 18, message: 'Must be 18 or older' },
    max: { value: 120, message: 'Please enter a valid age' },
  }}
>
  <input type='number' />
</SuprForm.Control>
```

### Common Rules

- `required` / `required: "message"` - Field must not be empty
- `minLength: { value: 5, message: "..." }` - Minimum string length
- `maxLength: { value: 20, message: "..." }` - Maximum string length
- `min: { value: 0, message: "..." }` - Minimum numeric value
- `max: { value: 100, message: "..." }` - Maximum numeric value
- `pattern: { value: /regex/, message: "..." }` - Match a regex pattern
- `validate: (value) => true || "error message"` - Custom synchronous validation
- `validate: async (value) => true || "error message"` - Custom async validation

### Custom Validation Example

```tsx
<SuprForm.Control
  name='password'
  rules={{
    required: 'Password is required',
    minLength: { value: 8, message: 'Must be at least 8 characters' },
    validate: async (value) => {
      const isCommon = await checkIfPasswordIsCommon(value);
      return !isCommon || 'This password is too common';
    },
  }}
>
  <input type='password' />
</SuprForm.Control>
```

## API Reference

### SuprForm Component

The root form wrapper (powered by `FormProvider` from react-hook-form).

**Props:**

- `children` - Form fields and elements
- `onSubmit` - Handler called with form values when form is valid
- `className` - CSS class for the `<form>` element
- `style` - Inline styles for the `<form>` element
- `formOptions` - Options passed to react-hook-form's `useForm()` hook

**Example:**

```tsx
<SuprForm
  onSubmit={(values) => console.log(values)}
  formOptions={{
    mode: 'onBlur', // Validate on blur instead of on change
    reValidateMode: 'onChange',
  }}
>
  {/* controls */}
</SuprForm>
```

### SuprForm.Control Component

Composable field control component that wraps your input elements.

**Props:**

- `name` - Field name (must match form values)
- `label` - Optional label text (rendered above input with `htmlFor` linking)
- `children` - Your input component (any React element)
- `rules` - Validation rules (react-hook-form's `RegisterOptions`)
- `className` - CSS class for the wrapper div

**Example:**

```tsx
<SuprForm.Control
  name='email'
  label='Email'
  rules={{ required: 'Email is required' }}
  className='form-field'
>
  <input type='email' />
</SuprForm.Control>
```

**Automatic Features:**

- Renders `<label>` when `label` prop is provided
- Displays error message below input (in red, styled as `.controlled-field-error`)
- Injects `name`, `value`, `onChange`, `onBlur`, and `error` props to child input
- Handles field state automatically (touched, dirty, valid)
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
