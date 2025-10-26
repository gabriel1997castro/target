# Target

## Tables

### Targets table

- id - int - primary key
- name - text
- amount - float
- created_at - timestamp
- updated_at - timestamp

### Transactions table

- id - int - primary key
- target_id - int
- amount - float
- description - text
- created_at - timestamp
- updated_at - timestamp

### Relationships

- A target can have multiple transactions
- A transaction is related only to 1 target
