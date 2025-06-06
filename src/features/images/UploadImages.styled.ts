import styled from 'styled-components';

export const UploadImagesStl = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: nowrap;

    .field {
        display: flex;
        flex: 1 1 0;
        max-width: 216px;
        min-width: 0;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;

        label {
            color: ${({ theme }) => theme.colors.default};
            text-align: center;
        }
    }

    .custom-input {
        position: relative;
        height: 161px;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.surface3};
        border-radius: 8px;
        background-color: #e0e0e0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        input[type="file"] {
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 2;
        }

        .custom-btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 64px;
            height: 64px;
            background-color: ${({ theme }) => theme.colors.blue050};
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3;
            transition: background-color 0.3s ease;
            cursor: pointer;

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 34px;
                height: 34px;
                pointer-events: none;
            }
        }

        &.uploaded {
            background-color: transparent;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            pointer-events: none;
        }
    }

    @media ${({ theme }) => theme.device.tablet} {
        gap: 24px;

        .custom-input {
            height: 64px;

            .custom-btn {
                width: 32px;
                height: 32px;
    
                img {
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column;
        gap: 16px;

        .field {
            max-width: 100%;
        }
    }
`;
