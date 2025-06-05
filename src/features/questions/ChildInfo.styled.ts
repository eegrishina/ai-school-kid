import styled from "styled-components";

export const ChildInfoFormStl = styled.div`
    .form-block {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .required {
            color: ${({ theme }) => theme.colors.red};
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
            }

            > input[type="date"] {
                width: 115px;
            }
        }

        .gender-options {
            display: flex;
            gap: 24px;

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
