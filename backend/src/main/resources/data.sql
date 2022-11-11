--USERS
insert into users (id, email,first_name,last_name, password)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'admin@example.com', 'James','Bond', '$2a$10$p/pXIAs28xf.7Qt1EGKKGu7q1Mt7PyHFMdwKb3cNi6QFrJmn51LPS' ),
('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'user@example.com', 'Tyler','Durden', '$2a$10$p/pXIAs28xf.7Qt1EGKKGu7q1Mt7PyHFMdwKb3cNi6QFrJmn51LPS'),
('8e834c6e-6783-4a0e-ac1b-e390a6deae9f', 'giga@chad.max', 'GianGantos', 'Maximus', '$2a$10$p/pXIAs28xf.7Qt1EGKKGu7q1Mt7PyHFMdwKb3cNi6QFrJmn51LPS')
 ON CONFLICT DO NOTHING;


--ROLES
INSERT INTO role(id, name)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'DEFAULT'),
       ('47883133-4042-4c2c-ac41-c1fd5631864d', 'USER'),
       ('4b650987-a0d9-4bf6-834e-b8f9e3db69f8', 'ADMIN')
ON CONFLICT DO NOTHING;

--AUTHORITIES
INSERT INTO authority(id, name)
VALUES ('2ebf301e-6c61-4076-98e3-2a38b31daf86', 'DEFAULT'),
       ('2b0a0711-8807-4d20-b376-5d5b184078c3', 'READ'),
       ('3cef575c-49b7-4c34-858a-209b39dbc150', 'USER_CREATE'),
       ('0b37d53c-a9a1-443d-8f4b-0384ab77833c', 'USER_MODIFY'),
       ('1190fe33-5f17-46cb-a9df-dc0d949de63e', 'USER_DELETE')
ON CONFLICT DO NOTHING;

--assign roles to users
insert into users_role (users_id, role_id)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', '4b650987-a0d9-4bf6-834e-b8f9e3db69f8'),
       ('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', '47883133-4042-4c2c-ac41-c1fd5631864d')
 ON CONFLICT DO NOTHING;

--assign authorities to roles
INSERT INTO role_authority(role_id, authority_id)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', '2ebf301e-6c61-4076-98e3-2a38b31daf86'),
       ('47883133-4042-4c2c-ac41-c1fd5631864d', '2b0a0711-8807-4d20-b376-5d5b184078c3'),
       ('4b650987-a0d9-4bf6-834e-b8f9e3db69f8', '3cef575c-49b7-4c34-858a-209b39dbc150'),
       ('4b650987-a0d9-4bf6-834e-b8f9e3db69f8', '2b0a0711-8807-4d20-b376-5d5b184078c3'),
       ('4b650987-a0d9-4bf6-834e-b8f9e3db69f8', '0b37d53c-a9a1-443d-8f4b-0384ab77833c'),
       ('4b650987-a0d9-4bf6-834e-b8f9e3db69f8', '1190fe33-5f17-46cb-a9df-dc0d949de63e')
 ON CONFLICT DO NOTHING;

