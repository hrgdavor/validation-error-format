# validation-error-format
Definition of validation-error format for validation accross application/s.

Motivation:

 - Show validation error details on a form, based on validation checks on both front-end and back-end.
 - Try to conform to a specific format (that can also be coneverted when integrating different systems).
 - Build UI components that understand the format to display validation information consistently.

Different backend validation sources could be bridged to this format on the already backend,
or later in frontend when error is received.

 - XSD validation 
 - custom checks on the back-end
 - EJB validation
 - other backend validation technologies
 - ...

# Goals
Defining a single validation error format accross different validation sources to enable easy
display of error message in the proper context/location of the UI. A single format that UI understands
is then basis for different validation sources to use or fixed/converted to the format the UI uses.

UI uses the full format, and sanitation from more compact format needs to be done beforehand. Reference implementation
will be coded here.

## Validaton sources
  - Input internal validation - self-validation of user input directly at the specific UI component
  - Value validation in front-end
    - validation that is not feasible/practical on the input component directly
  - Value validation in back-end
    - UI should not be trusted (especialy as requests can be faked and UI checks circumvented)
    - checks that require backend processing (duplicatte username, etc.)
    - validation that is already covered in backend, thus avoiding duplication/redundancy

convert validation-error if back-end uses different format 

## Top level format
Top level format depends on the receiver
  - a simple input component receives an object with keys: `error`,  `data`, `type`
  - a form receives additional key `nested` , value being an object with keys being names of inputs and values are info for each input
  - a list component receives additional key `nested`, value being an array with info for each list element

## NULL
NULL value or undefined means that validation has passed (no error whatsoever)

## examples
If we assume translation for `value_between` is `Value %{val}  must be between %{min}-%{max}`

```js
{
  error: "value_between",
  type: 'range',
  data: {val:10, min: 1, max:5}
}
```

having key `error` assumes there is an error, so a more compact version could be:

```
{
  error: "value_between",
}
```

having the key `nested`  assumes error and contains details for nested elements. 
Nested elements can be an Array or an Object 

```
{
  nested:{
    tel: {error: 'invalid_tel_format'}
  }
}

{
  nested:{
    tel: {error: 'invalid_tel_format'}
    locations:{
      error: "A location has invalid data"
      nested:[
        null,
        null,
        {
          nested:{
            name: {error: 'required', type:'required'}
          }
        }
      ]
    }
  }
}

```
