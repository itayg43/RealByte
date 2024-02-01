import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormFileInput from "./FormFileInput";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const MAX_FILE_SIZE_IN_MB = 15;
const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE_IN_MB * 1024 * 1024;

const validationSchema = z.object({
  file: z.custom<File>().superRefine((file, ctx) => {
    if (file === undefined) return;

    if (ALLOWED_FILE_TYPES.includes(file.type) === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only JPEG, JPG, PNG, and PDF files are allowed",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE_IN_BYTES) {
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
  onSubmit: (formInputs: UploadLogoFormInputs) => Promise<void>;
};

const UploadLogoForm = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<UploadLogoFormInputs>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const selectedFile = watch("file");

  return (
    <>
      {selectedFile && <FilePreview file={selectedFile} />}

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <FormFileInput<UploadLogoFormInputs>
          control={control}
          name="file"
          label={selectedFile ? "Change Logo" : "Select Logo"}
          accept={ALLOWED_FILE_TYPES}
        />

        {isValid && selectedFile && (
          <button
            className="btn btn-blue"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <span className="loader" />}
            {isSubmitting ? "Uploading..." : "Upload"}
          </button>
        )}
      </form>
    </>
  );
};

export default UploadLogoForm;

type FilePreviewProps = {
  file: File;
};

const FilePreview = ({ file }: FilePreviewProps) => {
  const src = URL.createObjectURL(file);
  const description = "file preview";

  return file.type.includes("image") ? (
    <img className="image-file-preview" src={src} alt={description} />
  ) : (
    <iframe
      style={{
        width: "100%",
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
      }}
      src={src}
      title={description}
    />
  );
};
