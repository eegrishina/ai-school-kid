import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setPreview } from "./imagesSlice";
import { UploadContainer } from "./UploadImages.styled";
import uploadIcon from "../../assets/upload.svg";
import reloadIcon from "../../assets/reload.svg";

type UploadImagesProps = {
    onFilesChange: (files: (File | null)[]) => void;
};

const labels = ['Дом, дерево, человек', 'Несуществующее животное', 'Автопортрет'];

export default function UploadImages({ onFilesChange }: UploadImagesProps) {
    const dispatch = useAppDispatch();
    const photos = useAppSelector((state) => state.photos.photos);
    const [files, setFiles] = useState<(File | null)[]>([null, null, null]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const file = e.target.files?.[0];
        if (!file || file.size > 5 * 1024 * 1024) return;

        const updated = [...files];
        updated[idx] = file;
        setFiles(updated);
        onFilesChange(updated);

        const previewUrl = URL.createObjectURL(file);
        dispatch(setPreview({ id: idx, previewUrl }));
    };

    return (
        <UploadContainer>
            {labels.map((label, idx) => (
                <div className="field" key={idx}>
                    <div className={`custom-input ${photos[idx]?.previewUrl ? 'uploaded' : ''}`}
                        style={photos[idx]?.previewUrl
                            ? { backgroundImage: `url(${photos[idx].previewUrl})` }
                            : undefined}
                    >
                        <input
                            id={`upload-${idx}`}
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleChange(e, idx)}
                        />
                        <label className="custom-btn" htmlFor={`upload-${idx}`}>
                            <img src={photos[idx]?.previewUrl ? reloadIcon : uploadIcon} alt="" />
                        </label>
                    </div>
                    <label>{label}</label>
                </div>
            ))}
        </UploadContainer>
    );
}