--add images posts to imagePosts
INSERT INTO image_post(id, description, imageurl, publication_time, author_id)
VALUES ('d7655697-eeef-4a2a-870a-1bc4ef022ad3', 'How do you do fellow kids?', 'https://cdn.vox-cdn.com/thumbor/KwXyAUZGjHOfbZ7Ef0AAtXnzG7M=/0x0:1409x785/1400x1050/filters:focal(734x364:735x365)/cdn0.vox-cdn.com/uploads/chorus_asset/file/8846551/Screen_Shot_2017_07_13_at_1.09.20_PM.png' , '2022-11-03 00:00:00', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('668a7c62-01dd-416e-a7e5-bce70eae876f', 'one does not simply walk into mordor', 'https://i.kym-cdn.com/entries/icons/original/000/000/143/493654d6ef.jpg' , '2022-11-04 00:00:00', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('e811cac7-7fa5-4625-a5ab-8011faa35b43', 'jet fuel cant melt steel beams', 'https://i.guim.co.uk/img/media/882940c47b3e740821258458f62b14b552e614c8/0_0_542_617/master/542.jpg?width=620&quality=85&dpr=1&s=none' , '2022-11-04 12:00:00', '0d8fa44c-54fd-4cd0-ace9-2a7da57992de'),
       ('b85b9e34-5242-425e-b62d-863c4b30601f', 'you crazy', 'https://i.guim.co.uk/img/media/596f80ed52713302bfba078113594ca419e520a4/0_0_1024_614/master/1024.jpg?width=620&quality=85&dpr=1&s=none' , '2022-11-05 23:30:00', '0d8fa44c-54fd-4cd0-ace9-2a7da57992de'),
       ('df32da21-a6b5-4131-81a1-76a7882e309a', 'doge', 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/1/20/1390229376041/1773f12e-7ddc-4f65-ae31-ef0fbba4f4d4-620x372.png?width=620&quality=85&auto=format&fit=max&s=d9153412cec194021055d835150546f0' , '2022-11-03 12:00:00', 'ba804cb9-fa14-42a5-afaf-be488742fc54'),
       ('baa1c1a5-c9e0-478f-8be9-eb3b119019f3', 'bad luck brian', 'https://i.kym-cdn.com/photos/images/newsfeed/000/326/226/cac.jpg' , '2022-11-01 12:00:00', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('b8de97a1-1fcb-4808-ad5f-39fbafa92a98', 'eLOL musk', 'https://i.kym-cdn.com/photos/images/newsfeed/002/472/184/2f7' , '2022-11-01 13:00:00', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('5c8b129c-7410-4fd8-849c-20364340d8a8', 'letroll HD', 'https://pbs.twimg.com/media/E0kWjZpXEAQtTBr.jpg' , '2022-11-02 14:00:00', '0d8fa44c-54fd-4cd0-ace9-2a7da57992de'),
       ('beade868-ff40-4c90-9f3e-f3c3713819a6', 'peepo', 'https://ih1.redbubble.net/image.1016119162.2279/flat,750x1000,075,f.jpg' , '2022-11-07 15:00:00', 'ba804cb9-fa14-42a5-afaf-be488742fc54'),
       ('3ce50c60-d6f5-4f16-9ba6-f0c7cb5d029d', 'hello there', 'https://preview.redd.it/5al0u8vcby841.jpg?auto=webp&s=fd58ed8d3a0d88c366db45b0ae6f237a264171e3' , '2022-11-10 12:00:00', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f')
 ON CONFLICT DO NOTHING;

--assign likes from users to images
INSERT INTO image_post_user(image_post_id, user_id)
VALUES ('d7655697-eeef-4a2a-870a-1bc4ef022ad3', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('668a7c62-01dd-416e-a7e5-bce70eae876f', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('3ce50c60-d6f5-4f16-9ba6-f0c7cb5d029d', '0d8fa44c-54fd-4cd0-ace9-2a7da57992de'),
       ('3ce50c60-d6f5-4f16-9ba6-f0c7cb5d029d', 'ba804cb9-fa14-42a5-afaf-be488742fc54'),
       ('3ce50c60-d6f5-4f16-9ba6-f0c7cb5d029d', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('baa1c1a5-c9e0-478f-8be9-eb3b119019f3', 'ba804cb9-fa14-42a5-afaf-be488742fc54'),
       ('baa1c1a5-c9e0-478f-8be9-eb3b119019f3', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('df32da21-a6b5-4131-81a1-76a7882e309a', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('b85b9e34-5242-425e-b62d-863c4b30601f', '0d8fa44c-54fd-4cd0-ace9-2a7da57992de'),
       ('b85b9e34-5242-425e-b62d-863c4b30601f', 'ba804cb9-fa14-42a5-afaf-be488742fc54'),
       ('beade868-ff40-4c90-9f3e-f3c3713819a6', '0d8fa44c-54fd-4cd0-ace9-2a7da57992de')
 ON CONFLICT DO NOTHING;
