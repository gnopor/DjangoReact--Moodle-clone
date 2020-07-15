import React from 'react';
import { connect } from 'react-redux';
import { List, Skeleton } from 'antd';

import Hoc from '../hoc/hoc';
import Result from '../components/Result';
import { getGradedASNTS } from '../store/actions/gradedAssignments';


class Profile extends React.PureComponent {

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getGradedASNTS(this.props.username, this.props.token);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            if (this.props.token !== undefined && this.props.token !== null) {
                this.props.getGradedASNTS(this.props.username, this.props.token);
            }
        }
    }

    render() {
        return (
            <Hoc>
                {this.props.loading ? (
                    <Skeleton active />
                ) : (
                        <Hoc>
                            <h1>Hi, {this.props.username}</h1>
                            <List
                                size="large"
                                dataSource={this.props.gradedAssignments}
                                renderItem={a => (
                                    <Hoc>
                                        <Result key={a.id} grade={a.grade} />
                                        <List.Item>{a.assignment}</List.Item>
                                    </Hoc>
                                )}
                            />
                        </Hoc>
                    )}
            </Hoc>
        );
    }
}


const mapStateToProps = state => {
    console.log(state.gradedAssignments)
    return {
        token: state.auth.token,
        username: state.auth.username,
        loading: state.gradedAssignments.loading,
        gradedAssignments: state.gradedAssignments.assignments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGradedASNTS: (username, token) => dispatch(getGradedASNTS(username, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)