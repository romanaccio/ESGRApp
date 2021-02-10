import axios from 'axios';

interface ReportInterface {
  username: string;
  timestamp: number;
  data: any;
}
export const writeReport = (report: ReportInterface): void => {
  const url = process.env.REACT_APP_ESGR_BACKEND_URL + '/surveys';
  console.log('ESGR backend url : ' + url);
  if (url) axios.post(url, report);
  else console.log("Can't write report to ESGR Backend");
};
