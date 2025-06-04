import styled from 'styled-components';
import Button from "../components/Button";
import warningIcon from "../assets/warning.svg";

export default function UploadImagesPage() {
    const step = 1;

    return (
        <UploadImagesPageStl>
            <div className="progress">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={step === i ? 'filled' : ''}></div>
                ))}
            </div>
            <div className="content">
                <h2>Загрузите фотографии рисунков</h2>
                <div className="warning">
                    <img src={warningIcon} alt="icon" />
                    <p>Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб</p>
                </div>

                <div className="bottom-part">
                    <p>Шаг 1/3</p>
                    <Button text='Далее' link='/questions' />
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

        p {
            color: ${({ theme }) => theme.colors.muted};
        }
    }
`;
