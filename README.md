# @robhan-cdk-lib/utils

Utility functions for robhan-cdk-lib projects.

## Functionalities

### Validation

Defines commonly used functions for validating user provided attribute values.

Example:

```typescript
import { validateArrayLength } from '@robhan-cdk-lib/utils';

const tags = ['typescript', 'validation'];

const errors = validateArrayLength({
  value: tags,
  min: 3,
  max: 5,
  messagePrefix: 'Tags: ',
});

if (errors.length > 0) {
  console.error('Validation failed:', errors);
} else {
  console.log('Array length is valid.');
}

```

Expected output:

```
Validation failed: [ 'Tags: must have at least 3 elements' ]
```