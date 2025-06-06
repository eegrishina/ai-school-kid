import styled from "styled-components";

export const ChildInfoFormStl = styled.div`
    .form-block {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .required, .error {
            color: ${({ theme }) => theme.colors.red};
        }
        .error {
            font-size: 12px;
        }

        > div {
            display: flex;
            flex-direction: column;
            gap: 4px;

            > input {
                border: 1px solid ${({ theme }) => theme.colors.muted};
                border-radius: 6px;
                height: 40px;
                width: 100%;
                padding: 10px 12px;

                &:hover, &:active, &:focus, &:valid {
                    border-color: ${({ theme }) => theme.colors.violet};
                }
            }

            > input[type="date"] {
                width: 115px;
            }
        }

        .radio-group {
            display: flex;
            gap: 24px;

            .custom-radio {
                position: relative;
                padding-left: 20px;
                font-size: 14px;
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

            > input {
                height: 18px;
                width: 18px;
            }

            > label {
                height: 18px;
            }
        }
    }
`;
