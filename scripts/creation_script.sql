--GO
--USE master
--GO
--IF EXISTS (SELECT name FROM sys.databases WHERE name = 'parcial_02')
--    DROP DATABASE parcial_02;
--GO
--CREATE DATABASE parcial_02;
--GO
USE parcial_02

GO -- si existen las tablas las elimino


IF (OBJECT_ID('travel_routes', 'U') IS NOT NULL) 
	DROP TABLE travel_routes;

IF (OBJECT_ID('travels', 'U') IS NOT NULL) 
	DROP TABLE travels;

IF (OBJECT_ID('trucks', 'U') IS NOT NULL) 
	DROP TABLE trucks;

IF (OBJECT_ID('truck_status', 'U') IS NOT NULL) 
	DROP TABLE truck_status;

IF (OBJECT_ID('distances', 'U') IS NOT NULL) 
	DROP TABLE distances;

IF (OBJECT_ID('locations', 'U') IS NOT NULL) 
	DROP TABLE locations;

GO -- creacion de tablas
create table locations(
	id int not null,
	[name] varchar(100) not null,
	constraint pk_locations primary key(id)
)

INSERT INTO locations values
(1, 'CABA'),(2, 'C�rdoba'),(3, 'Corrientes'),(4, 'Formosa'),(5, 'La Plata'),(6, 'La Rioja'),(7, 'Mendoza'),(8, 'Neuquen')

CREATE TABLE distances (
	id int not null identity(1,1),
	[origin_id] int not null,
	[destiny_id] int not null,
	[distance] int not null,
	constraint pk_distances primary key(id),
	constraint fk_origin foreign key(origin_id) references locations(id),
	constraint fk_destiny foreign key(destiny_id) references locations(id)
)

insert into distances(origin_id, destiny_id, distance)
values
(1, 2, 646),(1, 3, 792),(1, 4, 933),(1, 5, 53),(1, 6, 986),(1, 7, 985),(1, 8, 989),-- caba
(2, 1, 646),(3, 1, 792),(4, 1, 933),(5, 1, 53),(6, 1, 986),(7, 1, 985),(8, 1, 989),
(2, 3, 677),(2, 4, 824),(2, 5, 698),(2, 6, 340),(2, 7, 466),(2, 8, 907),-- cordoba
(3, 2, 677),(4, 2, 824),(5, 2, 698),(6, 2, 340),(7, 2, 466),(8, 2, 907),
(3, 4, 157),(3, 5, 830),(3, 6, 814),(3, 7, 1131),(3, 8, 1534),-- corrientes
(4, 3, 157),(5, 3, 830),(6, 3, 814),(7, 3, 1131),(8, 3, 1534),
(4, 5, 968),(4, 6, 927),(4, 7, 1269),(4, 8, 1690),-- formosa
(5, 4, 968),(6, 4, 927),(7, 4, 1269),(8, 4, 1690),
(5, 6, 1038),(5, 7, 1029),(5, 8, 1005),-- la plata
(6, 5, 1038),(7, 5, 1029),(8, 5, 1005),
(6, 7, 427),(6, 8, 1063),-- la rioja
(7, 6, 427),(8, 6, 1063),
(7, 8, 676),-- mendoza
(8, 7, 676)

create table truck_status (
	id int not null,
	[description] varchar(100),

	constraint pk_truck_status primary key(id)
)

insert into truck_status (id, description)
values 
(1, 'AVAILABLE'),
(2, 'TRAVELING'),
(3, 'REPARATION')

create table trucks(
	id int not null identity(1,1),
	code varchar(100) not null,
	status_id int,
	constraint pk_trucks primary key(id),
	constraint fk_truck_status foreign key(status_id) references truck_status(id),
)

insert into trucks (code, status_id)
values
	('AG270TL', 1),
	('AG271TL', 1),
	('AG272TL', 1),
	('AG273TL', 1),
	('AG274TL', 1)

create table travels (
	id int not null identity(1,1),
	created_on datetime,
	finished_on datetime,
	truck_id int not null,
	origin_id int,

	constraint pk_travels primary key(id),
	constraint fk_truck foreign key(truck_id) references trucks(id),
	constraint fk_location_origin foreign key(origin_id) references locations(id),
)

create table travel_routes (
	id int not null identity(1,1),
	travel_id int not null,
	location_id int,
	[order] int,
	actual bit, -- true / false
	constraint pk_travel_routes primary key(id),
	constraint fk_travel foreign key(travel_id) references travels(id),
)

-- inserts travels
insert into travels(created_on, finished_on, truck_id, origin_id) values
 ('2023-01-01', '2023-01-02', 1, 1)
,('2023-01-02', '2023-01-02', 1, 5)
,('2023-01-03', '2023-01-04', 1, 1)
,('2023-01-04', '2023-01-05', 1, 1)
,('2023-01-05', '2023-01-06', 1, 5)
,('2023-01-06', '2023-01-07', 1, 1)
,('2023-01-07', '2023-01-07', 1, 5)
,('2023-01-07', '2023-01-09', 1, 1)
,('2023-01-09', '2023-01-10', 1, 1)
,('2023-01-10', '2023-01-11', 1, 5)
,('2023-01-12', '2023-01-14', 1, 5)

insert into travels(created_on, finished_on, truck_id, origin_id) values
 ('2023-01-01', '2023-01-02', 2, 3)
,('2023-01-02', '2023-01-02', 2, 3)
,('2023-01-03', '2023-01-04', 2, 4)
,('2023-01-04', '2023-01-05', 2, 4)
,('2023-01-05', '2023-01-06', 2, 3)

insert into travels(created_on, finished_on, truck_id, origin_id) values
 ('2023-01-01', '2023-01-02', 3, 6)
,('2024-01-01', '2024-01-04', 5, 7)
,('2024-02-01', '2024-02-06', 5, 8)
,('2024-05-01', null, 5, 8)

-- select * 
-- from travels t join trucks tr
--	on t.truck_id = tr.id
-- where t.truck_id = 5

insert into travel_routes(travel_id, location_id, [order], actual) values
(20, 8, 1, 0 ),
(20, 5, 2, 0 ),
(20, 1, 3, 0 ),
(20, 4, 4, 0 ),
(20, 3, 5, 0 ),
(20, 2, 6, 1 ),
(20, 6, 7, 0 ),
(20, 7, 8, 0 ),
(20, 8, 9, 0 )

--select * from locations

--select 
--	t.id, 
--	t.code, 
--	ts.id as status_id, 
--	ts.[description] as status_description
--from trucks t 
--	join truck_status ts on
--		t.status_id = ts.id
--where t.code = 'AG274TL'
	

--select 
--	t.id, 
--	t.truck_id, 
--	tr.code,
--	t.origin_id, 
--	t.destiny_id, 
--	d.distance 
--from travels t
--	inner join distances d on 
--		t.origin_id = d.origin_id and t.destiny_id = d.destiny_id
--	inner join trucks tr on
--		tr.id = t.truck_id
