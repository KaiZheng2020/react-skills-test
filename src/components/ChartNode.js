import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import './ChartNode.css';
import { selectNodeService } from './service';

const propTypes = {
    datasource: PropTypes.object,
    NodeTemplate: PropTypes.elementType,
};

const defaultProps = {

};

const ChartNode = ({
    datasource,
    NodeTemplate,    
}) => {
    const node = useRef();
    const [selected, setSelected] = useState(false);

    const nodeClass = ['oc-node', selected ? 'selected' : ''].filter((item) => item).join(' ');

    useEffect(() => {
        const subs = selectNodeService.getSelectedNodeInfo().subscribe((selectedNodeInfo) => {
            if (selectedNodeInfo) {
                setSelected(selectedNodeInfo.selectedNodeId === datasource.id);
            } else {
                setSelected(false);
            }
        });

        return () => {
            subs.unsubscribe();
        };
    }, [datasource]);

    return (
        <li className='oc-hierarchy'>
            <div ref={node} id={datasource.id} className={nodeClass}>
                {NodeTemplate ? (
                    <NodeTemplate nodeData={datasource} />
                ) : (
                    <>
                        <div className='oc-content'>{datasource.name}</div>
                        <div className='oc-content'>{datasource.title}</div>
                    </>
                )}
            </div>
            {datasource.children && datasource.children.length > 0 && (
                <ul>
                    {datasource.children.map((node) => (
                        <ChartNode
                            datasource={node}
                            NodeTemplate={NodeTemplate}
                            id={node.id}
                            key={node.id}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

ChartNode.propTypes = propTypes;
ChartNode.defaultProps = defaultProps;

export default ChartNode;
