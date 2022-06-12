USE transcendence;

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
