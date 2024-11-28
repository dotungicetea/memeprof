import classNames from "classnames/bind";
import { useDropzone } from "react-dropzone";
import styles from "./dropzone.module.scss";
import { getTelegram } from "@/utils";
import Icon from "@/components/Icon";

const cn = classNames.bind(styles);

type Props = {
  onDrop: (acceptedFiles: File[]) => void;
};

const Dropzone = ({ onDrop }: Props) => {
  const telegram = getTelegram();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      onDropRejected: () => {
        telegram?.showAlert("Invalid image, please upload a valid image");
      },
      onError: (err) => {
        telegram?.showAlert(`Error: ${err?.message || "Unknown error"}`);
      },
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/svg+xml": [],
      },
      maxFiles: 1,
    });

  if (acceptedFiles.length > 0) {
    return (
      <div className={cn("dz")}>
        <p className={cn("dz__text")}>
          <Icon icon="check" size="lg" color="primary" />
          Image uploaded successfully!
        </p>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn("dz", "border-dashed border border-primary my-2")}
    >
      <input {...getInputProps()} />

      <p
        className={cn("dz__text", {
          "dz__text--active": isDragActive,
        })}
      >
        <Icon icon="cloud-upload" size="lg" />
        <span className="text-primary"> Click to upload</span>
        <span>SVG, PNG or JPG (max. 800x400px)</span>
      </p>
    </div>
  );
};

export default Dropzone;
