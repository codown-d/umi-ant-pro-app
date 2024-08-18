import { PageContainer } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import styles from './index.less';
import { Button, Form, Input, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const SettingPage: React.FC = () => {
  const access = useAccess();
  let productList = [{
    avatar_url: '/assets/web-ico.svg',
    enable: true,
  }]
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
        onBack: () => history.go(-1),
        style: {
          padding: 0,
          margin: 0,
        },
      }}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="网页划词查询 IP 情报"
          name="username"
          valuePropName="checked"
        >
          <Switch defaultChecked />
        </Form.Item>

        <Form.Item label="最长学习时间" name="password">
          <Input addonAfter={< >123</>} defaultValue="mysite" />
        </Form.Item>

        <Form.Item label="值守自动处置延迟">
          <Input addonAfter={< >123</>} defaultValue="mysite" />
        </Form.Item>
        <div className='mb12'>产品适配</div>
        <div className='flex-r-c' style={{justifyContent:'flex-start'}}>
          {productList.map(item => {
            return <div className={`flex-c-c ${styles['product-info']}`}>
              <img src={item.avatar_url} alt="" style={{width:'40px'}}/>
              <Switch defaultChecked={item.enable} className='mt2' size={'small'} />
            </div>
          })}
        </div>
        <div>
        数据抓取网页
        </div>
        <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 passengers'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Passengers' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="passenger name" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
              >
               新增
              </Button>
             
            </Form.Item>
          </>
        )}
      </Form.List>
      </Form>
    </PageContainer>
  );
};

export default SettingPage;
