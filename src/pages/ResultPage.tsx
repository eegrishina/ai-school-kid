import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import type { ReportStatusResponse } from "../types";

export default function ResultPage() {
    const [status, setStatus] = useState<'в обработке' | 'готово' | 'ошибка' | 'отправка'>('отправка');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const taskId = useAppSelector((state) => state.photos.taskId);
    const step = 3;

    useEffect(() => {
        if (!taskId) return;

        setStatus('в обработке');
        setError(null);

        const checkStatus = async () => {
            try {
                const response = await fetch(`https://sirius-draw-test-94500a1b4a2f.herokuapp.com/report/${taskId}`);
                if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);

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
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Ошибка при запросе статуса отчета');
                }
            }
        };

        checkStatus();
        const intervalId = setInterval(checkStatus, 12000);

        return () => clearInterval(intervalId);
    }, [taskId]);

    return (
        <ResultPageStl>
            <div className="progress">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={step >= i ? 'filled' : ''}></div>
                ))}
            </div>
            <div className="content">
                <h2>Психологический отчет о ребенке</h2>

                <div>
                    {status === 'отправка' && <p>Отправка данных формы...</p>}
                    {status === 'в обработке' && <p>Анализ в процессе...</p>}
                    {status === 'готово' && pdfUrl && <p>Отчет готов!</p>}

                    {status === 'ошибка' && (
                        <p className="error">
                            Ошибка: {error || 'Не удалось получить статус отчета.'}
                        </p>
                    )}
                </div>

                <div className="bottom-part">
                    <p>Шаг 3/3</p>
                    {status === 'готово' && pdfUrl && (
                        <div className="btns">
                            <a href={pdfUrl || ''} target="_blank" rel="noopener noreferrer">
                                Просмотреть отчет
                            </a>
                            <a href={pdfUrl || ''} download>
                                Скачать отчет PDF
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </ResultPageStl>
    )
}

const ResultPageStl = styled.div`
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
        display: flex;
        flex-direction: column;
        gap: 64px;
        padding: 48px 64px 0;
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
            transition: all 0.3s ease-in;
            cursor: pointer;

            &:hover {
                background-color: ${({ theme }) => theme.colors.blue110};
            }
        }
    }
`;
