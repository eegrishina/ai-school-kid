import styled from 'styled-components';
import Button from "../components/Button";
import warningIcon from "../assets/warning.svg";
import UploadImages from "../features/images/UploadImages";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { setTaskId } from "../features/images/imagesSlice";
import { useState } from "react";

export default function UploadImagesPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const step = 1;

    const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setError(null);
        if (files.includes(null)) return;

        const formData = new FormData();
        files.forEach((file) => {
            if (file) {
                formData.append('files', file);
            }
        });

        try {
            const response = await fetch('https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData?.detail?.[0]?.msg || 'Произошла ошибка при загрузке файлов.';
                setError(message);
                return;
            }

            const data = await response.json();
            dispatch(setTaskId(data.task_id));
            navigate('/questions');
        } catch (error) {
            console.error('Upload images failed', error);
            setError('Произошла ошибка при загрузке файлов.');
        }
    };

    return (
        <UploadImagesPageStl>
            <div className="progress">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={step >= i ? 'filled' : ''}></div>
                ))}
            </div>
            <div className="content">
                <h2>Загрузите фотографии рисунков</h2>
                <div className="warning">
                    <img src={warningIcon} alt="icon" />
                    <p>Допустимые форматы файлов: jpg, jpeg, png. Размер не более 5 Мб</p>
                </div>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <UploadImages onFilesChange={setFiles} />
                <div className="bottom-part">
                    <p>Шаг 1/3</p>
                    <Button
                        text='Далее'
                        link='/questions'
                        disabled={files.includes(null)}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </UploadImagesPageStl>
    )
}

const UploadImagesPageStl = styled.div`
    max-width: 904px;
    margin: 0 auto;
    padding-bottom: 32px;
    background-color: #fff;
    border-radius: 20px;

    .progress {
        display: flex;
        div {
            height: 16px;
            width: 100%;
            background-color: ${({ theme }) => theme.colors.blue050};
            &:first-child {
                border-top-left-radius: 20px;
            }
            &:last-child {
                border-top-right-radius: 20px;
            }
        }
        div.filled {
            height: 16px;
            background-color: ${({ theme }) => theme.colors.blue070};
        }
    }

    .content {
        padding: 48px 64px 0;
    }

    .warning {
        display: inline-flex;
        gap: 10px;
        background-color: #FDEEEF;
        color: ${({ theme }) => theme.colors.red};
        font-size: 14px;
        border-radius: 100px;
        padding: 8px 12px;
        margin: 8px 0 32px 0;
    }

    .bottom-part {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 64px;

        p {
            color: ${({ theme }) => theme.colors.muted};
        }
    }
`;
