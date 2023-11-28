const models = require("../models")

async function checkPermission(roleId, permName) {
    return new Promise((resolve, reject) => {
         models.Permission.findOne({
             where: {
                 permName: permName
             }
         }).then((result)=>{
            models.RolePermission.findOne({
                where: {
                    roleId: roleId,
                    perId: result.id
                }
            }).then((result)=> {
                if(result)resolve(result)
                else {
                    reject({message: 'Forbidden'})
                }
            }).catch((error) => {
                reject(error);
            });
         }).catch((error) => {
            reject(error);
        });
    })
}

module.exports = {
    checkPermission
}