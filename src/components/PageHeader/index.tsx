import React, { useCallback, useMemo, useState } from 'react';
import styles from './index.less';
import { history } from '@umijs/max';
import { PageHeader, PageHeaderProps } from '@ant-design/pro-components';

const Header: React.FC<PageHeaderProps> = (props) => {
    const {className} = props;
    const realProps = useMemo(() => {
      return {
        className: `${styles.page_header} ${className || ''}`,
        onBack:()=>{
          props.onBack?.()||history.go(-1)
        }
      };
    }, [props]);
    return <PageHeader  {...realProps}></PageHeader>
};

export default Header;
