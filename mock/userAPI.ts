const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'GET /api/v1/modelInfo': (req: any, res: any) => {
    res.json({
      success: true,
      data: {
        version: (Math.random() * 100 + 50).toFixed(0),
        time: '20240726',
      },
      errorCode: 0,
    });
  },
  'GET /api/v1/systemInfo': (req: any, res: any) => {
    res.json({
      success: true,
      data: {
        model: `模型 - ${(Math.random() * 100 + 50).toFixed(0)}版本 20240726`,
        description: 'new Date().getTime()',
        latestLearning: new Date().getTime(),
        learningPeriod: '1h12h',
      },
      errorCode: 0,
    });
  },
  'GET /api/v1/appConfig': (req: any, res: any) => {
    res.json({
      success: true,
      data: {
        enable: true,
        maxStudyTime: 90,
        disposeDelay: 10,
        product: [
          {
            protocol: 'https',
            pageUrl: 'console.tensorsecurity.cn/#/deflect-defense',
          },
          {
            protocol: 'https',
            pageUrl: 'console.tensorsecurity.cn/#/palace',
          },
        ],
      },
      errorCode: 0,
    });
  },
  'GET /api/v1/productList': (req: any, res: any) => {
    res.json({
      success: true,
      data: ['tensorsecurity', 'ecitic'],
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'PUT /api/v1/systemInfo': (req: any, res: any) => {
    res.json({
      code: 0,
      success: true,
      errorCode: 0,
    });
  },
  'POST /api/v1/systemInfo': (req: any, res: any) => {
    res.json({
      code: 0,
      success: true,
      errorCode: 0,
    });
  },
  'POST /api/v1/webAction': (req: any, res: any) => {
    console.log(req);
    res.json({
      code: 0,
      success: true,
      errorCode: 0,
    });
  },
};
