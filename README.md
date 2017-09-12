# validation-message-format
Definition of validation-message format for validation accross application/s.

## Motivation
Show validation error details on a form, based on validation checks on both front-end and back-end.

Example of additional validation sources that could be bridged to this format

 - XSD validation 
 - custom checks on the back-end
 - EJB validation
 - other backend validation technologies
 - ...

# Goals
Defining a single validation message format accross different validaion sources will enable esay
display of error message in the proper context/location of the UI.

## Validaton sources
  - Input validation - validation of user input directly at the UI component
    - marks self when input is not valid
    - accepts validation message to mark self
  - Value validation in front-end 
    - validation that is not feasible on the input directly
    - receive validation form back-end
    - convert validation-message if back-end uses different format
    - convert validation-message if front-end uses different format
  - Value validation in back-end 
    - UI can not be trusted
    - checks that require backend processing (duplicatte username, etc.)

