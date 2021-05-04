const Router = require("koa-router"); // 路由
const Minio = require("minio");
const config = require("../../config/keys.js");
// const upload = require("../../middleware/upload.js");

const router = new Router(); // 路由对象

/**
 * @route GET api/publish/test
 * @description 测试的接口
 * @access 公开的接口
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "public test" };
});

router.post(
  "/upload",

  async (ctx) => {
    ctx.body = ctx.request.files;
    const minioConfig = config.minioConfig;

    const minioClient = new Minio.Client({ ...minioConfig });
    // console.log(ctx.request.files, 99999);
    const file = ctx.request.files;

    // Make a bucket called europetrip.
    // minioClient.makeBucket("second", "us-east-1", function (err) {
    //   if (err) return console.log(err, 7777);

    //   console.log('Bucket created successfully in "us-east-1".');

    var metaData = {
      "Content-Type": "application/octet-stream",
      "X-Amz-Meta-Testing": 1234,
      example: 5678,
    };
    // Using fPutObject API upload your file to the bucket europetrip.
    minioClient.fPutObject(
      "second",
      file.name,
      file.path,
      metaData,
      function (err, etag) {
        if (err) return console.log(err, 88888);
        console.log("File uploaded successfully.");
      }
    );
  }
);
// });

module.exports = router.routes();
