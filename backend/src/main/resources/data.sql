--USERS
insert into users (id, email,first_name,last_name, password)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'admin@example.com', 'James','Bond', '$10$zh8kOxBq.1YWmNWQn6iFqejDyjIxv8dacqclYxC0WKqTEb6f2Y0Nm' ),
('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'user@example.com', 'Tyler','Durden', '$10$zh8kOxBq.1YWmNWQn6iFqejDyjIxv8dacqclYxC0WKqTEb6f2Y0Nm'),
('8e834c6e-6783-4a0e-ac1b-e390a6deae9f', 'giga@chad.max', 'GianGantos', 'Maximus', '$10$zh8kOxBq.1YWmNWQn6iFqejDyjIxv8dacqclYxC0WKqTEb6f2Y0Nm')
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
       ('668a7c62-01dd-416e-a7e5-bce70eae876f', 'one does not simply walk into mordor', 'https://i.kym-cdn.com/entries/icons/original/000/000/143/493654d6ef.jpg' , '2022-11-04 00:00:00', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f')
 ON CONFLICT DO NOTHING;

--assign images to user
INSERT INTO image_post_user(user_id, image_post_id)
VALUES ('d7655697-eeef-4a2a-870a-1bc4ef022ad3', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f'),
       ('668a7c62-01dd-416e-a7e5-bce70eae876f', '8e834c6e-6783-4a0e-ac1b-e390a6deae9f')
 ON CONFLICT DO NOTHING;
