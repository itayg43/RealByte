import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback } from "react";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const MAX_FILE_SIZE_IN_MB = 12;
const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE_IN_MB * 1024 * 1024;

const validationSchema = z.object({
  file: z.custom<FileList>().superRefine((fileList, ctx) => {
    if (fileList.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });
      return;
    }

    const f = fileList[0];

    if (ALLOWED_FILE_TYPES.includes(f.type) === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only JPEG, JPG, PNG, and PDF files are allowed",
      });
      return;
    }

    if (f.size > MAX_FILE_SIZE_IN_BYTES) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `File size is limited to ${MAX_FILE_SIZE_IN_MB}MB`,
      });
      return;
    }
  }),
});

export type UploadLogoFormInputs = z.infer<typeof validationSchema>;

type Props = {
  onSubmit: (inputs: UploadLogoFormInputs) => {};
};

const UploadLogoForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UploadLogoFormInputs>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const selectedFile = watch("file");

  const renderFilePreview = useCallback(() => {
    if (selectedFile && selectedFile[0]) {
      return selectedFile[0].type.includes("image") ? (
        <img
          className="image-file-preview"
          src={URL.createObjectURL(selectedFile[0])}
          alt="selected file preview"
        />
      ) : (
        <iframe
          style={{
            width: "100%",
            borderRadius: 10,
            marginBottom: 10,
          }}
          src={URL.createObjectURL(selectedFile[0])}
          title="selected file preview"
        />
      );
    }
  }, [selectedFile]);

  return (
    <>
      {renderFilePreview()}

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label htmlFor="file-input" className="file-input">
            {selectedFile && selectedFile[0] ? "Change Logo" : "Select Logo"}
          </label>

          <input
            id="file-input"
            type="file"
            accept={ALLOWED_FILE_TYPES.join(", ")}
            {...register("file")}
          />

          {errors.file && errors.file.message && (
            <p className="error-message">{errors.file.message}</p>
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

export default UploadLogoForm;
