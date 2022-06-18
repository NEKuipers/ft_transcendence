/*
** The idea here is to select achievements that have not
** yet been achieved by the user and evaluate them using
** the functions provided in the `achievements` table.
*/
CREATE OR REPLACE FUNCTION fnc_get_new_achievements(user_id IN BIGINT, achievements OUT INT[])
RETURNS INT[]
LANGUAGE PLPGSQL
AS
$func$
#variable_conflict use_variable
BEGIN
achievements := ARRAY (
    SELECT a.id
    FROM achievements a, fnc_achievement_exec('SELECT ' || a.func_name || '(' || user_id || ', ' || array_to_string(func_args, ',') || ')') as f(achieved BOOL)
    WHERE NOT EXISTS
    (
        SELECT *
        FROM user_achievements ua
            INNER JOIN users u
                ON ua.user_id = u.id
                    AND ua.achievement_id = a.id
        WHERE u.id = user_id
    )
    AND f.achieved = TRUE
);
END;
$func$