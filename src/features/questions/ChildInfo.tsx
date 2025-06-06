import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { ChildInfoDetails, ChildInfoKeys } from "../../types";
import { ChildInfoFormStl } from "./ChildInfo.styled";
import { updateChildInfo } from "./questionsSlice";
import rawChildInfoFields from '../../data/childInfo.json';
import { useState } from "react";
import StyledDatePicker from "../../components/DatePicker";

const childInfoFields: ChildInfoDetails[] = rawChildInfoFields as ChildInfoDetails[]

export default function ChildInfoForm() {
    const dispatch = useAppDispatch();
    const childInfo = useAppSelector((state) => state.questions.childInfo);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (key: ChildInfoKeys, value: string) => {
        dispatch(updateChildInfo({ key, value }));
    };

    const hadleBlur = (key: ChildInfoKeys, value: string) => {
        if (key === 'childDOB') {
            const year = parseInt(value.split('-')[0], 10);
            const currentYear = new Date().getFullYear();

            if (year < 1900 || year > currentYear) {
                setError('Введите корректный год рождения');
                return;
            } else {
                setError(null);
                return;
            }
        }
    };

    return (
        <ChildInfoFormStl>
            <h2>Общая информация о ребенке</h2>
            <div className="form-block">
                {childInfoFields.map(({ label, type, key, options }: ChildInfoDetails) => (
                    <div key={key}>
                        <label>
                            {label}<span className="required">*</span>
                        </label>

                        {type === 'radio' && options ? (
                            <div className="radio-group">
                                {options.map(option => (
                                    <label key={option} className="custom-radio">
                                        <input
                                            type="radio"
                                            name={key}
                                            value={option}
                                            checked={childInfo[key] === option}
                                            onChange={e => handleChange(key, e.target.value)}
                                            required
                                        />
                                        <span className="radio-mark" />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            key === 'childDOB' ? (
                                <StyledDatePicker
                                    selected={childInfo[key] ? new Date(childInfo[key]) : null}
                                    onChange={(date) => handleChange(key, date ? date.toISOString().split('T')[0] : '')}
                                />
                            ) : (
                                <input
                                    type={type}
                                    value={childInfo[key] || ''}
                                    onChange={e => handleChange(key, e.target.value)}
                                    onBlur={e => hadleBlur(key, e.target.value)}
                                    required
                                />
                            )
                        )}
                        {type === 'date' && error && (
                            <div className="error">
                                {error}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </ChildInfoFormStl>
    )
}
