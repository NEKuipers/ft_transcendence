CREATE OR REPLACE PROCEDURE sp_update_achievements(user_id IN BIGINT, achievements INOUT INT[])
LANGUAGE PLPGSQL
AS
$BODY$
BEGIN

/*
** The idea here is to select achievements that have not
** yet been achieved by the user and evaluate them.
*/
achievements := ARRAY (
    SELECT a.id
    FROM achievements a, fnc_achievement_exec('SELECT ' || a.func_name || '(1, ' || array_to_string(func_args, ',') || ')') as f(achieved BOOL)
    WHERE NOT EXISTS
    (
        SELECT *
        FROM user_achievements ua
            INNER JOIN users u
                ON ua.user_id = u.id
        WHERE u.id = user_id
    )
);

END;
$BODY$