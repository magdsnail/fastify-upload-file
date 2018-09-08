'use strict'

const uploadFile = require('./unit/upload-file');

const fastify = require('fastify')({
    logger: true
});

fastify.register(require('fastify-file-upload'), {
    limits: { fileSize: 10 * 1024 * 1024 }
});

fastify.post('/file/upload', async (request, reply) => {
    const files = request.raw.files;
    const uploadFileInst = new uploadFile('./Uploads');
    const filesInfo = uploadFileInst.getFileItems(files);
    const filesItem = [];
    for(let info of filesInfo) {
        uploadFileInst.storeFile(info);
        filesItem.push({
            name: info.name,
            fileType: info.fileType,
            index: info.index,
            size: info.size
        });
    }
    reply.send({
        item: filesItem
    });


})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()