/*
** 
*/
TRUNCATE TABLE public.users RESTART IDENTITY CASCADE;

INSERT INTO public.users(username, status, oauth_refresh_token, oauth_token_expiration_time, is_logged_in)
VALUES
('jevan-de', 'online', NULL, NULL, TRUE),
('jsimonis', 'online', NULL, NULL, TRUE),
('nkuipers', 'online', NULL, NULL, TRUE),
('tmullan', 'online', NULL, NULL, TRUE);

TRUNCATE TABLE public.matches RESTART IDENTITY;

INSERT INTO public.matches(player_one, player_two, winner_id, meta, options)
VALUES
(1, 2, 1, '"start_time" => "2022-06-01 17:00:00", "end_time" => "2022-06-01 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
(1, 3, 1, '"start_time" => "2022-06-02 17:00:00", "end_time" => "2022-06-02 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL),
(1, 4, 1, '"start_time" => "2022-06-03 17:00:00", "end_time" => "2022-06-03 17:10:00", "p1_points" => "10", "p2_points" => "0"', NULL);


TRUNCATE TABLE public.achievements RESTART IDENTITY CASCADE;

INSERT INTO public.achievements(name, description, func_name, func_args)
VALUES
('beginner', 'play 10 games', 'fnc_achievement_play_x', ARRAY [10]),
('first win', 'win 1 game', 'fnc_achievement_win_x', ARRAY [1]),
('junior', 'win 3 games', 'fnc_achievement_win_x', ARRAY [3]),
('medior', 'win 10 games', 'fnc_achievement_win_x', ARRAY [10]),
('senior', 'win 20 games', 'fnc_achievement_win_x', ARRAY [20]),
('turkey', 'win 3 consecutive games', 'fnc_achievement_win_x_consecutive', ARRAY [3]);

TRUNCATE TABLE public.user_achievements RESTART IDENTITY;
