
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { uploadPhoto } from './imagesSlice';
import type { UploadedPhoto } from "../../types";

export default function UploadImages() {
    const dispatch = useAppDispatch();
    const photos = useAppSelector((state) => state.photos.photos);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const file = e.target.files?.[0];
        if (!file || file.size > 5 * 1024 * 1024) return;

        const previewUrl = URL.createObjectURL(file);
        dispatch(uploadPhoto({ id, file, previewUrl }));
    };

    return (
        <div>
            {photos.map((photo: UploadedPhoto, idx: number) => (
                <div key={idx}>
                    <label>Изображение {idx + 1}</label>
                    <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleChange(e, idx)} />
                    {photo.previewUrl && <img src={photo.previewUrl} alt={`Preview ${idx + 1}`} width={100} />}
                </div>
            ))}
        </div>
    );
}
