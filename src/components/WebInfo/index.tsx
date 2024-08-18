import { Col, Flex, Layout, Row, Typography } from 'antd';
import React from 'react';
import  './index.less';

interface Props {
    name: string;
}

const WebInfo: React.FC<Props> = (props) => {
    const { name } = props;
    return <div className='flex-r-c web-info' style={{ width: '100%', height: '86px' }}>
        <div style={{ width: '108px',height:'100%' }} className='flex-c-c web-ico'>
            <img src="/assets/web-ico.svg" alt="" />
            <span className='web-title'>产品名称</span>
        </div>
        <div style={{flex:1}} className='ml16'>
            <div className='web-name'>falco UI</div>
            <div className='web-url mt2'>URL: http://192.168.0.10:32027/</div>
            <div className='web-url web-path mt2'>路径：/events</div>
        </div>
    </div>
};

export default WebInfo;
