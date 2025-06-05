import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { ChildInfoDetails, ChildInfoKeys } from "../../types";
import { ChildInfoFormStl } from "./ChildInfo.styled";
import { updateChildInfo } from "./questionsSlice";
import rawChildInfoFields from '../../data/childInfo.json';

const childInfoFields: ChildInfoDetails[] = rawChildInfoFields as ChildInfoDetails[]

export default function ChildInfoForm() {
    const dispatch = useAppDispatch();
    const childInfo = useAppSelector((state) => state.questions.childInfo);

    const handleChange = (key: ChildInfoKeys, value: string) => {
        dispatch(updateChildInfo({ key, value }))
    };

    return (
        <ChildInfoFormStl>
            <h2>Общая информация о ребенке</h2>
            <div className="form-block">
                {childInfoFields.map(({ label, type, key, options }: ChildInfoDetails) => (
                    <div key={key}>
                        <label>
                            {label} <span className="required">*</span>
                        </label>

                        {type === 'radio' && options ? (
                            <div className="radio-group">
                                {options.map(option => (
                                    <label key={option}>
                                        <input
                                            type="radio"
                                            name={key}
                                            value={option}
                                            checked={childInfo[key] === option}
                                            onChange={e => handleChange(key, e.target.value)}
                                            required
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <input
                                type={type}
                                value={childInfo[key] || ''}
                                onChange={e => handleChange(key, e.target.value)}
                                required
                            />
                        )}
                    </div>
                ))}
            </div>
        </ChildInfoFormStl>
    )
}
