import DatePicker from 'react-datepicker';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

interface StyledDatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
}

interface CustomHeaderProps extends ReactDatePickerCustomHeaderProps {
    years: number[];
    months: string[];
}

const CustomInput = styled.input.attrs(() => ({
    maxLength: 10,
}))`
    border: 1px solid ${({ theme }) => theme.colors.violet};
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 16px;
    width: 110px;
    outline: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.default};
`;

const DatePickerStl = styled.div`
    .react-datepicker {
        border-radius: 6px;
        padding: 12px 14px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border: none;
    }

    .react-datepicker__header {
        background-color: ${({ theme }) => theme.colors.surface};
        border-bottom: none;
        padding: 0;
    }

    .react-datepicker__current-month {
        display: none !important;
    }

    .react-datepicker__day-names,
    .react-datepicker__week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
    }

    .react-datepicker__day-name {
        font-size: 12px;
        color: ${({ theme }) => theme.colors.muted};
        text-transform: lowercase;
    }

    .react-datepicker__day {
        padding: 10px;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s;
        height: 36px;
        width: 36px;
        line-height: 1.4;
        &:hover {
            background-color: ${({ theme }) => theme.colors.blue070};
        }
    }

    .react-datepicker__day--selected {
        background-color: ${({ theme }) => theme.colors.violet};
        color: ${({ theme }) => theme.colors.surface};
        &:hover {
            background-color: ${({ theme }) => theme.colors.blue110};
        }
    }

    .react-datepicker__day--outside-month {
        visibility: hidden;
    }

    @media ${({ theme }) => theme.device.mobile} {
        .react-datepicker__day {
            height: 24px;
            width: 24px;
            line-height: 0.5;
            padding: 10px 10px 10px 8px;
        }
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px;

    @media ${({ theme }) => theme.device.mobile} {
        padding: 0;
    }
`;

const NavButton = styled.button<{ disabled?: boolean }>`
    background: none;
    border: none;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    font-size: 28px;
    color: ${({ theme }) => theme.colors.default};
    user-select: none;
    padding: 0;
    width: 28px;
    height: 28px;
    line-height: 1;
`;

const Select = styled.select`
    font-size: 18px;
    font-weight: 700;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.default};
    cursor: pointer;
    user-select: none;
    text-transform: capitalize;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 0;

    &:last-child {
        font-weight: 400;
    }

    @media ${({ theme }) => theme.device.mobile} {
        font-size: 14px;
    }
`;

const CustomHeader: React.FC<CustomHeaderProps> = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    years,
    months,
}) => {
    return (
        <HeaderWrapper>
            <NavButton
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                aria-label="Previous Month"
                type="button"
            >
                ‹
            </NavButton>

            <Select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
            >
                {months.map((monthName, index) => (
                    <option key={monthName} value={index}>
                        {monthName}
                    </option>
                ))}
            </Select>

            <Select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </Select>

            <NavButton
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                aria-label="Next Month"
                type="button"
            >
                ›
            </NavButton>
        </HeaderWrapper>
    );
};

const years: number[] = [];
const currentYear = new Date().getFullYear();
for (let i = currentYear - 50; i <= currentYear + 10; i++) {
    years.push(i);
}

const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
];

const StyledDatePicker: React.FC<StyledDatePickerProps> = ({ selected, onChange }) => {
    const handleChange = (date: Date | null) => {
        if (!date) {
            onChange(null);
            return;
        }
        const fixedDate = new Date(date);
        fixedDate.setHours(12, 0, 0, 0);
        onChange(fixedDate);
    };

    return (
        <DatePickerStl>
            <DatePicker
                selected={selected}
                onChange={handleChange}
                maxDate={new Date()}
                locale={ru}
                dateFormat="dd.MM.yyyy"
                placeholderText="28.07.2017"
                customInput={<CustomInput />}
                calendarClassName="custom-calendar"
                popperPlacement="bottom-start"
                renderCustomHeader={(props) => (
                    <CustomHeader {...props} years={years} months={months} />
                )}
                showMonthDropdown={false}
                showYearDropdown={false}
            />
        </DatePickerStl>
    );
};

export default StyledDatePicker;
