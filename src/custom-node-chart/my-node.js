import PropTypes from 'prop-types';
import React from 'react';
import './my-node.css';

const propTypes = {
    nodeData: PropTypes.object.isRequired,
};

const MyNode = ({ nodeData }) => {
    const selectNode = () => {
        alert('name: ' + nodeData.name + " gender: " + nodeData.gender);
    };

    return (
        <div onClick={selectNode}>
            <div className={nodeData.gender === 'female' ? 'female' : 'male'}>{nodeData.name}</div>
            {nodeData.partner ? (
                <div className={nodeData.partner.gender === 'female' ? 'female' : 'male'}>{nodeData.partner.name}</div>
            ) : (
                <></>
            )}
        </div>
    );
};

MyNode.propTypes = propTypes;

export default MyNode;
