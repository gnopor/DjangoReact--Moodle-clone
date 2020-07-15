import React from 'react';
import { List, Skeleton } from 'antd';
import { connect } from 'react-redux';

import Hoc from '../hoc/hoc';
import * as actions from '../store/actions/assignments';
import { Link } from 'react-router-dom';


class AssignmentList extends React.PureComponent {

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getASNTS(this.props.token);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            if (this.props.token !== undefined && this.props.token !== null) {
                this.props.getASNTS(this.props.token);
            }
        }
    }

    renderItem(item) {
        return (
            <Link to={`/assignments/${item.id}`}>
                <List.Item>{item.title}</List.Item>
            </Link>
        )
    }

    render() {
        return (
            <Hoc>
                {
                    this.props.loading ?

                        <Skeleton active />
                        :
                        <div>
                            <h3 style={{ margin: "16px 0" }}>Assignment List</h3>
                            <List
                                size="large"
                                bordered
                                dataSource={this.props.assignments}
                                renderItem={item => this.renderItem(item)}
                            />
                        </div>
                }
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        assignments: state.assignments.assignments,
        loading: state.assignments.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getASNTS: (token) => dispatch(actions.getASNTS(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);