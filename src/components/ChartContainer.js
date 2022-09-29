import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import './ChartContainer.css';
import ChartNode from './ChartNode';

const propTypes = {
    datasource: PropTypes.object.isRequired,
    containerClass: PropTypes.string,
    chartClass: PropTypes.string,
    NodeTemplate: PropTypes.elementType,
};

const defaultProps = {
    pan: false,
    containerClass: '',
    chartClass: '',
};

const ChartContainer = forwardRef(({ datasource, containerClass, chartClass, NodeTemplate }, ref) => {
    const container = useRef();
    const chart = useRef();

    const [ds, setDS] = useState(datasource);
    useEffect(() => {
        setDS(datasource);
    }, [datasource]);

    return (
        <div ref={container} className={'orgchart-container ' + containerClass}>
            <div ref={chart} className={'orgchart ' + chartClass}>
                <ul>
                    <ChartNode datasource={ds} NodeTemplate={NodeTemplate} />
                </ul>
            </div>
        </div>
    );
});

ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;

export default ChartContainer;
