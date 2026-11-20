import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import type { userReserv } from './userReserv.js';
import { ReserveDto } from './reserv.dto.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservations13e',
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getGuests(){
    const [result] = await mysqlConnection.execute('SELECT COUNT(*) as guestCount FROM reservations');
    const rows = result as { guestCount: number }[];
    return rows[0].guestCount;
  }

  async addReservation(userInput: ReserveDto){
    await mysqlConnection.execute("INSERT INTO reservations (name, email, startDate, guests) VALUES (?, ?, ?, ?);", [userInput.name, userInput.email, userInput.startDate, userInput.guests])
  }
}
