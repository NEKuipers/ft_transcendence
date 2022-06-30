/*
** Unit tests for the achievement function: [fnc_achievement_play_x]
**  - None played
**  - x-1 played
**  - x played
*/
TRUNCATE TABLE public.avatars RESTART IDENTITY CASCADE;

INSERT INTO public.avatars(img, width, height, name, format)
VALUES
('\xDEADBEEF', 0, 0, 'default', 'img/png');

TRUNCATE TABLE public.users RESTART IDENTITY CASCADE;

INSERT INTO public.users(username, status, oauth_refresh_token, oauth_token_expiration_time, is_logged_in)
VALUES
('jevan-de', 'online', 'abc', now(), TRUE),
('jsimonis', 'online', 'abc', now(), TRUE),
('nkuipers', 'online', 'abc', now(), TRUE),
('tmullan', 'online', 'abc', now(), TRUE);

TRUNCATE TABLE public.matches RESTART IDENTITY;

DO
LANGUAGE PLPGSQL
$$
DECLARE
    achieved    BOOL;
    x           INT := 3;
    user_id     BIGINT := 1;
BEGIN
    achieved := fnc_achievement_play_x(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_play_x(' || user_id || ',' || x || ') ASSERT failed (with no match history)';
    
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 2, 1, '"start_time" => "2022-06-01 17:00:00", "end_time" => "2022-06-01 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 3, 1, '"start_time" => "2022-06-02 17:00:00", "end_time" => "2022-06-02 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL);
    
    achieved := fnc_achievement_play_x(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_play_x(' || user_id || ',' || x || ') ASSERT failed (with x-1 matches played)';
    
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 4, 1, '"start_time" => "2022-06-03 17:00:00", "end_time" => "2022-06-03 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL);
    
    achieved := fnc_achievement_play_x(user_id, x);
    ASSERT achieved = TRUE, 'fnc_achievement_play_x(' || user_id || ',' || x || ') ASSERT failed (with x matches played)';
END;
$$;

/*
** Unit tests for the achievement function: [fnc_achievement_win_x]
**  - None won
**  - x-1 won
**  - x-1 won then 1 loss and then 1 win
*/
TRUNCATE TABLE public.users RESTART IDENTITY CASCADE;

INSERT INTO public.users(username, status, oauth_refresh_token, oauth_token_expiration_time, is_logged_in)
VALUES
('jevan-de', 'online', 'abc', now(), TRUE),
('jsimonis', 'online', 'abc', now(), TRUE),
('nkuipers', 'online', 'abc', now(), TRUE),
('tmullan', 'online', 'abc', now(), TRUE);

TRUNCATE TABLE public.matches RESTART IDENTITY;

DO
LANGUAGE PLPGSQL
$$
DECLARE
    achieved    BOOL;
    x           INT := 3;
    user_id     BIGINT := 1;
BEGIN
    achieved := fnc_achievement_win_x(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_win_x(' || user_id || ',' || x || ') ASSERT failed (with no match history)';
    
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 2, 1, '"start_time" => "2022-06-01 17:00:00", "end_time" => "2022-06-01 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 3, 1, '"start_time" => "2022-06-02 17:00:00", "end_time" => "2022-06-02 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL);
    
    achieved := fnc_achievement_win_x(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_win_x(' || user_id || ',' || x || ') ASSERT failed (x-1 wins)';
    
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 4, 4, '"start_time" => "2022-06-03 17:00:00", "end_time" => "2022-06-03 17:10:00", "p1_points" => "0", "p2_points" => "10"', NULL);
    
    achieved := fnc_achievement_win_x(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_win_x(' || user_id || ',' || x || ') ASSERT failed (x matches with 1 loss)';
    
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 2, 1, '"start_time" => "2022-06-04 17:00:00", "end_time" => "2022-06-04 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL);
    
    achieved := fnc_achievement_win_x(user_id, x);
    ASSERT achieved = TRUE, 'fnc_achievement_win_x(' || user_id || ',' || x || ') ASSERT failed (x+1 matches with 1 loss)';
END;
$$;

/*
** Unit tests for the achievement function: [fnc_achievement_win_x_consecutive]
**  - None won
**  - x-1 won consecutive
**  - x won consecutive
**  - x-1 won consecutive and then loss
**  - x won after a loss
*/
TRUNCATE TABLE public.users RESTART IDENTITY CASCADE;

INSERT INTO public.users(username, status, oauth_refresh_token, oauth_token_expiration_time, is_logged_in)
VALUES
('jevan-de', 'online', 'abc', now(), TRUE),
('jsimonis', 'online', 'abc', now(), TRUE),
('nkuipers', 'online', 'abc', now(), TRUE),
('tmullan', 'online', 'abc', now(), TRUE);

TRUNCATE TABLE public.matches RESTART IDENTITY;

DO
LANGUAGE PLPGSQL
$$
DECLARE
    achieved    BOOL;
    x           INT := 3;
    user_id     BIGINT := 1;
BEGIN
    achieved := fnc_achievement_win_x_consecutive(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_win_x_consecutive(' || user_id || ',' || x || ') ASSERT failed (no match history)';
END;
$$;

TRUNCATE TABLE public.matches RESTART IDENTITY;

DO
LANGUAGE PLPGSQL
$$
DECLARE
    achieved    BOOL;
    x           INT := 3;
    user_id     BIGINT := 1;
BEGIN 
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 2, 1, '"start_time" => "2022-06-01 17:00:00", "end_time" => "2022-06-01 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 3, 1, '"start_time" => "2022-06-02 17:00:00", "end_time" => "2022-06-02 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 4, 4, '"start_time" => "2022-06-03 17:00:00", "end_time" => "2022-06-03 17:10:00", "p1_points" => "0", "p2_points" => "10"', NULL);
    
    achieved := fnc_achievement_win_x_consecutive(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_win_x_consecutive(' || user_id || ',' || x || ') ASSERT failed (x-1 wins)';
END;
$$;

TRUNCATE TABLE public.matches RESTART IDENTITY;

DO
LANGUAGE PLPGSQL
$$
DECLARE
    achieved    BOOL;
    x           INT := 3;
    user_id     BIGINT := 1;
BEGIN
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 2, 1, '"start_time" => "2022-06-01 17:00:00", "end_time" => "2022-06-01 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 3, 1, '"start_time" => "2022-06-02 17:00:00", "end_time" => "2022-06-02 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 4, 1, '"start_time" => "2022-06-03 17:00:00", "end_time" => "2022-06-03 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL);
    
    achieved := fnc_achievement_win_x_consecutive(user_id, x);
    ASSERT achieved = TRUE, 'fnc_achievement_win_x_consecutive(' || user_id || ',' || x || ') ASSERT failed (x wins)';
END;
$$;

TRUNCATE TABLE public.matches RESTART IDENTITY;

DO
LANGUAGE PLPGSQL
$$
DECLARE
    achieved    BOOL;
    x           INT := 3;
    user_id     BIGINT := 1;
BEGIN
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 2, 1, '"start_time" => "2022-06-01 17:00:00", "end_time" => "2022-06-01 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 3, 1, '"start_time" => "2022-06-02 17:00:00", "end_time" => "2022-06-02 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 4, 4, '"start_time" => "2022-06-03 17:00:00", "end_time" => "2022-06-03 17:10:00", "p1_points" => "0", "p2_points" => "10"', NULL),
    (1, 2, 1, '"start_time" => "2022-06-04 17:00:00", "end_time" => "2022-06-04 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL);
    
    achieved := fnc_achievement_win_x_consecutive(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_win_x_consecutive(' || user_id || ',' || x || ') ASSERT failed (x wins with one loss in between)';
END;
$$;

TRUNCATE TABLE public.matches RESTART IDENTITY;

DO
LANGUAGE PLPGSQL
$$
DECLARE
    achieved    BOOL;
    x           INT := 3;
    user_id     BIGINT := 1;
BEGIN
    achieved := fnc_achievement_win_x_consecutive(user_id, x);
    ASSERT achieved = FALSE, 'fnc_achievement_win_x_consecutive(' || user_id || ',' || x || ') ASSERT failed with no rows';
    
    INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
    VALUES
    (1, 2, 1, '"start_time" => "2022-06-01 17:00:00", "end_time" => "2022-06-01 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 3, 1, '"start_time" => "2022-06-02 17:00:00", "end_time" => "2022-06-02 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 4, 4, '"start_time" => "2022-06-03 17:00:00", "end_time" => "2022-06-03 17:10:00", "p1_points" => "0", "p2_points" => "10"', NULL),
    (1, 2, 1, '"start_time" => "2022-06-04 17:00:00", "end_time" => "2022-06-04 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 3, 1, '"start_time" => "2022-06-05 17:00:00", "end_time" => "2022-06-05 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
    (1, 4, 1, '"start_time" => "2022-06-06 17:00:00", "end_time" => "2022-06-06 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL);
    
    achieved := fnc_achievement_win_x_consecutive(user_id, x);
    ASSERT achieved = TRUE, 'fnc_achievement_win_x_consecutive(' || user_id || ',' || x || ') ASSERT failed (x wins after loss)';
END;
$$;

TRUNCATE TABLE public.users RESTART IDENTITY CASCADE;
