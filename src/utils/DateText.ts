import fecha from "fecha";

export function dbTimeToHHMMOrDayNameOrDateString(dbTime: string) {
  const epochTime = Date.parse(dbTime);
  const dbDate = new Date(epochTime);
  const currentDate = new Date();

  // difference between current and db time is more than 7 days
  // show date and time
  if (currentDate.getTime() - epochTime > 1000 * 60 * 60 * 24 * 7) {
    return fecha.format(dbDate, "MM/DD/YY hh:mmA");
  }

  const dateDiff = currentDate.getDate() - dbDate.getDate();

  // less than a day of difference, show hour and minute, am or pm
  if (dateDiff < 1) {
    return fecha.format(dbDate, "hh:mm A");
    // less than a week of difference, show day name
  } else if (dateDiff < 2) {
    return "Yesterday";
  } else if (dateDiff < 7) {
    return dbDate.toLocaleString("en-us", { weekday: "long" });
    // show date and time
  } else {
    return fecha.format(dbDate, "MM/DD/YY");
  }
}
