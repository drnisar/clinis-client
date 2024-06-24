import { Button, Form } from "react-bootstrap";
import { Controller, set, useForm } from "react-hook-form";
import {
  SurgeryNotesFormData,
  useSurgeryNotesResolver,
  useCreateOTNotes,
} from "../../hooks/useOT";
import Creatable from "react-select/creatable";
import { useGetAllDrs } from "../../hooks/useDrs";

interface Props {
  OTId: {};
  handleClose: () => void;
  surgNotesData: {};
}

const SurgeryNotes = ({ OTId, handleClose, surgNotesData }: Props) => {
  // const [isOpen, setIsOpen] = useState(true);
  let defaultValuesForForm = surgNotesData?.find(
    (item: any) => item.OTId._id === OTId._id
  );

  if (defaultValuesForForm === undefined) {
    defaultValuesForForm = null;
  } else
    defaultValuesForForm.surgeryDate = new Date(
      defaultValuesForForm.surgeryDate
    )
      .toISOString()
      .slice(0, 10);

  const { data: DrsArray } = useGetAllDrs();

  const optionsForSurgeon = DrsArray?.map((dr) => ({
    value: dr.name,
    label: dr.name,
  }));
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SurgeryNotesFormData>({
    resolver: useSurgeryNotesResolver,
    // defaultValues: defaultValuesForForm || undefined,
  });

  const { mutate } = useCreateOTNotes();

  const onSubmit = (data: any) => {
    data = { ...data, OTId: OTId._id, reg: OTId.reg._id };
    try {
      mutate(data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
    console.log("Form Submitted", data);
  };

  const isFormDisabled =
    defaultValuesForForm !== null && defaultValuesForForm !== undefined;

  return (
    <Form className="p-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formProcedureName">
        <Form.Label>Procedure Name</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          {...register("procedureName")}
          disabled={isFormDisabled}
        />
        <Form.Text className="text-danger">
          {errors && errors.procedureName?.message}
        </Form.Text>
      </Form.Group>

      <div className="row">
        <div className="col-4">
          <Form.Group className="mb-3" controlId="formSurgeon">
            <Form.Label>Surgeon</Form.Label>
            <Controller
              name="surgeon"
              control={control}
              render={({ field }) => (
                <Creatable
                  {...field}
                  isDisabled={isFormDisabled}
                  options={optionsForSurgeon}
                  onChange={(value) => set(field, "value", value)}
                />
              )}
            />

            <Form.Text className="text-muted">
              {errors && errors?.surgeon?.message}
            </Form.Text>
          </Form.Group>
        </div>
        <div className="col-8">
          <Form.Group className="mb-3" controlId="formAssistants">
            <Form.Label>Assistants</Form.Label>
            <Controller
              name="assistants"
              control={control}
              render={({ field }) => (
                <Creatable
                  {...field}
                  isDisabled={isFormDisabled}
                  isMulti
                  options={optionsForSurgeon}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />

            <Form.Text className="text-muted">
              {errors && errors.assistants?.message}
            </Form.Text>
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="formSurgeryDate">
            <Form.Label>Surgery Date</Form.Label>
            <Form.Control
              size="sm"
              type="date"
              {...register("surgeryDate", { valueAsDate: true })}
              disabled={isFormDisabled}
            />
            <Form.Text className="text-muted">
              {errors && errors?.surgeryDate?.message}
            </Form.Text>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" controlId="formSurgeryTimeStart">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              size="sm"
              type="time"
              {...register("surgeryTimeStart")}
              disabled={isFormDisabled}
            />
            <Form.Text className="text-muted">
              {errors && errors.surgeryTimeStart?.message}
            </Form.Text>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" controlId="formSurgeryTimeEnd">
            <Form.Label>Finish Time</Form.Label>
            <Form.Control
              size="sm"
              type="time"
              {...register("surgeryTimeEnd")}
              disabled={isFormDisabled}
            />
            <Form.Text className="text-muted">
              {errors && errors.surgeryTimeEnd?.message}
            </Form.Text>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" controlId="formSurgeryType">
            <Form.Label>Surgery Type</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              {...register("surgeryType")}
              disabled={isFormDisabled}
            />
            <Form.Text className="text-muted">
              {errors && errors?.surgeryType?.message}
            </Form.Text>
          </Form.Group>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="formAnesthetist">
            <Form.Label>Anesthetist</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              {...register("anesthetist")}
              disabled={isFormDisabled}
            />
            <Form.Text className="text-muted">
              {String(errors?.anesthetist?.message)}
            </Form.Text>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" controlId="formAnestheticType">
            <Form.Label>Anesthetic Type</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              {...register("anestheticType")}
              disabled={isFormDisabled}
            />
            <Form.Text className="text-muted">
              {errors && errors.anestheticType?.message}
            </Form.Text>
          </Form.Group>
        </div>
      </div>
      <Form.Group className="mb-3" controlId="formFindings">
        <Form.Label>Findings</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          {...register("findings")}
          disabled={isFormDisabled}
        />
        <Form.Text className="text-muted">
          {errors && errors.findings?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formIncision">
        <Form.Label>Incision</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          {...register("incision")}
          disabled={isFormDisabled}
        />
        <Form.Text className="text-muted">
          {errors && errors.incision?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formProcedure">
        <Form.Label>Procedure</Form.Label>
        <Form.Control
          size="sm"
          as="textarea"
          rows={5}
          {...register("procedureDetails")}
          disabled={isFormDisabled}
        />
        <Form.Text className="text-muted">
          {errors && errors.procedureDetails?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formClosure">
        <Form.Label>Closure</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          {...register("closure")}
          disabled={isFormDisabled}
        />
        <Form.Text className="text-muted">
          {errors && errors.closure?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDrains">
        <Form.Label>Drains</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          {...register("drains")}
          disabled={isFormDisabled}
        />
        <Form.Text className="text-muted">
          {errors && errors.drains?.message}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPostOperativeInstructions">
        <Form.Label>Post Operative Instructions</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          {...register("instructions")}
          disabled={isFormDisabled}
        />
        <Form.Text className="text-muted">
          {errors && errors.instructions?.message}
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isFormDisabled}>
        Submit
      </Button>
    </Form>
  );
};

export default SurgeryNotes;
