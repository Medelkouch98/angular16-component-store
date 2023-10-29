import { QueryParam } from 'src/app/shared/models';

export function generateUrl(inputData: any) {
  const params = {} as any;

  inputData.forEach((item: any) => {
    for (const key in item) {
      if (item[key] !== null && item[key] !== undefined && item[key] !== '') {
        if (Array.isArray(item[key])) {
          params[key] = item[key].join(',');
        } else {
          params[key] = item[key];
        }
      }
    }
  });

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `?${queryString}`;
}
