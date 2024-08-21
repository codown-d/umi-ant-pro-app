import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';
import './index.less';
import styles from './index.less';
import { useCallback } from 'react';
import { postSystemConfig } from '@/services';

let { Option } = Select;
const SettingPage: React.FC = () => {
  const access = useAccess();
  let productList = [
    {
      avatar_url: '/images/web-ico.svg',
      enable: true,
    },
  ];
  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue={'http'}>
      <Select style={{ width: 90 }}>
        <Option value="http">http</Option>
        <Option value="https">https</Option>
      </Select>
    </Form.Item>
  );

  const [form] = Form.useForm();
  let postSystemConfigFn = useCallback((val) => {
    postSystemConfig(val).then(res => {
      console.log(res)
    })
  }, [])
  return (
    <PageContainer
      ghost
      header={{
        title: '设置',
        onBack: () => history.go(-1),
        style: {
          padding: 0,
          margin: 0,
        },
      }}
    >
      <Form
        form={form}
        colon={false}
        initialValues={{ remember: true }}
        autoComplete="off"
        className='setting-form'
        layout={'horizontal'}
        labelAlign={'left'}
      >
        <Form.Item
          label="网页划词查询 IP 情报"
          name="username"
          valuePropName="checked"
          className='setting-form-item-between'
        >
          <Switch defaultChecked />
        </Form.Item>

        <Form.Item label="最长学习时间" name="password" initialValue={90}
          className='setting-form-item-between'>
          <InputNumber
            addonAfter={'分钟'}
            style={{ width: '100px' }}
          />
        </Form.Item>

        <Form.Item
          label="值守自动处置延迟"
          name="password2"
          initialValue={10}
          className='setting-form-item-between'
        >
          <InputNumber
            addonAfter={'秒'}
            style={{ width: '100px' }}
          />
        </Form.Item>
        <div className="mb12 mt8">产品适配</div>
        <div className="flex-r-c" style={{ justifyContent: 'flex-start' }}>
          {productList.map((item, index) => {
            return (
              <div className={`flex-c-c ${styles['product-info']}`} key={index}>
                <img src={item.avatar_url} alt="" style={{ width: '40px' }} />
                <Switch
                  defaultChecked={item.enable}
                  className="mt2"
                  size={'small'}
                />
              </div>
            );
          })}
        </div>
        <div className="mb8">数据抓取网页</div>
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
                  required={false}
                  key={field.key}
                  className="mb8">
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      addonBefore={prefixSelector}
                      placeholder="请输入数据抓取网页地址"
                      style={{ width: '90%' }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ color: '#E95454' }}
                      onClick={() => remove(field.name)}
                      className="ml10 f16"
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Button
                type="dashed"
                className="mt8"
                onClick={() => add()}
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
              >
                新增
              </Button>
            </>
          )}
        </Form.List>

      </Form>
      <div className="flex-r-c mt32">
        <Button style={{ flex: 1 }} className={'mr10'}>
          恢复默认配置
        </Button>
        <Button className={'ml10'} style={{ flex: 1 }} type={'primary'} onClick={() => {
          form.validateFields().then(val => {
            postSystemConfigFn(val)
          })
        }}>
          保存
        </Button>
      </div>
    </PageContainer>
  );
};

export default SettingPage;
