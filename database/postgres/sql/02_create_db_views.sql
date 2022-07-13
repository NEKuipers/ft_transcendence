/*
** Displays the match history for all users
*/
CREATE OR REPLACE VIEW vw_matches
AS
WITH match_history
AS
(
    /* get all games as player 1 */
    SELECT
        u.id        AS user_id,
        m.player_one,
        m.player_two,
        m.winner_id,
        m.id,
        m.status,
        start_time,
        end_time,
        p1_points,
        p2_points,
        reason,
        mode
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_one

    UNION ALL

    /* get all games as player 2 */
    SELECT
        u.id        AS user_id,
        m.player_one,
        m.player_two,
        m.winner_id,
        m.id,
        m.status,
        start_time,
        end_time,
        p1_points,
        p2_points,
        reason,
        mode
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
)
SELECT
    mh.user_id  AS user_id,
    p1.username AS player_one,
    p2.username AS player_two,
    w.username  AS winner,
    mh.id       AS match_id,
    mh.status   AS match_status,
    start_time  AS start_time,
    end_time    AS end_time,
    p1_points   AS p1_points,
    p2_points   AS p2_points,
    reason      AS loose_reason,
    mode        AS game_mode
FROM match_history mh
    INNER JOIN users u
        ON mh.user_id = u.id
    INNER JOIN users p1
        ON mh.player_one = p1.id
    INNER JOIN users p2
        ON mh.player_two = p2.id
    INNER JOIN users w
        ON mh.user_id = w.id;


/*
** Displays all your friends ongoing matches so that you're able
** to join as a spectator.
*/
CREATE OR REPLACE VIEW vw_spectate
AS
SELECT
    m.match_id      AS match_id,
    m.player_one    AS player_one,
    m.player_two    AS player_two
FROM users u
    INNER JOIN friends f
        ON u.id = f.from_user_id
            AND f.status = 'accepted'
    INNER JOIN users fu
        ON f.to_user_id = fu.id
    INNER JOIN vw_matches m
        ON f.to_user_id = m.user_id
            AND m.match_status = 'ongoing';


/*
** Displays a user his list of friends and potential friends to be
** (i.e. a friend request has been send)
*/
CREATE OR REPLACE VIEW vw_friends
AS
SELECT
    u.id            AS user_id,
    u.username      AS username,
    f.to_user_id    AS to_user_id,
    fu.username     AS to_username,
    f.status        AS status,
    f.send_time     AS send_time,
    f.response_time AS response_time
FROM users u
    INNER JOIN friends f
        ON u.id = f.from_user_id
    INNER JOIN users fu
        ON f.to_user_id = fu.id
WHERE f.status IN ('send', 'accepted');


/*
** Displays the list of friend requests for each user
*/
CREATE OR REPLACE VIEW vw_friend_requests
AS
SELECT
    u.id            AS user_id,
    u.username      AS username,
    f.from_user_id  AS from_user_id,
    fu.username     AS from_username,
    f.send_time     AS send_time
FROM users u
    INNER JOIN friends f
        ON u.id = f.to_user_id
    INNER JOIN users fu
        ON f.from_user_id = fu.id
WHERE f.status = 'send';


/*
** Displays all users that you blocked (so that you may unblock them)
*/
CREATE OR REPLACE VIEW vw_blocked_users
AS
SELECT
    u.id                AS user_id,
    bu.blocked_user_id  AS blocked_user_id,
    buu.username        AS blocked_user_name
FROM users u
    INNER JOIN blocked_users bu
        ON u.id = bu.blocked_by_id
    INNER JOIN users buu
        ON bu.blocked_user_id = buu.id;


/*
** Displays the leader board based using the matches meta fields
*/
CREATE OR REPLACE VIEW public.vw_ladder
AS
WITH match_history
AS
(
    /* get all games as player 1 */
    SELECT
        u.id,
        u.username,
        m.player_one,
        m.player_two,
        m.winner_id,
        start_time,
        end_time,
        p1_points,
        p2_points,
        reason,
        mode
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_one
    WHERE m.status = 'finished'

    UNION ALL

    /* get all games as player 2 */
    SELECT
        u.id,
        u.username,
        m.player_one,
        m.player_two,
        m.winner_id,
        start_time,
        end_time,
        p1_points,
        p2_points,
        reason,
        mode
    FROM users u
        INNER JOIN matches m
            ON u.id = m.player_two
    WHERE m.status = 'finished'
)
SELECT
    mh.id       AS user_id,
    mh.username AS username,
    COUNT(*)    AS games_played,
    SUM
    (
      CASE
        WHEN mh.winner_id = mh.id
        THEN 1
        ELSE 0
      END
    )           AS wins,
    SUM
    (
      CASE
        WHEN mh.winner_id = mh.id
        THEN 0
        ELSE 1
      END
    )           AS losses
FROM match_history mh
GROUP BY mh.id, mh.username;

/*
** Displays the achievements for all users
*/
CREATE OR REPLACE VIEW public.vw_achievements
AS
SELECT
    u.id            AS user_id,
    u.username      AS username,
    a.id            AS achievement_id,
    a.name          AS achievement_name,
    a.description   AS achievement_description
FROM users u
    INNER JOIN user_achievements ua
        ON u.id = ua.user_id
    INNER JOIN achievements a
        ON ua.achievement_id = a.id;

/*
** Display of all custom types
*/
CREATE OR REPLACE VIEW vw_types
AS
SELECT
    t.typname       AS type_name,
    e.enumsortorder AS order,
    e.enumlabel     AS label
FROM pg_enum e
    INNER JOIN pg_type t
        ON e.enumtypid = t.oid;
