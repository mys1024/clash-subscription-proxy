import {
  bgBlue,
  bgRed,
  bgWhite,
  bgYellow,
  black,
  dateFormat,
  gray,
  white,
} from "../deps.ts";

const timeString = (date: Date = new Date()) => {
  return dateFormat(date, "yyyy/MM/dd HH:mm:ss");
};

export const info = (message: string) => {
  console.info(
    gray(timeString()),
    white(bgBlue(" INFO ")),
    message,
  );
};

export const warn = (message: string) => {
  console.warn(
    gray(timeString()),
    black(bgYellow(" WARN ")),
    message,
  );
};

export const error = (message: string) => {
  console.error(
    gray(timeString()),
    white(bgRed(" ERR  ")),
    message,
  );
};

export const log = (message: string) => {
  console.log(
    gray(timeString()),
    black(bgWhite(" LOG  ")),
    message,
  );
};

const output = {
  info,
  warn,
  error,
  log,
};

export default output;
