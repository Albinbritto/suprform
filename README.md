# SuprForm

A **headless React form library** that wraps [react-hook-form](https://react-hook-form.com) with a composable API for effortless form management. Design system agnostic, TypeScript-first, and built for developer experience.

## Core Features

### 🎨 **Design System Agnostic**

Use with any UI framework—Material-UI, Ant Design, Tailwind, shadcn/ui, or plain HTML. SuprForm provides the logic, you control the design.

```tsx
// Works with Material-UI
<SuprForm.Control name="email" rules={{ required: true }}>
  <TextField variant="outlined" />
</SuprForm.Control>

// Works with plain HTML
<SuprForm.Control name="email" rules={{ required: true }}>
  <input type="email" />
</SuprForm.Control>
```

### 🎯 **Composable Field Control**

The `SuprForm.Control` component wraps your inputs with automatic label rendering, error display, and validation—no configuration needed.

- Automatic label and error rendering
- Field state tracking (touched, dirty, valid)
- Seamless integration with any input component
- Full TypeScript inference for field names and values

### 🔒 **TypeScript-First Architecture**

Complete type safety with intelligent inference throughout your forms. Field names, validation rules, and form values are all fully typed.

```tsx
interface FormData {
  email: string;
  age: number;
}

<SuprForm<FormData>
  onSubmit={(values) => {
    // values is typed as FormData
    console.log(values.email); // ✓ Type-safe
  }}
>
  <SuprForm.Control name='email' /> {/* ✓ Type-checked */}
</SuprForm>;
```

### 👁️ **Conditional Field Visibility**

Advanced conditional rendering with declarative visibility rules. Show/hide fields based on other field values with AND/OR logic.

```tsx
<SuprForm.Control
  name='creditCard'
  visibility={{
    operator: 'AND',
    conditions: [
      { name: 'paymentMethod', operator: 'EQUALS', value: 'card' },
      { name: 'amount', operator: 'GREATER_THAN', value: 0 },
    ],
  }}
>
  <input />
</SuprForm.Control>
```

**Supported operators:** EQUALS, NOT_EQUALS, GREATER_THAN, LESS_THAN, STARTS_WITH, ENDS_WITH, INCLUDES

### ✅ **Declarative Validation**

Powered by react-hook-form's validation system with support for sync and async validators.

```tsx
<SuprForm.Control
  name='username'
  rules={{
    required: 'Username is required',
    minLength: { value: 3, message: 'Min 3 characters' },
    validate: async (value) => {
      const available = await checkAvailability(value);
      return available || 'Username taken';
    },
  }}
>
  <input />
</SuprForm.Control>
```

### 🎛️ **Imperative Form Control**

Access react-hook-form methods via ref for programmatic form manipulation.

```tsx
const formRef = useRef();

<SuprForm ref={formRef} onSubmit={handleSubmit}>
  {/* ... */}
</SuprForm>;

// Later:
formRef.current.setValue('email', 'test@example.com');
formRef.current.trigger('email'); // Manually validate
formRef.current.reset(); // Reset form
```

**Available methods:** `setValue`, `setError`, `clearErrors`, `getValues`, `reset`, `setFocus`, `resetField`, `trigger`, `unregister`, `watch`

### 📦 **Zero UI Dependencies**

Only React as a peer dependency. No CSS framework lock-in, no component library coupling. Bring your own design system.

---

## Quick Start

### Installation

```bash
npm install suprform
```

### Basic Example

The composable `SuprForm.Control` component handles everything for you:

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
```

SuprForm.Control **automatically handles**:

- Label rendering with proper `htmlFor` linking
- Validation on blur and change
- Error message display
- Field state management (value, touched, dirty, error)
- Works with any input component (HTML, Material-UI, custom, etc.)

---

## Advanced Usage

### With UI Component Libraries

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

### Conditional Field Visibility

Show/hide fields based on other field values:

```tsx
<SuprForm onSubmit={handleSubmit}>
  <SuprForm.Control name='hasDiscount' label='Apply Discount?'>
    <input type='checkbox' />
  </SuprForm.Control>

  {/* Only show when hasDiscount is checked */}
  <SuprForm.Control
    name='discountCode'
    label='Discount Code'
    visibility={{
      operator: 'AND',
      conditions: [{ name: 'hasDiscount', operator: 'EQUALS', value: true }],
    }}
    rules={{ required: 'Discount code required' }}
  >
    <input type='text' />
  </SuprForm.Control>
</SuprForm>
```

### Async Validation

```tsx
<SuprForm.Control
  name='username'
  rules={{
    required: 'Username is required',
    validate: async (value) => {
      const response = await fetch(`/api/check-username/${value}`);
      const data = await response.json();
      return data.available || 'Username already taken';
    },
  }}
>
  <input />
</SuprForm.Control>
```

### Programmatic Form Control

```tsx
function MyForm() {
  const formRef = useRef();

  const prefillForm = () => {
    formRef.current.setValue('email', 'user@example.com');
    formRef.current.setFocus('password');
  };

  return (
    <>
      <button onClick={prefillForm}>Prefill</button>
      <SuprForm ref={formRef} onSubmit={handleSubmit}>
        <SuprForm.Control name='email'>
          <input />
        </SuprForm.Control>
        <SuprForm.Control name='password'>
          <input type='password' />
        </SuprForm.Control>
      </SuprForm>
    </>
  );
}
```

---

## API Reference

### `<SuprForm>`

Root form component that wraps your form fields.

**Props:**

| Prop           | Type                  | Description                                  |
| -------------- | --------------------- | -------------------------------------------- |
| `children`     | `ReactNode`           | Form fields and elements                     |
| `onSubmit`     | `(values: T) => void` | Called with form values when valid           |
| `onError`      | `(errors) => void`    | Called when form submission fails validation |
| `formOptions`  | `UseFormProps`        | Options for react-hook-form's `useForm()`    |
| `className`    | `string`              | CSS class for `<form>` element               |
| `style`        | `CSSProperties`       | Inline styles for `<form>`                   |
| `showAsterisk` | `boolean`             | Show asterisk on required field labels       |
| `ref`          | `Ref`                 | Access form methods imperatively             |

**Example:**

```tsx
<SuprForm onSubmit={(values) => console.log(values)} formOptions={{ mode: 'onBlur' }} showAsterisk>
  {/* fields */}
</SuprForm>
```

### `<SuprForm.Control>`

Composable field wrapper that handles labels, errors, and validation.

**Props:**

| Prop               | Type                    | Description                                                 |
| ------------------ | ----------------------- | ----------------------------------------------------------- |
| `name`             | `string`                | **Required.** Field name (type-checked against form values) |
| `children`         | `ReactElement`          | **Required.** Your input component                          |
| `rules`            | `RegisterOptions`       | Validation rules (react-hook-form format)                   |
| `label`            | `string`                | Label text (rendered above input)                           |
| `className`        | `string`                | CSS class for wrapper div                                   |
| `id`               | `string`                | HTML id (auto-generated if not provided)                    |
| `disabled`         | `boolean`               | Disable the field                                           |
| `visibility`       | `Visibility \| boolean` | Conditional visibility rules                                |
| `shouldUnregister` | `boolean`               | Unregister field when unmounted                             |

**Example:**

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

### Validation Rules

SuprForm uses [react-hook-form validation rules](https://react-hook-form.com/docs/useform/register#options):

| Rule        | Type                                      | Description                |
| ----------- | ----------------------------------------- | -------------------------- |
| `required`  | `string \| boolean`                       | Field is required          |
| `min`       | `{ value: number, message: string }`      | Minimum numeric value      |
| `max`       | `{ value: number, message: string }`      | Maximum numeric value      |
| `minLength` | `{ value: number, message: string }`      | Minimum string length      |
| `maxLength` | `{ value: number, message: string }`      | Maximum string length      |
| `pattern`   | `{ value: RegExp, message: string }`      | Regex pattern match        |
| `validate`  | `(value) => boolean \| string \| Promise` | Custom validation function |

### Conditional Visibility

The `visibility` prop accepts:

```tsx
{
  operator: 'AND' | 'OR',
  conditions: [
    {
      name: 'fieldName',
      operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' |
                'GREATER_THAN_OR_EQUAL' | 'LESS_THAN_OR_EQUAL' |
                'STARTS_WITH' | 'ENDS_WITH' | 'INCLUDES' | 'NOT_INCLUDES',
      value: any
    }
  ]
}
```

**Example:**

```tsx
<SuprForm.Control
  name='promoCode'
  visibility={{
    operator: 'OR',
    conditions: [
      { name: 'isVip', operator: 'EQUALS', value: true },
      { name: 'orderTotal', operator: 'GREATER_THAN', value: 100 },
    ],
  }}
>
  <input />
</SuprForm.Control>
```

### Form Ref Methods

When you pass a `ref` to `<SuprForm>`, you get access to:

```tsx
formRef.current.setValue(name, value)      // Set field value
formRef.current.setError(name, error)      // Set field error
formRef.current.clearErrors(name?)         // Clear errors
formRef.current.getValues(name?)           // Get field value(s)
formRef.current.reset(values?)             // Reset form
formRef.current.setFocus(name)             // Focus field
formRef.current.resetField(name)           // Reset specific field
formRef.current.trigger(name?)             // Trigger validation
formRef.current.unregister(name)           // Unregister field
formRef.current.watch(name?)               // Watch field value(s)
```

---

---

## Styling

SuprForm is **design system agnostic**. Style using CSS classes:

```css
.controlled-field {
  /* Field wrapper */
}
.controlled-field-label {
  /* Label element */
}
.controlled-field-error {
  /* Error message (defaults: red, 14px, margin-top 4px) */
}
```

**Tailwind Example:**

```tsx
<SuprForm.Control name='email' className='mb-4'>
  <input className='w-full px-4 py-2 border rounded-lg focus:ring-2' />
</SuprForm.Control>
```

**styled-components Example:**

```tsx
const StyledField = styled.div`
  .controlled-field-label {
    font-weight: 600;
  }
  .controlled-field-error {
    color: #d32f2f;
  }
`;

<SuprForm.Control className={StyledField} name='email'>
  <input />
</SuprForm.Control>;
```

---

## Publishing

```bash
npm login
npm run build
npm version patch   # or minor/major
npm publish --access public --otp=XXXXXX
```

The published package contains only compiled `dist/` files (ESM/CJS + TypeScript declarations).

---

## License

MIT

## Contributing

Contributions welcome! Submit a Pull Request on [GitHub](https://github.com/Albinbritto/suprform).
