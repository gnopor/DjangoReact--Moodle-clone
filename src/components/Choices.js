import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

const RadioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
};

class Choices extends React.Component {
    render() {
        const { questionId, usersAnswers } = this.props;
        return (
            <RadioGroup onChange={(e, qId) => this.props.change(e, questionId)}
                value={usersAnswers[questionId] !== undefined && usersAnswers[questionId] !== null ?
                    usersAnswers[questionId] : null
                }
            >
                {this.props.choices.map((c, index) => {
                    return (
                        <Radio style={RadioStyle} value={c} key={index}>
                            {c}
                        </Radio>
                    );
                })}
            </RadioGroup>
        );
    }
}

export default Choices;