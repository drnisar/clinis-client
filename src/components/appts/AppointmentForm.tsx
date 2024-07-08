import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  useCreateAppointment,
  useEditAppointment,
} from "../../hooks/useAppointments";
import { useGetAllRegistrations } from "../../hooks/useRegistration";

export type FormData = {
  _id?: string;
  regSelect?: {
    value: string;
    label: string;
  };
  reg?: string;
  apptDate?: string;
  disease?: string;
  apptPlan?: string;
  comorbids?: string;
  socialConnect?: string;
  apptNotes?: string;
};

const AppointmentForm = () => {
  const { state } = useLocation();
  const { appointment, isEditing } = state;
  const {
    _id,
    apptDate,
    disease,
    apptPlan,
    comorbids,
    socialConnect,
    apptNotes,
  } = appointment;

  const { register, handleSubmit, control } = useForm<FieldValues>({
    defaultValues: isEditing
      ? {
          _id: _id,
          apptDate: new Date(apptDate).toISOString().split("T")[0],
          disease: disease,
          apptPlan: apptPlan,
          comorbids: comorbids,
          socialConnect: socialConnect,
          apptNotes: apptNotes,
        }
      : undefined,
  });

  const { data: regData } = useGetAllRegistrations();

  const newArr = (regData as { _id: string; name: string; MRN: string }[])?.map(
    (reg) => {
      return { value: reg._id, label: reg.name + " - " + reg.MRN };
    }
  );

  const { mutate: editMutate } = useEditAppointment();
  const { mutate: addMutate } = useCreateAppointment();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (isEditing) {
      data = { ...data, reg: appointment.reg._id };
      editMutate(data);
    } else {
      data = {
        ...data,
        reg: data.regSelect.value,
        apptDate: new Date(data.apptDate).toISOString().split("T")[0],
      };
      addMutate(data);
    }
    navigate("/appointments");
  };

  return (
    <div>
      {isEditing ? (
        <div className="bg-light">
          <dt>Name:</dt>
          <dd>{appointment.reg.name}</dd>
          <div className="row">
            <div className="col">
              <dt>Age:</dt>
              <dd>{appointment.reg.age}</dd>
            </div>
            <div className="col">
              <dt>Gender</dt>
              <dd>{appointment.reg.gender}</dd>
            </div>
            <div className="col">
              <dt>MRN</dt>
              <dd>{appointment.reg.MRN}</dd>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <dt>Email</dt>
              <dd>{appointment.reg.email}</dd>
            </div>
            <div className="col">
              <dt>Phone</dt>
              <dd>{appointment.reg.phone}</dd>
            </div>
          </div>
        </div>
      ) : (
        <h4>Add new apointment</h4>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isEditing && (
          <div className="mb-2">
            <label htmlFor="reg" className="form-label form-label-sm">
              Registration
            </label>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  options={newArr}
                  isSearchable
                  placeholder="Select Registration"
                />
              )}
              name="reg"
              control={control}
            />
          </div>
        )}
        <div className="mb-2">
          <label htmlFor="" className="form-label form-label-sm">
            Appointment Date
          </label>
          <input
            type="date"
            className="form-control form-control-sm"
            {...register("apptDate", { valueAsDate: true })}
            size={2}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="" className="form-label form-label-sm">
            Disease
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            {...register("disease")}
            size={2}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="" className="form-label form-label-sm">
            Co-morbids
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            {...register("comorbids")}
            size={2}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="" className="form-label form-label-sm">
            Plan
          </label>
          <input
            type="textarea"
            className="form-control form-control-sm"
            {...register("apptPlan")}
            size={2}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="" className="form-label form-label-sm">
            Notes
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            {...register("apptNotes")}
            size={2}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="" className="form-label form-label-sm">
            Social Connect
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            {...register("socialConnect")}
            size={2}
          />
        </div>

        <button
          type="button"
          className="btn btn-link" // Style this as needed to mimic your link styles
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-link ms-2">
          {isEditing ? "Save" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
