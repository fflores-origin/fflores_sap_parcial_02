create or alter procedure get_travels_by_code(@code varchar(100))
as
begin
	declare @travels table(
		id int, 
		created_on datetime, 
		finished_on datetime,
		truck_id int,
		origin_id int,
		location_name varchar(100),
		code varchar(100),
		truck_status_id int, 
		truck_status_description varchar(100)
	)

	insert into @travels
	select top(10)
		t.id,
		t.created_on, 
		t.finished_on, 
		t.truck_id, 
		t.origin_id,
		l.[name] location_name,
		tr.code,
		tr.status_id truck_status_id,
		ts.[description] truck_status_description
	from travels t
		inner join trucks tr on tr.id = t.truck_id
		inner join truck_status ts on ts.id = tr.status_id
		inner join locations l on l.id = t.origin_id
	where tr.code = @code
	order by t.created_on desc

	select * from @travels

	select
		tr.id, 
		tr.travel_id, 
		tr.location_id,
		tr.[order], 
		tr.actual
	from travel_routes tr
	where travel_id in (select id from @travels)
end