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

router.post("/upload", async (ctx) => {
  const minioConfig = config.minioConfig;
  const minioClient = new Minio.Client({ ...minioConfig });
  const file = ctx.request.files.file;

  let metaData = {
    "Content-Type": "application/octet-stream",
    "X-Amz-Meta-Testing": 1234,
    example: 5678,
  };
  const staticPaath = "E:\\minio\\data\\second";

  // Using fPutObject API upload your file to the bucket europetrip.
  minioClient.fPutObject(
    "second",
    file.name,
    file.path,
    metaData,
    function (err, etag) {
      if (err) {
        ctx.throw(404, error);
      }

      console.log("File uploaded successfully.");
    }
  );

  ctx.status = 200;
  ctx.success({ path: staticPaath + file.name });
});

module.exports = router.routes();
