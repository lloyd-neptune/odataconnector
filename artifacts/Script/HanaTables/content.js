if (!req.query.dbid) {
    result.data = { error: "Please select database connection string" };
    return complete();
}

if (!req.query.schema) {
    result.data = { error: "Please select database schema" };
    return complete();
}

try {

    const client = await globals.Utils.HANAConnect(req.query.dbid);
    const schemas = await globals.Utils.HANAExec(client, `select TABLE_NAME,CREATE_TIME from TABLES where schema_name = '${req.query.schema}'`);

    result.data = schemas.sort(globals.Utils.SortBy("TABLE_NAME"));
    complete();

} catch (error) {
    log.error("Error in request: ", error);
    return fail();
}
