Select count(*) from "events" as e 
inner join "eventMemberRels" as rel 
on e.id = rel."eventId" 
where e.start_date='2023-04-23 23:55:43.511+05:30' 
and e.end_date='2023-04-23 23:55:43.511+05:30' 
and e.start_time='06:00:00'
and e.end_time='08:00:00';


Select * from "events" as e inner join "eventMemberRels" 
    as rel on e.id = rel."eventId" 
    where (e.start_date >='${start_date}' and e.end_date <='${end_date}' and e.start_time>='${start_time}' and e.end_time <='${end_time}') 
    or (e.start_date >='${start_date}' and e.end_date <='${end_date}' and e.start_time>='${start_time}' and e.end_time <='${end_time}') 
    and e.status= 'active' and rel."memberId"=${memberId};

-- e.start < ${} 