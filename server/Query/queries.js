const {sequelize, db, QueryTypes} = require("../config/dbconfig");

//To count events that lies between the dates
//The event that comes conflict with the existing events
const checkSlot = async (
  memberId,
  start_date,
  end_date,
  start_time,
  end_time,
  time_zone
) => {
  // const result = await sequelize.query(
  //   `Select * from "events" as e inner join "eventMemberRels" as rel on e.id = rel."eventId" where  ((e.start_date >= '${start_date}' AND e.start_date <= '${end_date}') OR (e.end_date >= '${start_date}' AND e.end_date <= '${end_date}') OR (e.start_date <= '${start_date}' AND e.end_date >= '${end_date}')) and e.status= 'active' and rel."memberId"=${memberId};`,
  //   {
  //     type: QueryTypes.SELECT,
  //   }
  // );

  // const result = await sequelize.query(
  //   `SELECT *
  //   FROM "events" AS e
  //   INNER JOIN "eventMemberRels" AS rel ON e.id = rel."eventId"
  //   WHERE
  //     (
  //       (e.start_date > '${start_date}' OR (e.start_date = '${start_date}' AND e.start_time >= '${start_time}'))
  //       AND
  //       (e.start_date < '${end_date}' OR (e.start_date = '${end_date}' AND e.start_time <= '${end_time}'))
  //     )
  //     OR
  //     (
  //       (e.end_date > '${start_date}' OR (e.end_date = '${start_date}' AND e.end_time >= '${start_time}'))
  //       AND
  //       (e.end_date < '${end_date}' OR (e.end_date = '${end_date}' AND e.end_time <= '${end_time}'))
  //     )
  //     OR
  //     (
  //       (e.start_date < '${start_date}' OR (e.start_date = '${start_date}' AND e.start_time <= '${start_time}'))
  //       AND
  //       (e.end_date > '${end_date}' OR (e.end_date = '${end_date}' AND e.end_time >= '${end_time}'))
  //     )
  //     AND e.status = 'active'
  //     AND rel."memberId" = ${memberId};
  //   `,
  //   {
  //     type: QueryTypes.SELECT,
  //   }
  // );

  //Final
  const result = await sequelize.query(
    `SELECT *
    FROM "events" AS e
    INNER JOIN "eventMemberRels" AS rel ON e.id = rel."eventId"
    WHERE
      e.status = 'active'
      AND rel."memberId" = ${memberId}
      AND (
        ((e.start_date || ' ' || e.start_time)::timestamp AT TIME ZONE e.time_zone AT TIME ZONE 'UTC')::timestamp < (('${end_date}' || ' ' || '${end_time}')::timestamp AT TIME ZONE '${time_zone}' AT TIME ZONE 'UTC')::timestamp
        AND
        ((e.end_date || ' ' || e.end_time)::timestamp AT TIME ZONE e.time_zone AT TIME ZONE 'UTC')::timestamp > (('${start_date}' || ' ' || '${start_time}')::timestamp AT TIME ZONE '${time_zone}' AT TIME ZONE 'UTC')::timestamp
      );
      `,
    {
      type: QueryTypes.SELECT,
    }
  );

  return result;
};

module.exports = {
  checkSlot,
};
