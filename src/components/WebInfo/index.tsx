import { Col, Flex, Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './index.less';

interface Props {
    name: string;
}

const WebInfo: React.FC<Props> = (props) => {
    const { name } = props;
    return <div className='flex-r-c' style={{ width: '100%', height: '86px' }}>
        <div style={{ width: '108px', height: '100%' }} className='flex-c-c'>
            <img src="/assets/web-ico.svg" alt="" />
            123
        </div>
        <div style={{flex:1,height:'100%'}}>123</div>
    </div>
};

export default WebInfo;
