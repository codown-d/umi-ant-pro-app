import WebInfo from '@/components/WebInfo';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <div className={styles.container}>
      <WebInfo name={''} />
    </div>
  );
};

export default HomePage;
