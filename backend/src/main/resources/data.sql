--USERS
insert into users (id, email,first_name,last_name, password)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'admin@example.com', 'James','Bond', '1234' ),
('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'user@example.com', 'Tyler','Durden', '1234')
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
       ('3cef575c-49b7-4c34-858a-209b39dbc150', 'CREATE'),
       ('2b0a0711-8807-4d20-b376-5d5b184078c3', 'READ'),
       ('0b37d53c-a9a1-443d-8f4b-0384ab77833c', 'UPDATE'),
       ('1190fe33-5f17-46cb-a9df-dc0d949de63e', 'DELETE')
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