import { Controller, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import "../../css-custom/form.css";
import { useGetDrsForSelect } from "../../hooks/useDrs";
import {
  useCreateOT,
  useGetAnaesthList,
  useGetOTNames,
  useGetPatientTypes,
  useGetSurgeryTypes,
  OTFormData,
  useEditOT,
} from "../../hooks/useOT";
import { useGetRegistrationsForSelect } from "../../hooks/useRegistration";

const SurgeryListForm = () => {
  // const params = useParams();
  const navigate = useNavigate();
  const { isEditing, defaultValues: defValues } = useLocation().state || {};
  // const surgDate = new Date(params.date ?? "");
  const { data: regForSelect } = useGetRegistrationsForSelect();
  const { data: drsList } = useGetDrsForSelect();
  const { mutate: addMutate } = useCreateOT();
  const { mutate: editMutate } = useEditOT();
  const anaesthList = useGetAnaesthList();
  const surgTypes = useGetSurgeryTypes();
  const ptTypes = useGetPatientTypes();
  const otNumbers = useGetOTNames();

  const { handleSubmit, register, control } = useForm<OTFormData>(
    isEditing && {
      defaultValues: {
        disease: defValues.disease,
        surgery: defValues.surgery,
        surgeon: defValues.surgeon,
        anaesthesia: defValues.anaesthesia,
        surgType: defValues.surgType,
        ptType: defValues.ptType,
        otNumber: defValues.otNumber,
        comments: defValues.comments,
        // surgDate: defValues.date,
      },
    }
  );

  const onSubmit = (data: OTFormData) => {
    (e: { preventDefault: () => any }) => e.preventDefault();
    data = { ...data, surgDate: defValues.surgDate, reg: defValues.reg._id };
    if (isEditing) {
      data = { ...data, _id: defValues._id };
      editMutate(data);
      navigate(-1);
    } else {
      addMutate(data);
      navigate(-1);
    }
  };

  console.log(defValues);
  return (
    <div>
      <div className="d-flex justify-content-center p-3">
        <form
          action=""
          className="col-12 col-md-8 col-lg-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2">
            {!isEditing ? (
              <div>
                <label htmlFor="reg" className="form-label">
                  Select Registered Patient
                </label>
                <Controller
                  name="reg"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="reg"
                      options={regForSelect} // Make sure newArr is defined and contains your options
                      className="basic-single"
                      onChange={(val) => field.onChange(val?.value)}
                      value={regForSelect?.find(
                        (option) => option.value === field.value
                      )}
                      isClearable={true}
                    />
                  )}
                />
              </div>
            ) : (
              <h6>
                {defValues.reg.name} -- {defValues.reg.MRN}
              </h6>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Disease
            </label>
            <input
              type="text"
              className="form-control"
              {...register("disease")}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Surgery
            </label>
            <input
              type="text"
              className="form-control"
              {...register("surgery")}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Surgeon
            </label>
            <Controller
              name="surgeon"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  id="surgeon"
                  options={drsList} // Make sure newArr is defined and contains your options
                  className="basic-single"
                  onChange={(val) => field.onChange(val?.value)}
                  value={drsList?.find(
                    (option) => option.value === field.value
                  )}
                />
              )}
            />
          </div>
          <div className="row d-flex">
            <div className="mb-2 col-12 col-sm">
              <label htmlFor="" className="form-label">
                Anaesthesia
              </label>

              <Controller
                name="anaesthesia"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="anaesthesia"
                    options={anaesthList} // Make sure newArr is defined and contains your options
                    className="basic-single"
                    onChange={(val) => field.onChange(val?.value)}
                    value={anaesthList?.find(
                      (option) => option.value === field.value
                    )}
                  />
                )}
              />
            </div>
            <div className="mb-2 col-12 col-sm">
              <label htmlFor="" className="form-label">
                Patient Type
              </label>
              <Controller
                name="ptType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="ptType"
                    options={ptTypes} // Make sure newArr is defined and contains your options
                    className="basic-single"
                    onChange={(val) => field.onChange(val?.value)}
                    value={ptTypes?.find(
                      (option) => option.value === field.value
                    )}
                  />
                )}
              />
            </div>
            <div className="mb-2 col-12 col-sm">
              <label htmlFor="" className="form-label">
                Surgery Type
              </label>

              <Controller
                name="surgType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="surgType"
                    options={surgTypes} // Make sure newArr is defined and contains your options
                    className="basic-single"
                    onChange={(val) => field.onChange(val?.value)}
                    value={surgTypes?.find(
                      (option) => option.value === field.value
                    )}
                  />
                )}
              />
            </div>
            <div className="mb-2 col-12 col-sm">
              <label htmlFor="" className="form-label">
                OT Number
              </label>
              <Controller
                name="otNumber"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="otNumber"
                    options={otNumbers}
                    className="basic-single"
                    onChange={(val) => field.onChange(val?.value)}
                    value={otNumbers?.find(
                      (option) => option.value === field.value
                    )}
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="" className="form-label">
              Comments
            </label>
            <input
              type="text"
              className="form-control"
              {...register("comments")}
            />
          </div>

          <div className="mb-2">
            <button className="btn btn-link" type="submit">
              Submit
            </button>
            <button className="btn btn-link" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-12"></div>
        <div className="col-12"></div>
        <div className="col-12"></div>
        <div className="col-12"></div>
        <div className="col-12"></div>
        <div className="col-12"></div>
        <div className="col-12"></div>
        <div className="col-12"></div>
      </div>
    </div>
  );
};

export default SurgeryListForm;
