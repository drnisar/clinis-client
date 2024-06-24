import { Form } from "react-bootstrap";

interface Props {
  controlId: string;
  label: string;
  register: any;
  errors: any;
  name: string;
  options: string[];
}

const SelectInput = ({
  controlId,
  label,
  register,
  errors,
  name,
  options,
}: Props) => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label className="small text-muted">{label}</Form.Label>
      <Form.Control size="sm" as="select" {...register(name)}>
        <option value="select">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
      <Form.Text className="text-danger">
        {errors && errors[name]?.message}
      </Form.Text>
    </Form.Group>
  );
};

export default SelectInput;
