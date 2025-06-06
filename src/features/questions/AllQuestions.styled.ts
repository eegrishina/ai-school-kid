import styled from "styled-components";

export const AllQuestionsStl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 64px;

    .questions-block {
        display: flex;
        flex-direction: column;
        gap: 32px;

        > div {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .radio-group {
                display: flex;
                gap: 24px;

                .custom-radio {
                    position: relative;
                    padding-left: 20px;
                    font-size: 12px;
                    cursor: pointer;

                    input {
                        position: absolute;
                        opacity: 0;
                        cursor: pointer;
                    }

                    .radio-mark {
                        position: absolute;
                        left: 0;
                        top: 42%;
                        transform: translateY(-50%);
                        height: 16px;
                        width: 16px;
                        border: 5px solid ${({ theme }) => theme.colors.muted};
                        border-radius: 50%;
                        background-color: ${({ theme }) => theme.colors.muted};
                        &:hover {
                            border-color: ${({ theme }) => theme.colors.blue100};
                            background-color: ${({ theme }) => theme.colors.blue100};
                        }
                    }

                    input:checked + .radio-mark {
                        border-color: ${({ theme }) => theme.colors.blue100};
                        background-color: ${({ theme }) => theme.colors.surface};
                    }

                    input:checked:hover + .radio-mark {
                        border-color: ${({ theme }) => theme.colors.blue110};
                        background-color: ${({ theme }) => theme.colors.surface};
                    }
                }
            }

            > textarea {
                border: 1px solid ${({ theme }) => theme.colors.muted};
                border-radius: 6px;
                padding: 10px 12px;
                font-size: 14px;
                resize: none;
                overflow: hidden;
                min-height: 40px;

                &:hover,
                &:active,
                &:focus {
                    border-color: ${({ theme }) => theme.colors.violet};
                }
            }
        }
    }

    .required {
        color: ${({ theme }) => theme.colors.red};
    }

    @media ${({ theme }) => theme.device.tablet} {
        gap: 48px;

        .questions-block {
            > div {
                .radio-group {
                    gap: 14px;
                }
            }
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        .questions-block {
            > div {
                .radio-group {
                    flex-direction: column;
                    gap: 8px;
                }
            }
        }
    }
`;
