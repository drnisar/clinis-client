import { Form } from "react-bootstrap";

interface Props {
  controlId: string;
  label: string;
  register: any;
  name: string;
  errors: any;
  inputType: string;
}

const TextInput = ({
  controlId,
  label,
  register,
  name,
  errors,
  inputType,
}: Props) => {
  return (
    <>
      <Form.Group controlId={controlId}>
        <Form.Label className="small text-muted">{label}</Form.Label>
        <Form.Control size="sm" type={inputType} {...register(name)} />
        <Form.Text className="text-danger">
          {errors && errors[name]?.message}
        </Form.Text>
      </Form.Group>
    </>
  );
};

export default TextInput;
