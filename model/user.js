const { DataTypes } = require('sequelize');

const model = async (sequelize)=>{

    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false},
        password: { type: DataTypes.STRING, allowNull: false },
        // confirm: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
    };

    // const options = {
    //     defaultScope: {
    //         // exclude password hash by default
    //         attributes: { exclude: ['passwordHash'] }
    //     },
    //     scopes: {
    //         // include hash with this scope
    //         withHash: { attributes: {}, }
    //     }
    // };
    return sequelize.define('User', attributes);
    // return sequelize.define('User', schema);
}

module.exports=model;