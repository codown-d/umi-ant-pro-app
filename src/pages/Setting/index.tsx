import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  message,
} from 'antd';
import { useEffect } from 'react';
import './index.less';

let { Option } = Select;
const SettingPage: React.FC = () => {
  const access = useAccess();
  let productList = [
    {
      avatar_url: '/images/web-ico.svg',
      enable: true,
    },
  ];
  const [form] = Form.useForm();
  useEffect(() => {
    chrome.storage.local.get(
      'settingInfo',
      function (result: { [x: string]: any }) {
        console.log('Data retrieved:', result['settingInfo']);
        form.setFieldsValue(result['settingInfo']);
      },
    );
  }, []);
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
      childrenContentStyle={{ padding: 0 }}
    >
      <Form
        form={form}
        colon={false}
        initialValues={{ remember: true }}
        labelCol={{ flex: `calc(100% - 140px)` }}
        wrapperCol={{ flex: '100px' }}
        autoComplete="off"
        className="setting-form"
        layout={'horizontal'}
        labelAlign={'left'}
      >
        <Form.Item
          label="网页划词查询 IP 情报"
          name="enable"
          valuePropName="checked"
          className="setting-form-item-between"
          initialValue={true}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="最长学习时间"
          name="maxStudyTime"
          initialValue={90}
          className="setting-form-item-between"
        >
          <InputNumber addonAfter={'分钟'} style={{ width: '100px' }} />
        </Form.Item>

        <Form.Item
          label="值守自动处置延迟"
          name="disposeDelay"
          initialValue={10}
          className="setting-form-item-between"
        >
          <InputNumber addonAfter={'秒'} style={{ width: '100px' }} />
        </Form.Item>
        <div className="mb12 mt8">产品适配</div>
        <div className="flex-r-c mb20" style={{ justifyContent: 'flex-start' }}>
          {productList.map((item, index) => {
            return (
              <div className={`flex-c-c product-info act`} key={index}>
                <img src={item.avatar_url} alt="" style={{ width: '40px' }} />
                <Form.Item
                  noStyle
                  valuePropName="checked"
                  name={['product', index, 'enable']}
                >
                  <Switch
                    className="mt2"
                    size={'small'}
                    defaultChecked={true}
                  />
                </Form.Item>
              </div>
            );
          })}
        </div>
        <div className="mb8">数据抓取网页</div>
        <Form.List name="product">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Form.Item
                  required={false}
                  key={key}
                  className="mb8"
                  wrapperCol={{ flex: 1 }}
                >
                  <Form.Item
                    {...restField}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: '请输入数据抓取网页地址',
                      },
                    ]}
                    noStyle
                    name={[name, 'pageUrl']}
                  >
                    <Input
                      addonBefore={
                        <Form.Item
                          name={[name, 'protocol']}
                          noStyle
                          initialValue={'http'}
                        >
                          <Select style={{ width: 90 }}>
                            <Option value="http">http</Option>
                            <Option value="https">https</Option>
                          </Select>
                        </Form.Item>
                      }
                      style={{ width: '90%' }}
                      placeholder="请输入数据抓取网页地址"
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ color: '#E95454' }}
                      onClick={() => remove(name)}
                      className="ml10 f16 mt10"
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
        <Button
          style={{ flex: 1 }}
          className={'mr10'}
          onClick={() => {
            let settingInfo = {
              enable: true,
              maxStudyTime: 90,
              disposeDelay: 10,
              product: [],
            };
            chrome.storage.local.set({ settingInfo }, () => {
              form.setFieldsValue(settingInfo);
              message.success('恢复默认配置');
            });
          }}
        >
          恢复默认配置
        </Button>
        <Button
          className={'ml10'}
          style={{ flex: 1 }}
          type={'primary'}
          onClick={() => {
            form.validateFields().then((settingInfo) => {
              console.log(settingInfo);
              chrome.tabs.query(
                { active: true, currentWindow: true },
                (tabs) => {
                  chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                      type: 'FROM_BACKGROUND_SETINFO',
                      msg: settingInfo,
                    },
                    () => {
                      chrome.storage.local.set({ settingInfo }, () => {
                        message.success('保存成功');
                      });
                    },
                  );
                },
              );
            });
          }}
        >
          保存
        </Button>
      </div>
    </PageContainer>
  );
};

export default SettingPage;
