import React from 'react';
import styles from './index.less';

interface Props {
    title: string;
    className?:string
}
const Title: React.FC<Props> = (props) => {
    const { title ,className} = props;
    return <div className={`${className} ${styles.title}`}>
       {title}
    </div>
};

export default Title;
