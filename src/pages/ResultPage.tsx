import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import type { ReportStatusResponse } from "../types";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Progress from "../components/Progress";
import { handleFetchError } from "../app/handleFetchError";
import ErrorModal from "../components/ErrorModal";
import uploadIcon from "../assets/upload-w.svg";

export default function ResultPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState<'в обработке' | 'готово' | 'ошибка' | 'отправка'>('отправка');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [modalError, setModalError] = useState<string | null>(null);
    const taskId = useAppSelector((state) => state.photos.taskId);
    const step = 3;

    useEffect(() => {
        if (!taskId) {
            setModalError('Отчет недоступен. Возможно, данные устарели или были удалены. Попробуйте пройти тест заново.')
            return;
        }

        setStatus('в обработке');
        setError(null);

        const checkStatus = async () => {
            try {
                const response = await fetch(`https://sirius-draw-test-94500a1b4a2f.herokuapp.com/report/${taskId}`);

                if (!response.ok) {
                    const errorMessage = handleFetchError(response.status);
                    if (response.status >= 500 || response.status === 0) {
                        setModalError(errorMessage);
                    } else {
                        setError(errorMessage);
                        setStatus('ошибка');
                    }
                    return;
                }

                const data: ReportStatusResponse = await response.json();

                if (data.status === 'готово' && data.pdf_url) {
                    setStatus('готово');
                    setPdfUrl(data.pdf_url);
                } else if (data.status?.trim() === 'в обработке') {
                    setStatus('в обработке');
                } else {
                    setStatus('ошибка');
                    setError('Неизвестный статус отчета');
                }
            } catch (error: unknown) {
                setStatus('ошибка');
                const message = error instanceof Error ? error.message : 'Ошибка при запросе статуса отчета';
                if (
                    message.includes('NetworkError') ||
                    message.includes('Failed to fetch') ||
                    message.includes('timeout') ||
                    message.includes('fetch')
                ) {
                    setModalError('Нет соединения с сервером. Попробуйте позже.');
                } else {
                    setError(message);
                }
            }
        };

        checkStatus();
        const intervalId = setInterval(checkStatus, 12000);

        return () => clearInterval(intervalId);
    }, [taskId, navigate]);

    return (
        <Wrapper>
            <ResultPageStl>
                <Progress step={step} />
                <div className="content">
                    <h2>Психологический отчет о ребенке</h2>

                    <div>
                        {status === 'отправка' && (
                            <div className="loading">
                                Объединяем данные, чтобы составить психологический отчет
                                <Spinner />
                            </div>
                        )}
                        {status === 'в обработке' && (
                            <div className="loading">
                                Анализ в процессе...
                                <Spinner />
                            </div>
                        )}
                        {status === 'готово' && pdfUrl && <p className="done">Отчет готов!</p>}

                        {status === 'ошибка' && (
                            <p className="error">
                                Ошибка: {error || 'Не удалось получить статус отчета.'}
                            </p>
                        )}
                    </div>

                    <div className="bottom-part">
                        <p>Шаг {step}/3</p>
                        {status === 'готово' && pdfUrl && (
                            <div className="btns">
                                <a href={pdfUrl || ''} target="_blank" rel="noopener noreferrer">
                                    Просмотреть отчет
                                </a>
                                <a href={pdfUrl || ''} download>
                                    Скачать отчет PDF
                                    <img src={uploadIcon} alt="" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </ResultPageStl>
            {modalError && <ErrorModal message={modalError} onClose={() => {
                setModalError(null);
                navigate('/');
            }} />}
        </Wrapper>
    )
}

const ResultPageStl = styled.div`
    .content {
        display: flex;
        flex-direction: column;
        padding: 0 64px;
        
        .loading {
            display: flex;
            align-items: center;
            color: ${({ theme }) => theme.colors.violet};
        }
        .done {
            color: ${({ theme }) => theme.colors.blue100};
        }
        .error {
            color: ${({ theme }) => theme.colors.red};
        }
    }

    .bottom-part {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 64px;

        p {
            color: ${({ theme }) => theme.colors.muted};
        }

        > div {
            display: flex;
            gap: 8px;
        }

        .btns a {
            background-color: ${({ theme }) => theme.colors.blue100};
            color: ${({ theme }) => theme.colors.surface};
            border-radius: 100px;
            border: none;
            padding: 10px 24px;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease-in;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;

            &:hover {
                background-color: ${({ theme }) => theme.colors.blue110};
            }

            img {
                height: 20px;
                width: 20px;
            }
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

        .bottom-part {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 24px;

            > div {
                flex-direction: column-reverse;
                width: 100%;
            }
        }
    }
`;
