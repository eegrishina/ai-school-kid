import styled from 'styled-components';
import Button from "../components/Button";
import warningIcon from "../assets/warning.svg";
import UploadImages from "../features/images/UploadImages";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { setTaskId } from "../features/images/imagesSlice";
import { useState } from "react";
import Wrapper from "../components/Wrapper";
import Progress from "../components/Progress";
import { handleFetchError } from "../app/handleFetchError";
import ErrorModal from "../components/ErrorModal";

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
                const errorMessage = handleFetchError(response.status);
                setError(errorMessage);
                return false;
            }

            const data = await response.json();
            dispatch(setTaskId(data.task_id));
            navigate('/questions');
            return true;
        } catch (error) {
            console.error('Upload images failed', error);
            setError('Произошла ошибка при загрузке файлов.');
            return false;
        }
    };

    return (
        <Wrapper>
            <UploadImagesPageStl>
                <Progress step={step} />
                <div className="content">
                    <h2>Загрузите фотографии рисунков</h2>
                    <div className="warning">
                        <img src={warningIcon} alt="icon" />
                        <p>Допустимые форматы файлов: jpg, jpeg, png. Размер не более 5 Мб</p>
                    </div>
                    <UploadImages onFilesChange={setFiles} />
                    <div className="bottom-part">
                        <p>Шаг {step}/3</p>
                        <Button
                            text='Далее >>'
                            link={error ? '' : '/questions'}
                            disabled={files.includes(null)}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </UploadImagesPageStl>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
        </Wrapper>
    )
}

const UploadImagesPageStl = styled.div`
    .content {
        padding: 0 64px;

        h2 {
            margin-bottom: 0;
        }
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

    @media ${({ theme }) => theme.device.tablet} {
        .content {
            padding: 0 24px;
        }

        .bottom-part {
            margin-top: 48px;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        .content {
            padding: 0 16px;
        }

        .warning {
            margin-bottom: 24px;
        }

        .bottom-part {
            margin-top: 32px;
        }
    }
`;
