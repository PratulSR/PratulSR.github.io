import { useState, useEffect } from 'react';
import axios from "axios";

// Define an interface for the holiday data
interface Holiday {
    date: string;
    localName: string;
    // Add other properties you expect in the response
  }

export default function HolidayList() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const year = 2023;
  const countryCode = 'AU';

  useEffect(() => {
    axios
      .get('https://date.nager.at/api/v3/PublicHolidays/2023/AU/')
      .then((response) => {
        setHolidays(response.data);
      })
      .catch((error) => {
        console.error('Error fetching holdays:', error);
      });
  }, [year, countryCode]);

  return (
    <div>
      <h1>Holiday List for {countryCode} in {year}</h1>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.date}>
            {holiday.date}: {holiday.localName}
          </li>
        ))}
      </ul>
    </div>
  );
}