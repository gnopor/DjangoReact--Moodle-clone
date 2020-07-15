import React from 'react';
import { Card, Skeleton, message } from 'antd';
import { connect } from 'react-redux';

import Hoc from '../hoc/hoc';
import Questions from './Questions';
import Choices from '../components/Choices';
import { getASNTSDetail } from '../store/actions/assignments';
import { createGradedASNT } from '../store/actions/gradedAssignments';

const cardStyle = {
    marginTop: '20px',
    magrinBottom: '20px'
}


class AssignmentDetail extends React.PureComponent {
    state = {
        usersAnswers: {}
    };

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            if (this.props.token !== undefined && this.props.token !== null) {
                this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
            }
        }
    }

    onChange = (e, questionId) => {
        const { usersAnswers } = this.state;
        usersAnswers[questionId] = e.target.value;
        this.setState(usersAnswers);
    };

    handlesubmit() {
        message.success("Submitting your assignement!");
        const { usersAnswers } = this.state;

        const asnt = {
            username: this.props.username,
            asntId: this.props.currentAssignment.id,
            answers: usersAnswers
        }
        this.props.createGradedASNT(
            this.props.token,
            asnt
        );
    }

    render() {
        const { currentAssignment } = this.props;
        const { title } = currentAssignment;
        const { usersAnswers } = this.state;
        return (
            <Hoc>
                {
                    Object.keys(currentAssignment).length > 0 ?
                        <Hoc>
                            {
                                this.props.loading ?

                                    <Skeleton active />
                                    :
                                    <Card title={title}>
                                        <Questions
                                            submit={() => this.handlesubmit()}
                                            questions={currentAssignment.questions.map(q => {
                                                return (
                                                    <Card
                                                        style={cardStyle}
                                                        key={q.id}
                                                        type="inner"
                                                        title={`${q.order}. ${q.question}`}
                                                    >
                                                        <Choices
                                                            choices={q.choices}
                                                            questionId={q.order}
                                                            change={this.onChange}
                                                            usersAnswers={usersAnswers}
                                                        />
                                                    </Card>
                                                )
                                            })} />

                                    </Card>
                            }
                        </Hoc>
                        :
                        null
                }
            </Hoc>

        )
    }
}

const mapStateToProps = state => {

    return {
        token: state.auth.token,
        currentAssignment: state.assignments.currentAssignment,
        loading: state.assignments.loading,
        username: state.auth.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getASNTSDetail: (token, id) => dispatch(getASNTSDetail(token, id)),
        createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentDetail);