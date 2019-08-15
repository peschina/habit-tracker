// convert time strings to minutes
export function toMinutes(time) {
  const str = time.split(":");
  const h = parseInt(str[0], 10);
  const m = parseInt(str[1], 10);
  return h * 60 + m;
}
