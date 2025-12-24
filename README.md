# SuprForm 🚀

<div align="center">

**A headless, TypeScript-first React form library for managing complex state, validation, and conditional logic**

[![npm version](https://img.shields.io/npm/v/suprform.svg)](https://www.npmjs.com/package/suprform)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[Features](#-key-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-api-reference) • [Examples](#-usage-examples)

</div>

---

## 🎯 What is SuprForm?

SuprForm is a **headless form library** that gives you complete control over your form's appearance while handling all the complex logic under the hood. Built on top of `react-hook-form`, it provides:

- ✨ **Zero UI dependencies** - Works with any design system (Material-UI, Ant Design, shadcn/ui, plain HTML)
- 🎯 **Composable components** - Intuitive API with `SuprForm.Control` and `SuprForm.ControlArray`
- 🔒 **TypeScript-first** - Full type inference for field names, values, and validation
- 👁️ **Conditional logic** - Declarative field visibility and disability based on other fields
- ✅ **Powerful validation** - Sync and async validation with helpful error messages
- 🎛️ **Imperative control** - Access form methods via ref for programmatic manipulation
- 📦 **Lightweight** - Only React as a peer dependency

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Core Concepts](#-core-concepts)
- [Usage Examples](#-usage-examples)
  - [Basic Form](#1-basic-form)
  - [With UI Libraries](#2-with-ui-libraries-material-ui-antd-shadcnui)
  - [Conditional Fields](#3-conditional-field-visibility)
  - [Field Arrays](#4-dynamic-field-arrays)
  - [Async Validation](#5-async-validation)
  - [Form Control via Ref](#6-programmatic-form-control)
- [API Reference](#-api-reference)
- [TypeScript Guide](#-typescript-guide)
- [Styling](#-styling)
- [FAQs](#-frequently-asked-questions)
- [Contributing](#-contributing)

---

## ✨ Key Features

### 🎨 Design System Agnostic

Use with **any** UI framework. SuprForm provides the logic, you control the design.

```tsx
// Works with Material-UI
<SuprForm.Control name="email" rules={{ required: true }}>
  <TextField variant="outlined" />
</SuprForm.Control>

// Works with plain HTML
<SuprForm.Control name="email" rules={{ required: true }}>
  <input type="email" className="my-input" />
</SuprForm.Control>

// Works with shadcn/ui
<SuprForm.Control name="email">
  <Input type="email" />
</SuprForm.Control>
```

### 🎯 Composable Field Control

The `SuprForm.Control` component handles everything automatically:

- ✅ Label rendering with proper `htmlFor` linking
- ✅ Error message display (auto-styled but customizable)
- ✅ Validation on blur and change
- ✅ Field state management (value, touched, dirty)
- ✅ Works with **any** input component

### 🔒 TypeScript-First Architecture

Full type inference for field names, values, and validation rules:

```tsx
interface UserForm {
  email: string;
  age: number;
  isSubscribed: boolean;
}

<SuprForm<UserForm>
  onSubmit={(values) => {
    // ✅ values is fully typed as UserForm
    console.log(values.email.toLowerCase()); // Type-safe!
  }}
>
  <SuprForm.Control name='email' /> {/* ✅ Autocomplete works */}
  <SuprForm.Control name='age' /> {/* ✅ Type-checked */}
  <SuprForm.Control name='invalid' /> {/* ❌ TypeScript error! */}
</SuprForm>;
```

### 👁️ Conditional Field Visibility

Declaratively show/hide or enable/disable fields based on other field values:

```tsx
<SuprForm.Control
  name='promoCode'
  visibility={{
    operator: 'AND',
    conditions: [
      { name: 'hasDiscount', operator: 'EQUALS', value: true },
      { name: 'orderTotal', operator: 'GREATER_THAN', value: 50 },
    ],
  }}
>
  <input type='text' />
</SuprForm.Control>
```

**Supported operators:** `EQUALS`, `NOT_EQUALS`, `GREATER_THAN`, `LESS_THAN`, `GREATER_THAN_OR_EQUAL`, `LESS_THAN_OR_EQUAL`, `STARTS_WITH`, `ENDS_WITH`, `INCLUDES`, `NOT_INCLUDES`

### ✅ Powerful Validation

Sync and async validation with helpful error messages:

```tsx
<SuprForm.Control
  name='username'
  rules={{
    required: 'Username is required',
    minLength: { value: 3, message: 'Min 3 characters' },
    validate: async (value) => {
      const available = await checkUsername(value);
      return available || 'Username already taken';
    },
  }}
>
  <input />
</SuprForm.Control>
```

### 🎛️ Imperative Form Control

Access form methods via ref for programmatic manipulation:

```tsx
const formRef = useRef<SuprFormRef<FormData>>();

<SuprForm ref={formRef} onSubmit={handleSubmit}>
  {/* ... */}
</SuprForm>;

// Later:
formRef.current?.setValue('email', 'user@example.com');
formRef.current?.trigger('email'); // Validate
formRef.current?.reset(); // Reset form
```

### 🔄 Dynamic Field Arrays

Manage repeating field groups with `SuprForm.ControlArray`:

```tsx
<SuprForm.ControlArray name='hobbies' ref={arrayRef}>
  <SuprForm.Control name='name' label='Hobby Name'>
    <input />
  </SuprForm.Control>
  <SuprForm.Control name='years' label='Years'>
    <input type='number' />
  </SuprForm.Control>
</SuprForm.ControlArray>;

// Add/remove items:
arrayRef.current?.append({ name: '', years: 0 });
arrayRef.current?.remove(0);
```

---

## 📦 Installation

```bash
npm install suprform
```

**Peer dependencies:** React 18 or 19

```bash
npm install react react-dom
```

---

## ⚡ Quick Start

Here's a complete login form in under 30 lines:

```tsx
import SuprForm from 'suprform';

function LoginForm() {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log('Form submitted:', values);
    // Call your API here
  };

  return (
    <SuprForm onSubmit={handleSubmit}>
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
          minLength: { value: 8, message: 'Min 8 characters' },
        }}
      >
        <input type='password' placeholder='••••••••' />
      </SuprForm.Control>

      <button type='submit'>Login</button>
    </SuprForm>
  );
}
```

**That's it!** SuprForm automatically handles:

- ✅ Form submission
- ✅ Validation on blur and submit
- ✅ Error message display
- ✅ Field state management
- ✅ Label rendering

---

## 💡 Core Concepts

### 1. The `<SuprForm>` Component

The root component that wraps your form:

```tsx
<SuprForm
  onSubmit={(values) => console.log(values)}
  onError={(errors) => console.error(errors)}
  formOptions={{ mode: 'onBlur' }} // react-hook-form options
  showAsterisk={true} // Show * on required fields
>
  {/* Your form fields */}
</SuprForm>
```

### 2. The `<SuprForm.Control>` Component

Wraps individual input fields:

```tsx
<SuprForm.Control
  name="fieldName"           // Required: field identifier
  label="Field Label"        // Optional: displays above input
  rules={{                   // Optional: validation rules
    required: 'Required!',
    minLength: { value: 3, message: 'Too short' }
  }}
  visibility={{              // Optional: conditional rendering
    operator: 'AND',
    conditions: [...]
  }}
>
  <input type="text" />      {/* Your input component */}
</SuprForm.Control>
```

### 3. The `<SuprForm.ControlArray>` Component

Manages dynamic lists of fields:

```tsx
const arrayRef = useRef<FormControlArrayRef>();

<SuprForm.ControlArray name="items" ref={arrayRef}>
  <SuprForm.Control name="title">
    <input />
  </SuprForm.Control>
  <SuprForm.Control name="quantity">
    <input type="number" />
  </SuprForm.Control>
</SuprForm.ControlArray>

<button onClick={() => arrayRef.current?.append({ title: '', quantity: 0 })}>
  Add Item
</button>
```

---

## 🎨 Usage Examples

### 1. Basic Form

```tsx
import SuprForm from 'suprform';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  return (
    <SuprForm<ContactForm>
      onSubmit={(values) => {
        console.log('Submitting:', values);
      }}
    >
      <SuprForm.Control name='name' label='Your Name' rules={{ required: 'Name is required' }}>
        <input type='text' />
      </SuprForm.Control>

      <SuprForm.Control
        name='email'
        label='Email'
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/,
            message: 'Invalid email',
          },
        }}
      >
        <input type='email' />
      </SuprForm.Control>

      <SuprForm.Control
        name='message'
        label='Message'
        rules={{ minLength: { value: 10, message: 'Min 10 characters' } }}
      >
        <textarea rows={4} />
      </SuprForm.Control>

      <button type='submit'>Send Message</button>
    </SuprForm>
  );
}
```

### 2. With UI Libraries (Material-UI, AntD, shadcn/ui)

SuprForm works seamlessly with any component library:

**Material-UI:**

```tsx
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import SuprForm from 'suprform';

function MUIForm() {
  return (
    <SuprForm onSubmit={(values) => console.log(values)}>
      <SuprForm.Control name='username' label='Username' rules={{ required: 'Required' }}>
        <TextField variant='outlined' fullWidth />
      </SuprForm.Control>

      <SuprForm.Control name='subscribe'>
        <FormControlLabel control={<Checkbox />} label='Subscribe to newsletter' />
      </SuprForm.Control>

      <Button variant='contained' type='submit'>
        Submit
      </Button>
    </SuprForm>
  );
}
```

**shadcn/ui:**

```tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SuprForm from 'suprform';

function ShadcnForm() {
  return (
    <SuprForm onSubmit={(values) => console.log(values)}>
      <SuprForm.Control name='email' label='Email' rules={{ required: true }}>
        <Input type='email' placeholder='Email' />
      </SuprForm.Control>

      <Button type='submit'>Submit</Button>
    </SuprForm>
  );
}
```

### 3. Conditional Field Visibility

Show/hide fields based on other field values:

```tsx
interface PaymentForm {
  paymentMethod: 'card' | 'paypal' | 'cash';
  cardNumber?: string;
  paypalEmail?: string;
}

function PaymentForm() {
  return (
    <SuprForm<PaymentForm> onSubmit={(values) => console.log(values)}>
      <SuprForm.Control name='paymentMethod' label='Payment Method'>
        <select>
          <option value='card'>Credit Card</option>
          <option value='paypal'>PayPal</option>
          <option value='cash'>Cash</option>
        </select>
      </SuprForm.Control>

      {/* Only show when card is selected */}
      <SuprForm.Control
        name='cardNumber'
        label='Card Number'
        visibility={{
          operator: 'AND',
          conditions: [{ name: 'paymentMethod', operator: 'EQUALS', value: 'card' }],
        }}
        rules={{ required: 'Card number required' }}
      >
        <input type='text' placeholder='1234 5678 9012 3456' />
      </SuprForm.Control>

      {/* Only show when PayPal is selected */}
      <SuprForm.Control
        name='paypalEmail'
        label='PayPal Email'
        visibility={{
          operator: 'AND',
          conditions: [{ name: 'paymentMethod', operator: 'EQUALS', value: 'paypal' }],
        }}
        rules={{ required: 'PayPal email required' }}
      >
        <input type='email' />
      </SuprForm.Control>

      <button type='submit'>Submit Payment</button>
    </SuprForm>
  );
}
```

**Complex conditions with OR:**

```tsx
<SuprForm.Control
  name='discountCode'
  visibility={{
    operator: 'OR', // Show if ANY condition is true
    conditions: [
      { name: 'isVip', operator: 'EQUALS', value: true },
      { name: 'orderTotal', operator: 'GREATER_THAN', value: 100 },
    ],
  }}
>
  <input placeholder='Enter discount code' />
</SuprForm.Control>
```

### 4. Dynamic Field Arrays

Manage repeating field groups:

```tsx
import { useRef } from 'react';
import SuprForm, { FormControlArrayRef } from 'suprform';

interface Education {
  school: string;
  degree: string;
  year: number;
}

interface ResumeForm {
  name: string;
  education: Education[];
}

function ResumeForm() {
  const educationRef = useRef<FormControlArrayRef<ResumeForm, 'education'>>();

  return (
    <SuprForm<ResumeForm>
      onSubmit={(values) => console.log(values)}
      formOptions={{
        defaultValues: {
          name: '',
          education: [{ school: '', degree: '', year: 2024 }]
        }
      }}
    >
      <SuprForm.Control name="name" label="Full Name">
        <input type="text" />
      </SuprForm.Control>

      <h3>Education</h3>
      <SuprForm.ControlArray name="education" ref={educationRef}>
        <div className="education-item">
          <SuprForm.Control name="school" label="School">
            <input type="text" />
          </SuprForm.Control>

          <SuprForm.Control name="degree" label="Degree">
            <input type="text" />
          </SuprForm.Control>

          <SuprForm.Control name="year" label="Graduation Year">
            <input type="number" />
          </SuprForm.Control>

          <button
            type="button"
            onClick={() => {
              const index = /* get current index */;
              educationRef.current?.remove(index);
            }}
          >
            Remove
          </button>
        </div>
      </SuprForm.ControlArray>

      <button
        type="button"
        onClick={() => {
          educationRef.current?.append({ school: '', degree: '', year: 2024 });
        }}
      >
        + Add Education
      </button>

      <button type="submit">Save Resume</button>
    </SuprForm>
  );
}
```

**Field Array Methods (via ref):**

- `append(value)` - Add item to end
- `prepend(value)` - Add item to beginning
- `insert(index, value)` - Insert at position
- `remove(index)` - Remove item
- `move(from, to)` - Reorder items
- `update(index, value)` - Update item
- `replace(values)` - Replace all items

### 5. Async Validation

Validate against your backend:

```tsx
function SignupForm() {
  const checkUsernameAvailability = async (username: string) => {
    const response = await fetch(`/api/check-username?name=${username}`);
    const data = await response.json();
    return data.available;
  };

  return (
    <SuprForm onSubmit={(values) => console.log(values)}>
      <SuprForm.Control
        name='username'
        label='Username'
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'Min 3 characters' },
          validate: async (value) => {
            const available = await checkUsernameAvailability(value);
            return available || 'Username already taken';
          },
        }}
      >
        <input type='text' />
      </SuprForm.Control>

      <SuprForm.Control
        name='email'
        label='Email'
        rules={{
          required: true,
          validate: async (value) => {
            const response = await fetch(`/api/check-email?email=${value}`);
            const data = await response.json();
            return data.available || 'Email already registered';
          },
        }}
      >
        <input type='email' />
      </SuprForm.Control>

      <button type='submit'>Sign Up</button>
    </SuprForm>
  );
}
```

### 6. Programmatic Form Control

Access form methods via ref:

```tsx
import { useRef } from 'react';
import SuprForm, { SuprFormRef } from 'suprform';

interface UserForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginFormWithRef() {
  const formRef = useRef<SuprFormRef<UserForm>>();

  const prefillForm = () => {
    formRef.current?.setValue('email', 'demo@example.com');
    formRef.current?.setValue('password', 'password123');
    formRef.current?.setValue('rememberMe', true);
  };

  const clearForm = () => {
    formRef.current?.reset();
  };

  const validateEmail = () => {
    formRef.current?.trigger('email');
  };

  const watchEmail = () => {
    const email = formRef.current?.getValues('email');
    console.log('Current email:', email);
  };

  return (
    <div>
      <div className='actions'>
        <button onClick={prefillForm}>Prefill Demo</button>
        <button onClick={clearForm}>Clear</button>
        <button onClick={validateEmail}>Validate Email</button>
        <button onClick={watchEmail}>Get Email Value</button>
      </div>

      <SuprForm<UserForm> ref={formRef} onSubmit={(values) => console.log(values)}>
        <SuprForm.Control name='email' label='Email'>
          <input type='email' />
        </SuprForm.Control>

        <SuprForm.Control name='password' label='Password'>
          <input type='password' />
        </SuprForm.Control>

        <SuprForm.Control name='rememberMe'>
          <label>
            <input type='checkbox' /> Remember me
          </label>
        </SuprForm.Control>

        <button type='submit'>Login</button>
      </SuprForm>
    </div>
  );
}
```

---

## 📖 API Reference

### `<SuprForm>`

Root form component.

#### Props

| Prop           | Type                  | Description                                       |
| -------------- | --------------------- | ------------------------------------------------- |
| `children`     | `ReactNode`           | Form fields and elements                          |
| `onSubmit`     | `(values: T) => void` | Called when form is valid and submitted           |
| `onError`      | `(errors) => void`    | Called when form submission fails validation      |
| `formOptions`  | `UseFormProps`        | Options passed to `react-hook-form`'s `useForm()` |
| `className`    | `string`              | CSS class for `<form>` element                    |
| `style`        | `CSSProperties`       | Inline styles for `<form>`                        |
| `showAsterisk` | `boolean`             | Show red asterisk on required field labels        |
| `ref`          | `Ref<SuprFormRef>`    | Access form methods imperatively                  |
| `onChange`     | `(values: T) => void` | Called whenever any field value changes           |

#### Example

```tsx
<SuprForm
  onSubmit={(values) => console.log('Submit:', values)}
  onError={(errors) => console.error('Errors:', errors)}
  formOptions={{
    mode: 'onBlur',          // When to validate
    defaultValues: {...},     // Initial values
  }}
  showAsterisk={true}
  onChange={(values) => console.log('Changed:', values)}
>
  {/* fields */}
</SuprForm>
```

### `<SuprForm.Control>`

Field wrapper component.

#### Props

| Prop               | Type                    | Description                             |
| ------------------ | ----------------------- | --------------------------------------- |
| `name` ⚠️          | `string`                | **Required.** Field name (type-checked) |
| `children` ⚠️      | `ReactElement`          | **Required.** Your input component      |
| `rules`            | `RegisterOptions`       | Validation rules (see below)            |
| `label`            | `string`                | Label text rendered above input         |
| `className`        | `string`                | CSS class for wrapper `<div>`           |
| `id`               | `string`                | HTML id (auto-generated if omitted)     |
| `disabled`         | `boolean \| Visibility` | Disable field (can be conditional)      |
| `visibility`       | `boolean \| Visibility` | Show/hide field (can be conditional)    |
| `shouldUnregister` | `boolean`               | Unregister field when unmounted         |

#### Example

```tsx
<SuprForm.Control
  name='email'
  label='Email Address'
  rules={{
    required: 'Email is required',
    pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
  }}
  className='mb-4'
>
  <input type='email' />
</SuprForm.Control>
```

### `<SuprForm.ControlArray>`

Dynamic field array component.

#### Props

| Prop          | Type                         | Description                      |
| ------------- | ---------------------------- | -------------------------------- |
| `name` ⚠️     | `string`                     | **Required.** Array field name   |
| `children` ⚠️ | `ReactNode`                  | **Required.** Field template     |
| `ref`         | `Ref<FormControlArrayRef>`   | Access array methods             |
| `rules`       | `RegisterOptions`            | Validation rules for array       |
| `className`   | `string`                     | CSS class for wrapper            |
| `visibility`  | `Record<string, Visibility>` | Conditional visibility per field |
| `disabled`    | `Record<string, Visibility>` | Conditional disability per field |

#### Example

```tsx
<SuprForm.ControlArray name='hobbies' ref={arrayRef}>
  <SuprForm.Control name='name'>
    <input />
  </SuprForm.Control>
  <SuprForm.Control name='years'>
    <input type='number' />
  </SuprForm.Control>
</SuprForm.ControlArray>
```

### Validation Rules

SuprForm uses `react-hook-form` validation rules:

| Rule        | Type                                      | Description                |
| ----------- | ----------------------------------------- | -------------------------- |
| `required`  | `string \| boolean`                       | Field is required          |
| `min`       | `{ value: number, message: string }`      | Minimum numeric value      |
| `max`       | `{ value: number, message: string }`      | Maximum numeric value      |
| `minLength` | `{ value: number, message: string }`      | Minimum string length      |
| `maxLength` | `{ value: number, message: string }`      | Maximum string length      |
| `pattern`   | `{ value: RegExp, message: string }`      | Regex pattern match        |
| `validate`  | `(value) => boolean \| string \| Promise` | Custom validation function |

#### Examples

```tsx
// Simple required
rules={{ required: true }}

// Required with message
rules={{ required: 'This field is required' }}

// Multiple rules
rules={{
  required: 'Email is required',
  pattern: {
    value: /^\S+@\S+$/,
    message: 'Invalid email format'
  }
}}

// Custom validation
rules={{
  validate: (value) => {
    if (value.length < 8) return 'Too short';
    if (!/[A-Z]/.test(value)) return 'Need uppercase';
    return true; // Valid
  }
}}

// Async validation
rules={{
  validate: async (value) => {
    const response = await fetch(`/api/check/${value}`);
    const data = await response.json();
    return data.valid || 'Invalid value';
  }
}}
```

### Conditional Visibility

The `visibility` prop accepts:

```typescript
{
  operator: 'AND' | 'OR',
  conditions: [
    {
      name: 'fieldName',        // Field to check
      operator: '...',          // Comparison operator
      value: any                // Value to compare
    }
  ]
}
```

#### Operators

**String operators:** `EQUALS`, `NOT_EQUALS`, `STARTS_WITH`, `ENDS_WITH`, `INCLUDES`, `NOT_INCLUDES`

**Number operators:** `EQUALS`, `NOT_EQUALS`, `GREATER_THAN`, `LESS_THAN`, `GREATER_THAN_OR_EQUAL`, `LESS_THAN_OR_EQUAL`

**Boolean operators:** `EQUALS`, `NOT_EQUALS`

#### Examples

```tsx
// Show when checkbox is checked
visibility={{
  operator: 'AND',
  conditions: [
    { name: 'agreeToTerms', operator: 'EQUALS', value: true }
  ]
}}

// Show when amount > 100 OR user is VIP
visibility={{
  operator: 'OR',
  conditions: [
    { name: 'amount', operator: 'GREATER_THAN', value: 100 },
    { name: 'isVip', operator: 'EQUALS', value: true }
  ]
}}

// Show when username starts with 'admin'
visibility={{
  operator: 'AND',
  conditions: [
    { name: 'username', operator: 'STARTS_WITH', value: 'admin' }
  ]
}}
```

### Form Ref Methods

When you pass a `ref` to `<SuprForm>`, you get:

```typescript
interface SuprFormRef<T> {
  setValue: (name: keyof T, value: any) => void;
  setError: (name: keyof T, error: ErrorOption) => void;
  clearErrors: (name?: keyof T | keyof T[]) => void;
  getValues: (name?: keyof T) => any;
  reset: (values?: Partial<T>) => void;
  setFocus: (name: keyof T) => void;
  resetField: (name: keyof T) => void;
  trigger: (name?: keyof T | keyof T[]) => Promise<boolean>;
  unregister: (name: keyof T) => void;
  watch: (name?: keyof T) => any;
  handleSubmit: (
    onValid: (data: T) => void,
    onInvalid?: (errors: any) => void
  ) => (e?: Event) => void;
}
```

#### Examples

```tsx
const formRef = useRef<SuprFormRef<FormData>>();

// Set field value
formRef.current?.setValue('email', 'user@example.com');

// Set field error
formRef.current?.setError('email', {
  type: 'manual',
  message: 'This email is already taken',
});

// Clear all errors
formRef.current?.clearErrors();

// Get current values
const values = formRef.current?.getValues();
const email = formRef.current?.getValues('email');

// Reset form
formRef.current?.reset();
formRef.current?.reset({ email: 'default@example.com' });

// Focus field
formRef.current?.setFocus('email');

// Trigger validation
const isValid = await formRef.current?.trigger();
await formRef.current?.trigger('email'); // Validate single field

// Watch field value
const watchedEmail = formRef.current?.watch('email');
```

### Field Array Ref Methods

When you pass a `ref` to `<SuprForm.ControlArray>`:

```typescript
interface FormControlArrayRef<T, TArrayName> {
  fields: Array<Record<'id', string> & FieldArrayItem>;
  append: (value: FieldArrayItem) => void;
  prepend: (value: FieldArrayItem) => void;
  insert: (index: number, value: FieldArrayItem) => void;
  remove: (index?: number | number[]) => void;
  move: (from: number, to: number) => void;
  update: (index: number, value: FieldArrayItem) => void;
  replace: (values: FieldArrayItem[]) => void;
}
```

#### Examples

```tsx
const arrayRef = useRef<FormControlArrayRef>();

// Add item to end
arrayRef.current?.append({ name: '', value: '' });

// Add item to beginning
arrayRef.current?.prepend({ name: '', value: '' });

// Insert at position
arrayRef.current?.insert(1, { name: 'New', value: 'Item' });

// Remove item(s)
arrayRef.current?.remove(0);
arrayRef.current?.remove([0, 2, 4]);

// Move item
arrayRef.current?.move(0, 3);

// Update item
arrayRef.current?.update(1, { name: 'Updated', value: 'Value' });

// Replace all items
arrayRef.current?.replace([
  { name: 'Item 1', value: '1' },
  { name: 'Item 2', value: '2' },
]);

// Access current fields
console.log(arrayRef.current?.fields);
```

---

## 🔷 TypeScript Guide

SuprForm is built with TypeScript-first design.

### Type Your Form Data

```tsx
interface SignupForm {
  username: string;
  email: string;
  age: number;
  agreeToTerms: boolean;
  hobbies: Array<{ name: string; years: number }>;
}

<SuprForm<SignupForm>
  onSubmit={(values) => {
    // values is typed as SignupForm
    console.log(values.username); // ✅ Type-safe
  }}
>
  {/* Field names are type-checked */}
  <SuprForm.Control name='username'>
    {' '}
    {/* ✅ Valid */}
    <input />
  </SuprForm.Control>

  <SuprForm.Control name='invalidField'>
    {' '}
    {/* ❌ TypeScript error */}
    <input />
  </SuprForm.Control>
</SuprForm>;
```

### Type Form Refs

```tsx
const formRef = useRef<SuprFormRef<SignupForm>>();

// All methods are type-safe
formRef.current?.setValue('username', 'john'); // ✅
formRef.current?.setValue('invalid', 'x'); // ❌ Error
```

### Type Field Array Refs

```tsx
const arrayRef = useRef<FormControlArrayRef<SignupForm, 'hobbies'>>();

// Methods know the shape of array items
arrayRef.current?.append({ name: '', years: 0 }); // ✅
arrayRef.current?.append({ invalid: 'x' }); // ❌ Error
```

### Infer Types from Default Values

```tsx
const defaultValues = {
  name: '',
  age: 0,
  email: '',
};

<SuprForm
  formOptions={{ defaultValues }}
  onSubmit={(values) => {
    // values is inferred as { name: string; age: number; email: string }
  }}
>
  {/* ... */}
</SuprForm>;
```

---

## 🎨 Styling

SuprForm is **design system agnostic**. Style it however you want:

### CSS Classes

SuprForm adds these classes for customization:

```css
.controlled-field {
  /* Wrapper for each field */
}

.controlled-field-label {
  /* Label element */
}

.controlled-field-error {
  /* Error message */
  /* Default: color: red; font-size: 13px; */
}
```

### Tailwind CSS

```tsx
<SuprForm.Control name='email' className='mb-6'>
  <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
</SuprForm.Control>
```

### CSS-in-JS (styled-components, emotion)

```tsx
import styled from 'styled-components';

const StyledField = styled.div`
  .controlled-field {
    margin-bottom: 1rem;
  }

  .controlled-field-label {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .controlled-field-error {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

<SuprForm.Control name='email' className={StyledField}>
  <input />
</SuprForm.Control>;
```

### Global Styles

```css
/* styles.css */
.controlled-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.controlled-field-label {
  font-weight: 500;
  color: #1a1a1a;
  font-size: 14px;
}

.controlled-field-error {
  color: #ef4444;
  font-size: 13px;
  margin-top: 4px;
}
```

### Override Component Styles

```tsx
<SuprForm.Control name='email' className='custom-field'>
  <input
    style={{
      padding: '12px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
    }}
  />
</SuprForm.Control>
```

---

## ❓ Frequently Asked Questions

### Can I use SuprForm with Material-UI / Ant Design / shadcn/ui?

**Yes!** SuprForm is design system agnostic. Just pass your component library's input components as children:

```tsx
// Material-UI
<SuprForm.Control name="email">
  <TextField variant="outlined" />
</SuprForm.Control>

// Ant Design
<SuprForm.Control name="username">
  <Input placeholder="Username" />
</SuprForm.Control>

// shadcn/ui
<SuprForm.Control name="password">
  <Input type="password" />
</SuprForm.Control>
```

### How do I set default values?

Use the `formOptions.defaultValues` prop:

```tsx
<SuprForm
  formOptions={{
    defaultValues: {
      email: 'user@example.com',
      age: 25,
      agreeToTerms: false,
    },
  }}
  onSubmit={handleSubmit}
>
  {/* fields */}
</SuprForm>
```

### How do I reset the form after submission?

Use a ref and call `reset()`:

```tsx
const formRef = useRef<SuprFormRef>();

<SuprForm
  ref={formRef}
  onSubmit={(values) => {
    console.log(values);
    formRef.current?.reset(); // Reset after submit
  }}
>
  {/* fields */}
</SuprForm>;
```

### How do I validate on change instead of on blur?

Pass `mode` in `formOptions`:

```tsx
<SuprForm formOptions={{ mode: 'onChange' }} onSubmit={handleSubmit}>
  {/* fields */}
</SuprForm>
```

Options: `onBlur` (default), `onChange`, `onSubmit`, `onTouched`, `all`

### Can I use custom validation functions?

Yes! Use the `validate` rule:

```tsx
<SuprForm.Control
  name='password'
  rules={{
    validate: (value) => {
      if (value.length < 8) return 'Min 8 characters';
      if (!/[A-Z]/.test(value)) return 'Need uppercase letter';
      if (!/[0-9]/.test(value)) return 'Need number';
      return true;
    },
  }}
>
  <input type='password' />
</SuprForm.Control>
```

### How do I access form values outside the form?

Use a ref and `getValues()`:

```tsx
const formRef = useRef<SuprFormRef>();

<SuprForm ref={formRef} onSubmit={handleSubmit}>
  {/* fields */}
</SuprForm>

<button onClick={() => {
  const values = formRef.current?.getValues();
  console.log(values);
}}>
  Log Values
</button>
```

### Can I watch field values in real-time?

Yes! Use the `onChange` prop:

```tsx
<SuprForm
  onChange={(values) => {
    console.log('Form changed:', values);
  }}
  onSubmit={handleSubmit}
>
  {/* fields */}
</SuprForm>
```

Or use the ref's `watch()` method:

```tsx
const formRef = useRef<SuprFormRef>();

useEffect(() => {
  const email = formRef.current?.watch('email');
  console.log('Email:', email);
}, []);
```

### How do I handle form submission errors?

Use the `onError` prop:

```tsx
<SuprForm
  onSubmit={(values) => console.log('Success:', values)}
  onError={(errors) => {
    console.error('Validation errors:', errors);
    // Show notification, etc.
  }}
>
  {/* fields */}
</SuprForm>
```

### Can I show a loading state during async validation?

Yes! Track the form's `isValidating` state:

```tsx
function MyForm() {
  const [isValidating, setIsValidating] = useState(false);

  return (
    <SuprForm onSubmit={handleSubmit}>
      <SuprForm.Control
        name='username'
        rules={{
          validate: async (value) => {
            setIsValidating(true);
            const available = await checkUsername(value);
            setIsValidating(false);
            return available || 'Username taken';
          },
        }}
      >
        <input disabled={isValidating} />
      </SuprForm.Control>

      {isValidating && <span>Checking...</span>}
    </SuprForm>
  );
}
```

### How do I conditionally disable fields?

Use the `disabled` prop with a visibility object:

```tsx
<SuprForm.Control
  name='creditCard'
  disabled={{
    operator: 'AND',
    conditions: [{ name: 'paymentMethod', operator: 'NOT_EQUALS', value: 'card' }],
  }}
>
  <input />
</SuprForm.Control>
```

Or use a simple boolean:

```tsx
<SuprForm.Control name='email' disabled={true}>
  <input />
</SuprForm.Control>
```

---

## 🚀 Advanced Topics

### Nested Objects

SuprForm supports nested field names using dot notation:

```tsx
interface UserForm {
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
}

<SuprForm<UserForm> onSubmit={handleSubmit}>
  <SuprForm.Control name='name'>
    <input />
  </SuprForm.Control>

  <SuprForm.Control name='address.street'>
    <input />
  </SuprForm.Control>

  <SuprForm.Control name='address.city'>
    <input />
  </SuprForm.Control>

  <SuprForm.Control name='address.zip'>
    <input />
  </SuprForm.Control>
</SuprForm>;
```

### Custom Error Messages

Customize error display:

```tsx
import { useFormContext } from 'react-hook-form';

function CustomFormControl({ name, children, label, rules }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div>
      <label>{label}</label>
      {children}
      {error && <div className='custom-error'>⚠️ {error.message}</div>}
    </div>
  );
}
```

### Server-Side Validation

Handle server errors:

```tsx
const formRef = useRef<SuprFormRef>();

const handleSubmit = async (values) => {
  try {
    await api.submitForm(values);
  } catch (error) {
    // Set server errors on fields
    if (error.field === 'email') {
      formRef.current?.setError('email', {
        type: 'server',
        message: error.message,
      });
    }
  }
};

<SuprForm ref={formRef} onSubmit={handleSubmit}>
  {/* fields */}
</SuprForm>;
```

### Dependent Field Validation

Validate one field based on another:

```tsx
<SuprForm.Control
  name="password"
  rules={{ required: 'Password required' }}
>
  <input type="password" />
</SuprForm.Control>

<SuprForm.Control
  name="confirmPassword"
  rules={{
    required: 'Confirm password',
    validate: (value, formValues) => {
      return value === formValues.password || 'Passwords must match';
    }
  }}
>
  <input type="password" />
</SuprForm.Control>
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Albinbritto/suprform.git
cd suprform

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the library
npm run build
```

### Project Structure

```
suprform/
├── src/
│   ├── components/
│   │   ├── SuprForm.tsx          # Root form component
│   │   ├── FormControl.tsx       # Field wrapper
│   │   ├── FormControlArray.tsx  # Dynamic arrays
│   │   ├── ConditionChecker.tsx  # Visibility logic
│   │   └── DisabilityChecker.tsx # Disability logic
│   ├── context/
│   │   └── SuprFormContext.tsx   # Form context
│   ├── type.ts                   # TypeScript types
│   ├── util.ts                   # Helper functions
│   └── index.ts                  # Public exports
├── dist/                         # Build output
├── package.json
└── README.md
```

### Running Storybook

```bash
npm run storybook
```

### Publishing

```bash
# Login to npm
npm login

# Build and publish
npm run build
npm version patch  # or minor/major
npm publish --access public
```

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Write/update tests
5. Run tests: `npm test`
6. Commit: `git commit -m "Add your feature"`
7. Push: `git push origin feature/your-feature`
8. Open a Pull Request

---

## 📄 License

MIT © [Albin Britto](https://github.com/Albinbritto)

---

## 🔗 Links

- **GitHub:** [https://github.com/Albinbritto/suprform](https://github.com/Albinbritto/suprform)
- **npm:** [https://www.npmjs.com/package/suprform](https://www.npmjs.com/package/suprform)
- **Issues:** [https://github.com/Albinbritto/suprform/issues](https://github.com/Albinbritto/suprform/issues)

---

## 💖 Support

If you find SuprForm helpful, please:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 📖 Improve documentation
- 🤝 Contribute code

---

**Made with ❤️ by [Albin Britto](https://github.com/Albinbritto)**
