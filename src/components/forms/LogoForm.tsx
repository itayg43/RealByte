import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_IMAGE_SIZE_IN_BYTES = 5 * 1024 * 1024;

const validationSchema = z.object({
  logo: z.custom<FileList>().superRefine((files, ctx) => {
    if (IMAGE_TYPES.includes(files[0]?.type) === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only JPEG, JPG, and PNG images allowed",
      });
    }

    if (files[0]?.size > MAX_IMAGE_SIZE_IN_BYTES) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Images limited to 5MB max",
      });
    }
  }),
});

export type LogoFormInputs = z.infer<typeof validationSchema>;

type Props = {
  onSubmit: (inputs: LogoFormInputs) => {};
};

const LogoForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LogoFormInputs>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const selectedLogo = watch("logo");
  const selectedLogoPreview =
    selectedLogo && selectedLogo[0]
      ? URL.createObjectURL(selectedLogo[0])
      : null;

  return (
    <>
      {selectedLogoPreview && (
        <img className="image" src={selectedLogoPreview} alt="selected logo" />
      )}

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="image-input" className="image-input">
            {selectedLogoPreview ? "Change Logo" : "Select Logo"}
          </label>

          <input
            id="image-input"
            type="file"
            accept={IMAGE_TYPES.join(", ")}
            {...register("logo")}
          />

          {errors.logo && errors.logo.message && (
            <p className="error-message">{errors.logo.message}</p>
          )}
        </fieldset>

        {isValid && (
          <button
            className="btn btn-blue"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <span className="loader" />}
            UPLOAD
          </button>
        )}
      </form>
    </>
  );
};

export default LogoForm;
