type InputType = 'text'|'email';

type InputValue = string;

type InputOnChange = (newValue: InputValue) => void;

type InputProps = {
    type: InputType,
    value: InputValue,
    onChange: InputOnChange;
}

interface IInputProps {
    type: InputType,
    value: InputValue,
    onChange: InputOnChange;
}