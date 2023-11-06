import getConfig from 'next/config';
import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const { serverRuntimeConfig } = getConfig();

interface DBInstance {
    initialized: boolean;
    sequelize: null | Sequelize;
    initialize: () => void;
}

export const db: DBInstance  = {
    initialized: false,
    sequelize: null,
    initialize
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    const { user, password, database } = serverRuntimeConfig.dbConfig;

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', dialectModule: mysql2, });

    // sync all models with database
    await sequelize.sync({ alter: true });

    db.sequelize = sequelize;
    db.initialized = true;
}

// sequelize models with schema definitions
