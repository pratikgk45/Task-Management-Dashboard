import dayjs from 'dayjs';

export const userIdFormatter = (params) => params.value.toUpperCase();

export const timeFormatter = (params) => dayjs(params.value).format('YYYY/DD/MM hh:mm A (Z)');