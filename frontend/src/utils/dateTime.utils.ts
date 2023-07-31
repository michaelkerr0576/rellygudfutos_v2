type DateTimeStyle = 'full' | 'long' | 'medium' | 'short' | undefined;

/* 
 $ dateTimeUtils
  - formatDateTime
*/

export const formatDateTime = (
  date: Date | string = '2011-11-11T11:11:11.111Z',
  dateStyle: DateTimeStyle = 'short',
  timeStyle: DateTimeStyle = undefined,
): string => {
  const newDate = new Date(date);

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle,
    timeStyle,
    timeZone,
  }).format(newDate);

  return formattedDate;
};
