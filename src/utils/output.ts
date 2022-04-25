import {
  bgBlue,
  bgRed,
  bgWhite,
  bgYellow,
  black,
  blue,
  dateFormat,
  gray,
  red,
  white,
  yellow,
} from "../deps.ts";

const timeString = (date: Date = new Date()) => {
  return dateFormat(date, "yyyy/MM/dd HH:mm:ss");
};

export const info = (message: string) => {
  console.info(
    gray(timeString()),
    white(bgBlue(" INFO ")),
    blue(message),
  );
};

export const warn = (message: string) => {
  console.warn(
    gray(timeString()),
    black(bgYellow(" WARN ")),
    yellow(message),
  );
};

export const error = (message: string) => {
  console.error(
    gray(timeString()),
    white(bgRed(" ERR  ")),
    red(message),
  );
};

export const log = (message: string) => {
  console.log(
    gray(timeString()),
    black(bgWhite(" LOG  ")),
    white(message),
  );
};

const output = {
  info,
  warn,
  error,
  log,
};

export default output;
