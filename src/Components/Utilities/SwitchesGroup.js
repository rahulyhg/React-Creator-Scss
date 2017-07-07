import React from 'react';
import { Field } from 'redux-form';



const SwitchesGroup = props => {

    
        const renderInput = (field) => {
            let fieldProps = { ...field };
            return (
                <li className={props.switchesProps.display}>
                    <label>
                        <input {...field.input} type={props.switchesProps.type} name={fieldProps.input.name} value={fieldProps.value}/>
                        {fieldProps.label}
                    </label>
                </li>
            )
        }
        
    /*const renderInput = (field) => {
        let fieldProps = { ...field };
        return (
            <li className={props.switchesProps.display}>
                <label>
                    <input {...field.input} type="radio" name="gender" value="male" />
                    {fieldProps.label}
                </label>
            </li>
        )
    }*/

    const returnNameFromType = (props, option) => {
        return props.type == "radio" ? props.name : option.value;
    }

    return (
        <ul className="switches-container">

            {props.switchesProps.options.map((option, index) => {
                return <Field type={props.switchesProps.type} value={option.value} key={index} props={option} component={renderInput} name={returnNameFromType(props.switchesProps, option)} />
            }
            )}

            {/*{props.options.map((option, index) => {
                <Field props={props.switchesProps} component={renderField} name={props.switchesProps.name} />*/}

            {/*{renderSwitches(props.switchesProps)}*/}
        </ul>
    )

}

export default SwitchesGroup;