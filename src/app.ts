import './assets/style/common.less';
export async function getInitialState(): Promise<{ name: string }> {
  return {
    name: '@umijs/max',
  };
}
